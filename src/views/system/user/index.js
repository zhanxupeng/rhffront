import userList from './user.vue' // 用户列表页面
import userAdd from './add.vue' // 用户新增页面

const routers=[
    {
        name:'userList',
        path:'/views/system/user',
        meta:{
            title:'用户',
            name:'user'
        },
        component:userList
    },
    {
        name:'userAdd',
        path:'/views/system/userAdd',
        meta:{
            title:'用户新增'
        },
        component:userAdd
    },

]

const user={
    routers
}
export default user