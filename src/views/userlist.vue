<template>
    <div class="fillContainer">
        <div class="header">
            <p class="font_size">用户管理</p>
        </div>
        <el-divider></el-divider>

        <div class="table_container">

        <el-table
                v-if="tableData.length >0"
                :data="tableData"
                max-height="700"
                stripe
                border
                style="width: 100%"
                :default-sort = "{prop: 'id', order: 'descending'}"
        >
            <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="50"
            >
            </el-table-column>
            <el-table-column
                    prop="userNikename"
                    label="用户名"
                    align="center"
                    width="100px">
            </el-table-column>
            <el-table-column
                    prop="userId"
                    label="ID"
                    sortable
                    align="center"
                    width="80px">
            </el-table-column>

            <el-table-column
                    prop="userTime"
                    label="注册时间"
                    sortable
                    align="center"
                    width="auto">
            </el-table-column>

            <el-table-column
                    prop="userEmail"
                    label="邮箱"
                    align="center"
                    width="auto">
            </el-table-column>
            <el-table-column
                    prop="userSex"
                    label="性别"
                    align="center"
                    width="80px">
            </el-table-column>
            <el-table-column
                    prop="role.roleName"
                    label="角色"
                    align="center"
                    width="100px">
            </el-table-column>
            <el-table-column
                    prop="userBirthday"
                    label="生日"
                    align="center"
                    width="auto">
            </el-table-column>
            <el-table-column
                    prop="userCount"
                    label="登录次数"
                    align="center"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="messages"
                    label="发表文章数"
                    align="center"
                    width="100px">
            </el-table-column>
            <el-table-column
                    prop="userStatusStr"
                    label="状态"
                    align="center"
                    width="70px">
            </el-table-column>

            <el-table-column label="操作" align="center" prop="operation" width="200px">
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            size="small"
                            icon="edit"
                            @click="handleEdit(scope.$index, scope.row)">更改状态</el-button>
                    <el-button
                            size="small"
                            type="danger"
                            icon="delete"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sycn="paginations.page_index"
                                :page-sizes="paginations.page_sizes"
                                :page-size="paginations.page_size"
                                :layout="paginations.layout"
                                :total="paginations.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>

        <Dialog :dialog="dialog" :formData="formData" @update="getProfile" ></Dialog>
    </div>
</template>

<script>
    import Dialog from '../components/Dialog'
    export default {
        name:'fundList',
        data(){
            return{
                paginations:{
                    page_index:1,//当前位于的页数
                    total:0,//总数
                    page_size:10,//一页显示条数
                    page_sizes:[10,20,30,40],//每页显示页数
                    layout:'total,sizes,prev,pager,next,jumper'//翻页属性
                },
                formData:{
                    data:'',name:'',id:'',email:'',sex:'',conts:'',role:"",counter:'',status:'',lastdata:""

                },
                tableData:[],
                allTableData:[],
                filterTableData:[],
                datas:[],
                dialog:{
                    show:false,
                    title:'',
                    option:'edit'
                }
            }
        },
        created(){
            this.getProfile();
         },
        methods:{
            getProfile(){

                // 获取表格数据
                this.$axios
                    .get("/api/user/getAllUser")
                    .then(res =>{
                        // console.log(res);
                        this.allTableData = res.data;
                        // console.log('--------------------')
                        // console.log(this.allTableData)
                        this.setPaginations();
                        })
                    .catch(err => console.log(err))
            },
            setPaginations(){
                //设置分页属性
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 10;
                //设置默认分页数据
                this.tableData = this.allTableData.filter((item,index) => {
                    return index < this.paginations.page_size
                })
            },
            handleEdit(index,row){
                // console.log(this.dialog)
                //编辑
                this.$axios
                    .get("/api/user/updateUserState?id="+row.userId)
                    .then(res =>{
                        this.getProfile();
                    })
                    .catch(err => console.log(err));



            },
            handleDelete(index,row){

                this.$axios
                    .get("/api/user/deleteUser?id="+row.userId)
                    .then(res =>{
                        this.getProfile();
                    })
                    .catch(err => console.log(err));

            },
            handleAdd(){
                // console.log("aaa")

            },
            handleSizeChange(page_size){
                //切换size
                this.paginations.page_index = 1
                this.paginations.page_size = page_size
                //设置默认分页数据
                this.tableData = this.allTableData.filter((item,index) => {
                    return index < page_size
                })
            },
            handleCurrentChange(page){
                //获取当前页
                let index = this.paginations.page_size * (page - 1)
                // 数据总数
                let nums = this.paginations.page_size * page
                // 容器
                let tables = []
                 for (let i = index;i<nums;i++){
                     if (this.allTableData[i]){
                         tables.push(this.allTableData[i])
                     }
                     this.tableData = tables
                 }
            }
        },
        components:{
            Dialog
        }
    }
</script>


<style scoped>

    .fillContainer{

        height: 95%;
        padding: 16px;
        box-sizing:border-box;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12);
        margin-right: 30px;
        margin-left: 30px;
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
    }
    .pagination{
        text-align: right;
        margin-top: 20px;
    }
    .header{
        height: 30px;
    }.font_size{
        font-size: 30px;
        font-weight: bold;
         }
</style>