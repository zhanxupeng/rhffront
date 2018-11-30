import roleList from './role.vue' // 角色列表页面
import roleAdd from './add.vue' // 角色新增页面

const routers=[
    {
        name:'roleList',
        path:'/views/system/role',
        meta:{
            title:'角色',
            name:'role'
        },
        component:roleList
    },
    {
        name:'roleAdd',
        path:'/views/system/roleAdd',
        meta:{
            title:'角色新增'
        },
        component:roleAdd
    }
]

const role={
    routers
}
export default role