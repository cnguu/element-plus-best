import type { RouteRecordRaw } from 'vue-router'

import { mergeRouteModules } from '@/utils/routeUtil'

import { coreRoutes, fallbackNotFoundRoute } from './core'

/** 动态导入 modules 目录下的所有路由模块 */
const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
})

/** 动态路由 */
export const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles)

/** 静态路由 */
const staticRoutes: RouteRecordRaw[] = []

/** 需要权限校验的路由列表 */
export const accessRoutes: RouteRecordRaw[] = [...dynamicRoutes, ...staticRoutes]

/** 导出核心路由名称 */
export { coreRouteNames, LOGIN_PATH } from './core'

/**
 * 路由列表
 * - 核心路由（登录、403、500等）优先匹配
 * - 权限路由通过守卫动态添加
 * - 404兜底路由放在最后
 */
export const routes: RouteRecordRaw[] = [...coreRoutes, ...accessRoutes, fallbackNotFoundRoute]
