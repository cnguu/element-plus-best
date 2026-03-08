import type { RouteRecordRaw } from 'vue-router'

/** 全局 404 页面 */
export const fallbackNotFoundRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'FallbackNotFound',
  component: () => import('@/views/NotFoundView.vue'),
  meta: {
    title: '404',
    hideInMenu: true,
    hideInBreadcrumb: true,
  },
}

/** 核心路由，这些路由是必须存在的 */
export const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/home',
    meta: {
      title: 'Root',
    },
  },
]
