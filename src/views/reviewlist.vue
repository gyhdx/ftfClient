<template>
    <div class="fillContainer">
        <div class="header">
            <p class="font_size">评论管理</p>
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
                        prop="pid"
                        label="评论ID"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="review"
                        label="评论内容"
                        align="center"
                        width="auto">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="评论人"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="replay"
                        label="回复"
                        align="center"
                        width="auto">
                </el-table-column>
                <el-table-column
                        prop="name1"
                        label="回复人"
                        align="center"
                        width="120">
                </el-table-column>


                <el-table-column
                        prop="date"
                        label="日期"
                        align="center"
                        width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
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

                this.allTableData=[{
                    date: '2019-05-02',
                    name: '王小虎',
                    review:'还好我没有点开看！',
                    pid:1,
                    replay:"hhhhh",
                    name1:'gx'
                }, {
                    date: '2019-05-02',
                    name: '王小虎',
                    review:'导演啥时候出新作啊',
                    pid:2,
                    replay:"马上",
                    name1:'ll'
                }, {
                    date: '2019-05-02',
                    name: '王小虎',
                    review:'hhhhhhhh',
                    pid:3,

                }, {
                    date: '2019-05-02',
                    name: '王小虎',
                    review:'马上分公司',
                    pid:4
                }]


                // this.allTableData=[{data:'2019-09-22',name:'wf',id:1,money:100,sex:'男'},
                //     {data:'2019-09-26',name:'aa',id:7,money:700,sex:'男'}]
                // console.log(this.allTableData)
                //
                // // 获取表格数据
                // this.$axios
                //     .get("/api/api/test")
                //     .then(res =>{
                //         console.log(res);
                //         this.allTableData = res.data;
                //         console.log('--------------------')
                //         console.log(this.allTableData)
                //         this.setPaginations()
                //         })
                //     .catch(err => console.log(err))
                this.datas = this.allTableData
                this.setPaginations()

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
                // console.log("ddd")
                // this.$axios.delete('')
                //     .then(res =>{
                //         this.$message("删除成功")
                //         this.getPrfile()
                //     })
                //     .catch()
                this.filterTableData = this.allTableData

                this.allTableData = this.filterTableData.filter(item =>{
                    // console.log(item)
                    return item.pid != row.pid
                })
                this.$message({
                    message:'删除成功',
                    type:'success'
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