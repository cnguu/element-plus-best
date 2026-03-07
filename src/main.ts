import App from '@/App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'

async function setupApp() {
  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)

  app.mount('#app')
}

setupApp()
