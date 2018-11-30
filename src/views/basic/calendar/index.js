import calendarList from './calendar.vue' // 用户列表页面
import calendarAdd from './add.vue' // 用户新增页面

const routers=[
    {
        name:'calendarList',
        path:'/views/system/calendar',
        meta:{
            title:'日历',
            name:'calendar'
        },
        component:calendarList
    },
    {
        name:'calendarAdd',
        path:'/views/system/calendarAdd',
        meta:{
            title:'日历新增'
        },
        component:calendarAdd
    }
]

const calendar={
    routers
}
export default calendar