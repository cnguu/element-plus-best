import type { RouteRecordRaw } from 'vue-router'

import { mergeRouteModules } from '@/utils/routeUtil'
import { traverseTreeValues } from '@/utils/treeUtil'

import { coreRoutes, fallbackNotFoundRoute } from './core'

/** 动态导入 modules 目录下的所有路由模块 */
const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
})

/** 动态路由 */
export const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles)

/** 静态路由（预留扩展） */
const staticRoutes: RouteRecordRaw[] = []

/** 核心路由名称列表（这些路由不需要权限拦截） */
export const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name)

/** 需要权限校验的路由列表 */
export const accessRoutes: RouteRecordRaw[] = [...dynamicRoutes, ...staticRoutes]

/**
 * 路由列表
 * - 包含核心路由 + 动态路由 + 404兜底路由
 * - 如需权限控制，可将 accessRoutes 移除，通过权限守卫动态添加
 */
export const routes: RouteRecordRaw[] = [...coreRoutes, ...accessRoutes, fallbackNotFoundRoute]
