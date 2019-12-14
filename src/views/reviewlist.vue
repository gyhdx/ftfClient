<template>
    <div class="fillContainer">
        <div class="header">
            <p class="font_size">评论管理</p>
        </div>
        <el-divider></el-divider>

        <div>
            <el-form :inline="true" ref="search_data" :model="search_data">
                <el-form-item class="btnRight">
                    <el-button type="danger"  icon="view" @click="handleAdd">返回</el-button>
                </el-form-item>
            </el-form>
        </div>



        <template>
            <el-table
                    :data="tableData"
                    row-style="height:30px"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50"
                ></el-table-column>
                <el-table-column
                        prop="commentsId"
                        label="评论ID"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="commentsInfo"
                        label="评论内容"
                        align="center"
                        width="auto">
                </el-table-column>
                <el-table-column
                        prop="userChild.userNikename"
                        label="评论人"
                        align="center"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="userParent.userNikename"
                        label="被评论人"
                        align="center"
                        width="150">
                </el-table-column>


                <el-table-column
                        prop="commentsTime"
                        label="日期"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.commentsTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" prop="operation" width="160px">
                    <template slot-scope="scope">

                        <el-button
                                size="small"
                                type="danger"
                                icon="delete"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

    </div>
</template>

<script>
    export default {
        name:'fundList',
        data(){
            return{
                search_data: {
                    startTime: "",
                    endTime: ""
                },
                paginations:{

                    page_index:1,//当前位于的页数
                    total:0,//总数
                    page_size:10,//一页显示条数
                    page_sizes:[10,20,30,40],//每页显示页数
                    layout:'total,sizes,prev,pager,next,jumper'//翻页属性
                },
                formData:{
                    id:'',
                    name:'',
                    role:'',
                    ip:'',
                    operate:''

                },
                tableData:[],
                allTableData:[],
                filterTableData: [],
                datas:[],
                dialog:{
                    show:false,
                    title:'',
                    option:'edit'
                }
            }
        },
        // computed: {
        //     user() {
        //         return this.$store.getters.user;
        //     }
        // },
        created(){
            this.getProfile();
        },
        methods:{
            getProfile(){
                var id = this.$route.params.key
                // console.log(id)
                // 获取表格数据
                this.$axios
                    .get("/api/comment/getById?id="+id)
                    .then(res =>{
                        console.log(res);
                        this.allTableData = res.data;
                        console.log('--------------------')
                        console.log(this.allTableData)
                        this.setPaginations()
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
                this.dialog={
                    show:true,
                    title:'编辑',
                    option:"edit"
                }

                this.formData = {
                    money : row.money,
                    name:row.name,
                    sex:row.sex
                }

            },
            handleDelete(index,row){
                // console.log(row.messagesId)
                // this.$axios.get("/api/message/updateMessageState?id="+row.messagesId+"&state=3")
                //     .then(res =>{
                //         this.$message({
                //             message:'删除成功',
                //             type:'success'
                //         })
                //         this.datas = this.allTableData
                //         this.allTableData = res.data;
                //     })
                //     .catch()
                this.filterTableData = this.allTableData

                this.allTableData = this.filterTableData.filter(item =>{
                    return item.commentsId != row.commentsId
                })
                this.setPaginations()
            },
            handleAdd(){
                this.$router.push("/contlist")
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
            },
            handleSearch() {
                // 筛选
                if (!this.search_data.startTime || !this.search_data.endTime) {
                    this.$message({
                        type: "warning",
                        message: "请选择时间区间"
                    });
                    this.getProfile();
                    return;
                }
                this.filterTableData = this.datas
                // console.log(this.filterTableData)
                const stime = this.search_data.startTime.getTime();
                const etime = this.search_data.endTime.getTime();
                this.allTableData = this.filterTableData.filter(item => {
                    let date = new Date(item.data);
                    let time = date.getTime();
                    return time >= stime && time <= etime;
                    // console.log(item)
                    // console.log(time)
                });
                // 分页数据
                this.setPaginations();
            },
            clearSearch(){
                this.allTableData = this.datas
                this.setPaginations()
            },
        },

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