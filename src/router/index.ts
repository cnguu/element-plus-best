import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import { setupRouterGuard } from '@/router/guards'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router

export async function setupRouter(app: App) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}
