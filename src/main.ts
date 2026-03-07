import App from '@/App.vue'
import { setupNProgress } from '@/plugins/n-progress'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'

import '@/styles/plugins/tailwind.css'
import '@/styles/plugins/index.scss'

async function setupApp() {
  setupNProgress()

  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)

  app.mount('#app')
}

setupApp()
