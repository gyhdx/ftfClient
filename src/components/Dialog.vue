<template>
    <div class="dialog">
        <el-dialog
            :title="formData.id"
            :visible.sync="dialog.show"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :modal-append-to-body="false"
            :modal="formData"
            >
            <font color="#F56C6C" style="line-height: 30px;font-size:large">发布时间：{{formData.time}}</font><br/><br/><br/>
            <div class="form">
                <el-form
                    ref="form"
                    :model="formData"
                    :rules="form_rules"
                    label-width="80px"
                    style="margin: 10px;width: auto;border-radius: 4px;"

                    >

                    <font color="#409EFF" style="line-height: 30px;font-size:medium;">{{formData.info}}</font>
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
        methods:{
            onSubmit(form){
                this.$refs[form].validate(valid =>{
                    console.log(this.formData)
                    // if (valid){
                    //     const url = this.dialog.option == 'add'?'add':'edit/${this.formData.id}'
                    //     // console.log(this.formData)
                    //     this.$axios.post("/",this.formData)
                    //         .then(res =>{
                    //             this.$message({
                    //                 message:'数据添加成功',
                    //                 type:'success'
                    //             })
                    //             //隐藏对话框
                    //             this.dialog.show=false
                    //         })
                    // }
                })
            }
        }
    }
</script>

<style scoped>
.form{

    border-radius: 4px;
    height: 20%;
}
</style>