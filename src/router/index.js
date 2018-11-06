import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login' // 登录页
import index from '@/views/index' // 主页面
//import test from '@/views/test' //菜单测试
import tableTest from '@/views/tableTest' //表格测试
//import menuTest from '@/views/menuTest' // 菜单修复测试
Vue.use(Router)

let routerConfig = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/views/index',
    name: 'index',
    component: index,
    children:[
      {
        path:'/views/index/tableTest',
        name:'tableTest',
        component:tableTest
      }
    ]
  }
]

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routerConfig
}

const router = new Router(RouterConfig)

export default router
