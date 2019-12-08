<template>
    <div class="fillContainer">
        <div class="header">
            <p class="font_size">审核管理</p>
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
            </el-form>
        </div>
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
                        prop="wid"
                        label="动态ID"
                        sortable
                        align="center"
                        width="100px">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="内容"
                        align="center"
                        width="auto">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="用户名"
                        align="center"
                        width="100px">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类别"

                        align="center"
                        width="80px">
                </el-table-column>

                <el-table-column
                        prop="data"
                        label="发表时间"
                        sortable
                        align="center"
                        width="200px">
                </el-table-column>

                <el-table-column
                        prop="showstatus"
                        label="审核"
                        align="center"
                        width="80px">
                </el-table-column>


                <el-table-column label="操作" align="center" prop="operation" width="160px">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                size="small"
                                icon="edit"
                                @click="handleEdit(scope.$index, scope.row)">过审</el-button>
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
        name:'contList',
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
                multipleSelection: [],
                formData:{
                    data:'',name:'',wid:'',type:'',showstatus:'',content:''

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
                // console.log("ttttttt")
                this.allTableData=[
                    {data:'2019-08-22',name:'wf',wid:1,showstatus:'待审',content:'麻烦分享一下近期开心事儿 '},
                    {data:'2019-09-21',name:'wf',wid:4,showstatus:'待审',content:'哈哈哈哈'},
                    {data:'2019-08-25',name:'wf',wid:53,type:'学习',showstatus:'待审',content:'看起来好简单，学起来深似海'},
                    {data:'2019-09-23',name:'wf',wid:246,showstatus:'待审',content:'麻烦分享一下近期开心事儿 '},
                    {data:'2019-09-04',name:'hh',wid:2544,type:'漫画',showstatus:'待审',content:'DC超级英雄主题特展登陆#BW2019# 上海站啦~ 记得到时候来N1馆展位感受超级英雄们的抛瓦[喵喵] '},
                    {data:'2019-09-12',name:'wf',wid:23,showstatus:'待审',content:'麻烦分享一下近期开心事儿 '},
                    {data:'2019-09-22',name:'wf',wid:65,type:'环保',showstatus:'待审',content:'2012年以来，中国每年完成营造林近7万平方公里，治理沙化土地3万多平方公里。2000年至2017年，全球新增绿化面积有四分之一来自中国。'},
                    {data:'2019-09-15',name:'wf',wid:35,showstatus:'待审',content:'我们的一些希望和一个决定'},
                    {data:'2019-09-09',name:'ff',wid:695,showstatus:'待审',content:'剧透完了'},
                    {data:'2019-09-22',name:'wf',wid:5,showstatus:'待审',content:'。。。。。'},

                ]



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
                console.log(row)
                //编辑
                this.filterTableData = this.allTableData

                this.allTableData = this.filterTableData.filter(item =>{
                    // console.log(item)
                    return item.wid != row.wid
                })
                this.$message({
                    message:'内容已过审',
                    type:'success'
                })
                this.setPaginations()
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
                    console.log(item)
                    return item.wid != row.wid
                })
                this.$message({
                    message:'删除成功',
                    type:'success'
                })

                this.setPaginations()
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
                console.log(this.filterTableData)
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
            handleAdd(){
                // console.log("aaa")
                this.dialog={
                    show:true,
                    title:'添加',
                    option:"add"
                }
                this.formData = {
                    money : '',
                    name:'',
                    sex:''
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