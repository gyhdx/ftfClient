<template>
    <div class="dialog">
        <el-dialog
            title="修改个人信息"
            :visible.sync="infolog.show"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            width="30%"
            >
            <div class="form">
                <el-form
                        ref="form"
                        :model="formData"
                        :rules="form_rules"
                        label-width="120px"
                        style="margin: 10px;width: 80%;"
                >
                    <el-form-item label="姓名">
                        <el-input type="name" v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="formData.sex" placeholder="性别">
                            <el-option v-for="(formsex,index) in format_type_list" :key="index"
                                       :label="formsex" :value="formsex">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="角色">
                        <el-select v-model="formData.role" placeholder="角色">
                            <el-option v-for="(formsex,index) in format_type_list2" :key="index"
                                       :label="formsex" :value="formsex">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-date-picker
                                v-model="formData.borthday"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input type="email" v-model="formData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="formData.descript">
                        </el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="infolog.show = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>

            </div>

        </el-dialog>
    </div>
</template>
<script>
    export default {
        name:'infolog',
        props:{
            infolog:Object,
            formData:Object
        },
        data(){
            return{

                format_type_list:[
                    "男",
                    "女"
                ],
                format_type_list2:[
                    "管理员",
                    "普通用户"
                ],
                form_rules:{
                    name:[
                        {required:true,message:'姓名不能为空！',trigger:'blur'}
                    ],
                    money:[
                        {required:true,message:'金额不能为空！',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            onSubmit(form){

                this.$refs[form].validate(valid =>{
                    // if (valid){
                    //     console.log(this.formData)
                    //     // console.log(this.formData)
                    //     this.$axios.post("/",this.formData)
                    //         .then(res =>{
                    //             this.$message({
                    //                 message:'数据添加成功',
                    //                 type:'success'
                    //             })
                    //             //隐藏对话框
                    //             this.infolog.show=false
                    //         })
                    // }
                    this.infolog.show=false
                })
            }
        }
    };
</script>

<style scoped>

</style>