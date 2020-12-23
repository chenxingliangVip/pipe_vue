import router from './router'
import {getToken} from '@/utils/auth' // 验权
import store from './store'
import constantRouterMap from '@/components/LeftMenu/LeftMenuData' //左侧菜单数据
// import { asyncRouterMap, constantRouterMap } from '@/router/index'
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

const whiteList = ['/Login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  let user = getToken();
  if (user) {
    user = JSON.parse(user);
    /* has token*/
    if (to.path == '/' || to.path == '') {
      next({path: '/Login'})
    } else if (to.path === '/Login') {
      next()
    }else {
      api({
        url: "/pipe/permission/queryRolePermission",
        method: "post",
        params:{userAccount:user.userAccount}
      }).then(function (response) {
        let _permission = response.result;
        store.dispatch('generateRoutes').then(() => { // 根据roles权限生成可访问的路由表
          next()
        });
        next();
      }).catch(function (resp) {
        next({path: '/Login'})
      });
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/Login')
    }
  }
})

router.afterEach(() => {
  setTimeout(() => {
    // const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle("ReLica")
  }, 0)
})
