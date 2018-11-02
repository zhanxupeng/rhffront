import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login' // 登录页
import index from '@/views/index' // 主页面
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
    component: index
  }
]

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routerConfig
}

const router = new Router(RouterConfig)

export default router
