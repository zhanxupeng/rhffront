import menuList from './menu.vue' // 菜单列表页面
import menuAdd from './add.vue' // 菜单新增页面
import menuOperationList from './menuoperation.vue' // 子功能列表页面
import menuOperationAdd from './menuoperationadd.vue' // 子功能新增页面

const routers=[
    {
        name:'menuList',
        path:'/views/system/menu',
        meta:{
            title:'菜单',
            name:'menu'
        },
        component:menuList
    },
    {
        name:'menuAdd',
        path:'/views/system/menuAdd',
        meta:{
            title:'菜单新增'
        },
        component:menuAdd
    },
    {
        name:'menuOperationList',
        path:'/views/system/menuOperation',
        meta:{
            title:'菜单子功能',
            name:'menuOperation'
        },
        component:menuOperationList
    },
    {
        name:'menuOperationAdd',
        path:'/views/system/menuOperationAdd',
        meta:{
            title:'子功能新增'
        },
        component:menuOperationAdd
    }
]

const menu={
    routers
}
export default menu