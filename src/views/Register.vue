<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">FTF后台管理系统</span>

                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px"
                         class="registerForm">

                    <el-form-item label="邮箱" prop="email">
                        <el-input type="text" v-model="registerUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>

                    <el-form-item label="验证码" prop="yzm">
                        <el-input style="width: 60%" type="yzm" v-model="registerUser.yzm" placeholder="请确认密码">


                        </el-input>
                        <!--<el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>-->
                       <el-button style="width: 40%"><span v-show="sendAuthCode" style="text-align: center;" class="auth_text auth_text_blue"  @click="getAuthCode">验证码</span>
                           <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span>秒</span></el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>已有账号，请直接<router-link to="/login">登录</router-link></p>
                    </div>
                </el-form>



            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'register',
        components: {},

        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback()
                }
            };
            var validateCheckEmail = (rule, value, callback) =>{

                this.$axios.get("/api/user/checkName?userEmail="+this.registerUser.email)
                    .then(res => {
                            //注册成功
                        // console.log(this.registerUser.email)
                            if (!res.data) {
                                callback(new Error('该邮箱以注册请直接登录'))
                            }else {
                                callback()
                            }
                        }
                    )
            };
            return {
                registerUser: {
                    email: "",
                    password: "",
                    password2: "",
                    yzm: ""
                },
                uridata:{
                    userEmail:'',
                    userPassword:'',
                    yzm:''
                },
                sendAuthCode:true,
                auth_time: 0
                ,
                rules: {
                    yzm: [
                        {
                        /*设置name字段的校验，required表示是否必填，message：错误时显示的信息trigger:"blur"表示在失去焦点时判断*/
                        required: true, message: "验证码不为空", trigger: "blur"
                        },
                        {
                            min: 4,
                            max: 4,
                            message: "长度为4个字符",
                            trigger: "blur"
                        }
                    ],
                    email: [
                        {
                            type:"email",
                            required:true,
                            message:"邮箱格式不正确",
                            trigger:"blur"
                        },
                        {
                            validator:validateCheckEmail,
                            trigger:"blur"
                        }
                    ],
                    password: [
                        {
                            required:true,
                            message:"密码不能为空",
                            trigger:"blur"
                        },
                        {
                            min:6,
                            max:30,
                            message:"长度在6到30个字符之间",
                            trigger:"blur"
                        }
                    ],
                    password2: [
                        {
                            required:true,
                            message:"确认密码不能为空",
                            trigger:"blur"
                        },
                        {
                            min:6,
                            max:30,
                            message:"长度在6到30个字符之间",
                            trigger:"blur"
                        },
                        {
                            validator:validatePass2,
                            trigger:"blur"
                        }
                    ]

                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        console.log(this.registerUser)
                        this.uridata.userEmail = this.registerUser.email
                        this.uridata.userPassword = this.registerUser.password
                        this.uridata.yzm = this.registerUser.yzm
                        console.log(this.uridata)
                        this.$axios.post("/api/user/register",this.uridata)
                            .then(res => {
                                //注册成功
                                if (res.data) {
                                    this.$message({
                                        message:"账号注册成功！",
                                        type:'success'
                                    })
                                    this.$router.push('/login')
                                }else {
                                    this.$message({
                                        message:"账号注册失败！请重新输入信息",
                                        type:'danger'
                                    })
                                    this.$router.push('/register')
                                }

                                }
                            )
                    }
            })
        },
            getAuthCode:function () {
                console.log(this.registerUser.email)
                this.$axios.get("/api/user/sendYZM?userEmail="+this.registerUser.email)
                    .then(res => {
                            if (res.data) {
                                this.$message({
                                    message:"验证码发送成功！",
                                    type:'success'
                                })
                                this.sendAuthCode = false;
                                this.auth_time = 60;
                                var auth_timetimer =  setInterval(()=>{
                                    this.auth_time--;
                                    if(this.auth_time<=0){
                                        this.sendAuthCode = true;
                                        clearInterval(auth_timetimer);
                                    }
                                }, 1000);
                            }else {
                                this.$message({
                                    message:"验证码发送失败！请确认邮箱是否输入正确",
                                    type:'danger'
                                })
                            }
                        }
                    )

            }

    }
    }
</script>

<style scoped>
    .register {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/fj.png) no-repeat center center;
        background-size: 100% 100%;
    }

    /*文字设置*/
    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 34%; /*文字位置*/
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    /*文字样式*/
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    /*提交按钮*/
    .submit_btn {
        width: 100%;
    }

    /*表单样式*/
    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 10px #ccc;
    }

    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }
    .tiparea p a {
        color: #409eff;
    }
</style>