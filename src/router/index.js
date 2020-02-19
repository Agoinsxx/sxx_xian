import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../pages/Layout.vue'
import ContentGl from '../pages/content'
import Params from '../pages/params'
import Product from '../pages/product'
import Login from '../pages/Login'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:'/',
        name:'Product',
        component:Product,
        meta:{
          isLogin:true
        }
      },
      {
        path:'/params',
        name:"Params",
        component:Params,
        meta:{
          isLogin:true
        }
      },
      {
        path:'/content',
        name:'ContentGl',
        component:ContentGl,
        meta:{
          isLogin:true
        }
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass:"active",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){//需要登录
      const token = store.state.loginModule.token
      if(token){//登录成功
          next()
      }else{//登录失败
        next({
          path:'/login'
        })
      }
  }else{//不需要登录
    next()
  }
})

export default router
