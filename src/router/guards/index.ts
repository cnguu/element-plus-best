import type { Router } from 'vue-router'

import { setupProgressGuard } from '@/router/guards/progress.ts'

export function setupRouterGuard(router: Router) {
  setupProgressGuard(router)
}
