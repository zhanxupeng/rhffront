import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login' // 登录页
import index from '@/views/index' // 主页面
// import test from '@/views/test' //菜单测试
// import tableTest from '@/views/tableTest' //表格测试
// import menuTest from '@/views/menuTest' // 菜单修复测试
// import treeTest from '@/views/treeTest' //树形结构测试
// import addTest from '@/views/addTest' //新增测试
import main from '@/views/main' //首页
import system from '@/views/system' //系统配置
import basic from '@/views/basic' //基础资料

Vue.use(Router)

let routerConfig = [{
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/views/index',
    name: 'index',
    component: index,
    children: [{
        path: '/views/index',
        name: 'main',
        component: main
      }
    ]
  }
]

routerConfig[1].children = routerConfig[1].children.concat(system.routers)
routerConfig[1].children = routerConfig[1].children.concat(basic.routers)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routerConfig
}

const router = new Router(RouterConfig)

export default router
