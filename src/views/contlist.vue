<template>
    <div class="fillContainer">
        <div class="header">
            <p class="font_size">动态管理</p>
        </div>
        <el-divider></el-divider>
        <div>
            <el-form :inline="true" ref="search_data" :model="search_data">
                <!-- 删选 -->
                <el-form-item label="按时间筛选:">
                    <el-date-picker v-model="search_data.startTime" type="date" placeholder="选择开始时间"></el-date-picker>--
                    <el-date-picker v-model="search_data.endTime" type="date" placeholder="选择结束时间"></el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="handleSearch">筛选</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" size="small" icon="search" @click="clearSearch">恢复</el-button>
                </el-form-item>
                <div style="float: right;">
                <el-form-item label="根据用户名查询">
                    <el-input v-model="search_data.user" placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="searchByname">查询</el-button>
                </el-form-item></div>
            </el-form>
        </div>
        <div class="table_container">

            <el-table
                    ref="multipleTable"
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
                        prop="messagesInfo"
                        label="动态内容"
                        align="center"
                        width="auto">
                </el-table-column>
                <el-table-column
                        prop="users.userNikename"
                        label="用户名"
                        align="center"
                        width="100px">
                </el-table-column>
                <el-table-column
                        prop="messagesType"
                        label="类别"
                        sortable
                        align="center"
                        width="80px">
                </el-table-column>

                <el-table-column
                        prop="messagesTime"
                        label="发表时间"
                        sortable
                        align="center"
                        width="200px">
                </el-table-column>
                <el-table-column
                        prop="messagesAgreenum"
                        label="点赞数"
                        align="center"
                        width="80px">
                </el-table-column>
                <el-table-column
                        prop="messagesCollectnum"
                        label="收藏数"
                        align="center"
                        width="80px">
                </el-table-column>
                <el-table-column
                        prop="messagesTranspondnum"
                        label="转发数"
                        align="center"
                        width="80px">
                </el-table-column>
                <el-table-column
                        prop="messagesReadnum"
                        label="浏览量"
                        align="center"
                        width="80px">
                </el-table-column>

                <el-table-column label="操作" align="center" prop="operation" width="200px">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="success"
                                icon="delete"
                                @click="handleAdd(scope.$index, scope.row)">查看</el-button>
                        <el-button
                                type="primary"
                                size="small"
                                icon="edit"
                                @click="handleEdit(scope.$index, scope.row)">查看评论</el-button>
                        <!--<el-button-->
                                <!--size="small"-->
                                <!--type="danger"-->
                                <!--icon="delete"-->
                                <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
        name:'contList',
        data(){
            return{
                search_data: {
                    startTime: "",
                    endTime: "",
                    name:''
                },
                paginations:{
                    page_index:1,//当前位于的页数
                    total:0,//总数
                    page_size:10,//一页显示条数
                    page_sizes:[10,20,30,40],//每页显示页数
                    layout:'total,sizes,prev,pager,next,jumper'//翻页属性
                },
                multipleSelection: [],
                formData:{
                    id:'',
                    name:'',
                    money:'',
                    sex:''

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
        },computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        created(){
            this.getProfile();
        },
        methods:{
            getProfile(){
                this.$axios
                    .get("/api/message/getAllMessage?value=1")
                    .then(res =>{
                        // console.log(res);
                        this.allTableData = res.data;
                        // console.log('--------------------')
                        // console.log(this.allTableData)
                        this.datas = this.allTableData
                        this.setPaginations()
                        })
                    .catch(err => console.log(err))
            },
            setPaginations(){
                //设置分页属性
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                //设置默认分页数据
                this.tableData = this.allTableData.filter((item,index) => {
                    return index < this.paginations.page_size
                })
            },
            handleEdit(index,row){
                // console.log(this.dialog)
                //编辑
                // this.$router.push({name:'reviewlist',params:{key:value}})
                this.$router.push({name:'reviewlist',params:{key:row.messagesId}})
            },
            handleDelete(index,row){
                // console.log("ddd")
                this.$axios.delete('')
                    .then(res =>{
                        this.$message("删除成功")
                        this.getPrfile()
                    })
                    .catch()
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
                // this.filterTableData = this.tableData
                // console.log(this.datas)
                const stime = this.search_data.startTime.getTime();
                const etime = this.search_data.endTime.getTime();
                this.allTableData = this.filterTableData.filter(item => {
                    let date = new Date(item.messagesTime);
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
            //显示文章内容
            handleAdd(index,row){
                // console.log("aaa")
                this.dialog={
                    show:true,
                    title:'添加',
                    option:"add"
                };
                this.formData = {
                    info : row.messagesInfo,
                    username:row.users.userNikename,
                    time:row.messagesTime,
                    id:"文章ID："+row.messagesId
                }
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
            searchByname(){
                this.filterTableData = this.datas
                // this.filterTableData = this.tableData
                // console.log(this.datas)
                const users = this.search_data.user;
                this.allTableData = this.filterTableData.filter(item => {
                    let name = item.users.userNikename;
                    return name==users;
                    // console.log(item)
                    // console.log(time)
                });
                // 分页数据
                this.setPaginations();
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
        border:1px;
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