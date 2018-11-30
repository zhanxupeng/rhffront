// 菜单
import menu from './menu'
// 角色
import role from './role'
// 用户
import user from './user'

const system ={
    routers:[]
}
system.routers=system.routers.concat(menu.routers)
system.routers=system.routers.concat(role.routers)
system.routers=system.routers.concat(user.routers)

export default system