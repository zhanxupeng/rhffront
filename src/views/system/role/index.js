import roleList from './role.vue' // 角色列表页面
import roleAdd from './add.vue' // 角色新增页面
import roleUser from './roleUser.vue' //分配用户页面
import roleRight from './roleRight.vue'//分配权限页面

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
    },
	{
		name:'roleUser',
		path:'/views/system/roleUser',
		meta:{
			title:'分配用户'
		},
		component:roleUser
	},
	{
		name:'roleRight',
		path:'/views/system/roleRight',
		meta:{
			title:'分配权限'
		},
		component:roleRight
	}
]

const role={
    routers
}
export default role