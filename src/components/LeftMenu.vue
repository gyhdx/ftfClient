<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu
                    class="el-menu-vertical-demo"
                    background-color="#324057"
                    text-color="#fff"
                    active-text-color="#409eff">
                <router-link to="home">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                    <template v-for="item in items">
                        <router-link :to="item.path">
                            <el-menu-item :index="item.path">
                                <i :class="'fa fa-margin'+item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </router-link>

                    </template>
                    <el-menu-item index="3">
                        <i class="fa fa-margin el-icon-delete"></i>
                        <span slot="title" @click="logout">退出</span>
                    </el-menu-item>
                <!--</router-link>-->

            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'left-menu',
        data() {
            return {
                items: [
                    {
                        icon: ' el-icon-tickets',
                        name: '动态管理',
                        path: 'contlist'
                    },
                    {
                        icon: ' el-icon-warning-outline',
                        name: '审核管理',
                        path: 'checklist'
                    },
                    {
                        icon: ' el-icon-s-custom',
                        name: '用户管理',
                        path: 'userlist'
                    },
                    {
                        icon: ' el-icon-notebook-2',
                        name: '日志记录',
                        path: 'loglist'
                    },
                    {
                        icon: ' el-icon-user',
                        name: '个人信息',
                        path: 'infoshow'
                    }
                ]
            }
        },
        methods: {

        logout() {
            // console.log('提出')
            // 设置vuex store
            this.$store.dispatch("clearCurrentState");
            // 跳转到登录界面
            this.$router.push('/login')
        }}
    }


</script>

<style scoped>
    .menu_page {
        position: fixed;
        top: 71px;
        left: 0;
        min-height: 100%;
        background-color: #324057;
        z-index: 99;
    }
    .el-menu {
        border: none;
    }
    .fa-margin {
        margin-right: 5px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }
    .el-menu-vertical-demo {
        width: 35px;
    }
    .el-submenu .el-menu-item {
        min-width: 180px;
    }

    .hiddenDropdown,
    .hiddenDropname {
        display: none;
    }
    a {
        text-decoration: none;
    }
</style>