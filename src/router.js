import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Register from './views/Register.vue'
import Login from './views/login.vue'
import NotFound from './views/404.vue'
import Home from './views/home'
import InfoShow from './views/InfoShow'
import FundList from './views/userlist'
import ContList from './views/contlist'
import LogList from './views/loglist'
import ReviewList from './views/reviewlist'
import CheckList from './views/checklist'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
  {
      path: '/index',
      name:'index',
      component: Index,
      children:[
          {path:'', component:Home},
          {path:'/home', name:'home', component:Home},
          {path:'/infoshow', name:'infoshow', component:InfoShow},
          {path:'/userlist', name:'userlist', component:FundList},
          {path:'/contlist', name:'contlist', component:ContList},
          {path:'/loglist', name:'loglist', component:LogList},
          {path:'/reviewlist', name:'reviewlist', component:ReviewList},
          {path:'/checklist', name:'checklist', component:CheckList},
      ]
  },
      {
          path: '/register',
          name:'register',
          component: Register
      }
      ,
      {
          path: '/login',
          name:'login',
          component: Login
      }
      ,
      {
          path: '*',
          name:'/404',
          component: NotFound
      }
  ]
})

//路由守卫
router.beforeEach((to,from,next) => {
    // const isLogin = localStorage.eleToken ? true:false;
    // if (to.path == '/login' || to.path =='/register'){
    //     next();
    // }else {
    //     isLogin ? next():next('/login')
    // }
    next()
})

export default router;