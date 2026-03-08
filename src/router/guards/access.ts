import type { Router } from 'vue-router'

import { LOGIN_PATH, coreRouteNames } from '@/router/routes'
import { useAuthStore } from '@/stores'

/** 白名单路由（不需要登录即可访问） */
const WHITE_LIST = new Set([...coreRouteNames, 'Login', 'Forbidden', 'InternalServerError'])

/**
 * 设置权限守卫
 */
export function setupAccessGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore()

    // 白名单路由直接放行
    if (WHITE_LIST.has(to.name as string)) {
      next()
      return
    }

    // 检查登录状态
    if (!authStore.isLoggedIn) {
      // 未登录，重定向到登录页
      next({
        path: LOGIN_PATH,
        query: { redirect: to.fullPath },
      })
      return
    }

    // 已登录，放行
    next()
  })
}
