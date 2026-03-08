import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'

import { setupRouterGuard } from '@/router/guards'
import { routes } from '@/router/routes'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
  },
})

export async function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}

export { routes, accessRoutes, coreRouteNames } from '@/router/routes'
