import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // 验权
import {asyncRouterMap,constantRouterMap} from '@/router/index'
import {
  setTitle
} from '@/utils/util'
import {default as api} from "./utils/api"; // 设置浏览器头部标题

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login','/'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  next();
})

router.afterEach(() => {
  setTimeout(() => {
    // const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle("检测系统")
  }, 0)
})
