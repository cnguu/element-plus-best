import type { RouteRecordRaw } from 'vue-router'

/** 登录页面路径 */
export const LOGIN_PATH = '/login'

/** 全局 404 页面 */
export const fallbackNotFoundRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'FallbackNotFound',
  component: () => import('@/views/_core/fallback/NotFoundView.vue'),
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
    redirect: '/dashboard',
    meta: {
      title: 'Root',
    },
  },
  {
    path: LOGIN_PATH,
    name: 'Login',
    component: () => import('@/views/_core/authentication/LoginView.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
      hideInBreadcrumb: true,
    },
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/_core/fallback/ForbiddenView.vue'),
    meta: {
      title: '403',
      hideInMenu: true,
      hideInBreadcrumb: true,
    },
  },
  {
    path: '/500',
    name: 'InternalServerError',
    component: () => import('@/views/_core/fallback/InternalServerErrorView.vue'),
    meta: {
      title: '500',
      hideInMenu: true,
      hideInBreadcrumb: true,
    },
  },
]

/** 核心路由名称列表 */
export const coreRouteNames = coreRoutes.map((route) => route.name as string)
