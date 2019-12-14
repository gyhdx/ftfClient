<template>
    <div class="fillContainer">
        <div style="height:100%;width:100%">

            <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                <el-col :span="8"><div class="grid-content bg-purple-light">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>注册数</span>
                            <el-button style="float: right; padding: 3px 3px" type="danger">总数</el-button>
                        </div>

                        <div class="text item">
                            {{this.data.userCount}}
                        </div>
                    </el-card>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>访问量</span>
                            <el-button style="float: right; padding: 3px 3px" type="primary">总数</el-button>
                        </div>

                        <div class="text item">
                            {{this.data.logCount}}
                        </div>
                    </el-card>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>动态数</span>
                            <el-button style="float: right; padding: 3px 3px" type="warning">总数</el-button>
                        </div>
                        <div class="text item">
                            {{this.data.mesCount}}
                        </div>
                    </el-card>
                </div></el-col>
            </el-row>

            <el-row :gutter="20" type="flex" class="row-bg" justify="center">
                <el-col :span="24">
                    <div class="grid-content bg-purple-light" style="height: auto">
                        <el-calendar v-model="value">
                        </el-calendar>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home.vue",
        data(){
            return{
                value: new Date(),
                data:{}
            }
        },
        created(){
            this.getProfile();
        },
        methods:{
            getProfile(){
                this.$axios
                    .get("/api/util/getData")
                    .then(res =>{
                        // console.log(res);
                        this.data = res.data;
                        console.log(this.data)
                        // console.log('--------------------')
                        // console.log(this.allTableData)
                    })
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>
    .fillContainer{

        height: 95%;
        padding: 16px;
        border:1px;
        box-sizing:border-box;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);
        margin-right: 30px;
        margin-left: 30px;
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .el-row {
        margin-bottom: 20px;


    }
    .el-col {
        border-radius: 4px;
        height: 20%;
    }

    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;

    }
    .text {
        font-size: 30px;
        text-align: center;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: auto;
        height: auto;
    }
    .shape1{
        /*height: 20%;*/
    }
</style>