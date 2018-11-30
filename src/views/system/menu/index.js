import menuList from './menu.vue' // 菜单列表页面
import menuAdd from './add.vue' // 菜单新增页面

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
    }
]

const menu={
    routers
}
export default menu