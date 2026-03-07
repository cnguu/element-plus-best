import type { Router } from 'vue-router'

export function setupProgressGuard(router: Router) {
  router.beforeEach(() => {
    window.NProgress.start()
  })

  router.afterEach(() => {
    window.NProgress.done()
  })
}
