import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login' // 登录页
Vue.use(Router)

let routerConfig = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld
  }
]

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routerConfig
}

const router = new Router(RouterConfig)

export default router
