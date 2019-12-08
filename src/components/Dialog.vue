<template>
    <div class="dialog">
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            >

            <div class="form">
                <el-form
                    ref="form"
                    :model="formData"
                    :rules="form_rules"
                    label-width="120px"
                    style="margin: 10px;width: auto;"
                    >
                    <el-form-item prop="name" label="姓名">
                        <el-input type="name" v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别:">
                        <el-select v-model="formData.sex" placeholder="性别">
                            <el-option v-for="(formsex,index) in format_type_list" :key="index"
                            :label="formsex" :value="formsex">

                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="money" label="金额">
                        <el-input type="money" v-model="formData.money"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialog.show = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name:'dialog',
        props:{
            dialog: Object,
            formData:Object
        },
        data(){
            return{

                format_type_list:[
                    "男",
                    "女"
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
                    if (valid){
                        const url = this.dialog.option == 'add'?'add':'edit/${this.formData.id}'
                        // console.log(this.formData)
                        this.$axios.post("/",this.formData)
                            .then(res =>{
                                this.$message({
                                    message:'数据添加成功',
                                    type:'success'
                                })
                                //隐藏对话框
                                this.dialog.show=false
                            })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>