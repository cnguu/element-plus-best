import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'

import { setupRouterGuard } from '@/router/guards'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: [],
})

export async function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}
