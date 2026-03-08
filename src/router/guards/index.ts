import type { Router } from 'vue-router'

import { setupAccessGuard } from './access'
import { setupProgressGuard } from './progress'

export function setupRouterGuard(router: Router) {
  setupProgressGuard(router)
  setupAccessGuard(router)
}
