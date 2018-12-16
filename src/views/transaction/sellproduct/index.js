import sellproductList from './sellproduct.vue'
import sellproductAdd from './add.vue'

const routers=[
    {
        name:'sellproductList',
        path:'/views/transaction/sellproduct',
        meta:{
            title:'销售产品',
            name:'sellproduct'
        },
        component:sellproductList
    },
    {
        name:'sellproductAdd',
        path:'/views/transaction/sellproductAdd',
        meta:{
            title:'销售产品新增'
        },
        component:sellproductAdd
    }
]

const sellproduct={
    routers
}
export default sellproduct
