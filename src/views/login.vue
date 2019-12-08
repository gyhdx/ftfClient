<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">FTF后台管理系统</span>

                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px"
                         class="loginForm">

                    <el-form-item label="邮箱" prop="email">
                        <el-input type="text" v-model="loginUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>

                    <div class="tiparea">
                        <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
                    </div>
                </el-form>

            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'login',
        components: {},

        data() {

            return {
                loginUser: {
                    email: "",
                    password: ""
                },
                uridata:{
                    userEmail:'',
                    userPassword:''
                },
                rules: {
                    email: [
                        {
                            type:"email",
                            required:true,
                            message:"邮箱格式不正确",
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
                    ]
                },
                data:[]
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 设置路由可访问其他界面
                        this.uridata.userEmail = this.loginUser.email
                        this.uridata.userPassword = this.loginUser.password

                        this.$axios.post("/api/user/findById",this.uridata)
                            .then(res => {
                                // console.log(res)
                                    // this.data = res.data
                                console.log(res.data)
                                if (res.data) {
                                    this.$router.push('/index')
                                }else {
                                    this.$message({
                                        message:"用户名或密码错误",
                                        type:'danger'
                                    })
                                    this.$router.push('/login')
                                }

                                }
                            )
                    }

                })
            }
        }
    }
</script>

<style scoped>
    .login {
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
    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 10px #cccc;
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