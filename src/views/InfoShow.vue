<template>
    <div class="infoshow">
        <div>
        <div class="header">
            <p class="font_size">个人信息</p>
        </div>
        <el-divider></el-divider>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <div class="user">
                    <!--:src="user.avatar" 的：表示绑定，绑定可以直接使用user对象的内容-->
                    <!--<img :src="user.avatar" class="avatar" alt=""/>-->
                    <img src="../assets/tx.jpeg" class="avatar" alt=""/>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="userinfo" :data="user">
                    <div class="user-item">
                        昵称：
                        <!--{{}}中可以直接使用js代码-->
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        性别：
                        <span>{{user.sex}}</span>
                    </div>
                    <div class="user-item">
                        角色：
                        <span>{{user.role}}</span>
                    </div>
                    <div class="user-item">
                        生日：
                        <span>{{user.borthday}}</span>
                    </div>
                    <div class="user-item">
                        邮箱：
                        <span>{{user.email}}</span>
                    </div>
                    <div class="user-item">
                        简介：
                        <span>{{user.descript}}</span>

                    </div>
                    <el-row class="user-item">

                        <el-button type="primary" icon="view" @click="handleChange()">修改资料</el-button>

                    </el-row>
                </div>


            </el-col>
        </el-row>
        <!--<Infolog :></Infolog>-->
        </div>
        <Infolog :infolog="infolog" :formData="formData" @update="getProfile"></Infolog>
    </div>
</template>

<script>
    import Infolog from "../components/Infolog";

    export default {

        name: "InfoShow",
        // computed:{
        //     user(){
        //         return this.$store.getters.user;
        //     }
        // },
        data(){
            return{
                user:{},
                infolog:{
                    show:false,
                },
                formData:{
                    name:'',role:'',email:"",sex:'',descript:'',borthday:''
                },
                centerDialogVisible:true
            }
        },
        created(){
            this.getProfile();
        },
        methods:{
            getProfile(){
                this.user = {name:'wf',role:'管理员',email:"123@123.com",sex:'男',descript:'我是管理员',borthday:'1999-07-18'}
            },
            handleChange(){
                // console.log(this.dialog)
                this.infolog.show=true
                this.formData=this.user
                console.log(this.formData)
            }
        },
        components:{
            Infolog
        }
    }
</script>

<style scoped>

    .infoshow {
        height: 90%;
        padding: 16px;
        border:1px;
        box-sizing:border-box;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);
        margin-right: 30px;
        margin-left: 30px;
        margin-top: 30px;
        margin-bottom: 20px;
        /* padding: 16px; */
    }
    .row-bg {
        width: 100%;
        height: 100%;
    }
    .user {
        text-align: center;
        position: relative;
        top: 30%;
    }
    .user img {
        width: 150px;
        border-radius: 50%;
    }
    .user span {
        display: block;
        text-align: center;
        margin-top: 20px;
        font-size: 10px;
        font-weight: bold;
    }
    .userinfo {

        background-color: #eee;
    }
    .user-item {
        position: relative;

        padding: 20px;
        font-size: 20px;
        color: #333;
    }
    .header{
        height: 30px;
    }.font_size{
         font-size: 30px;
         font-weight: bold;
     }
</style>