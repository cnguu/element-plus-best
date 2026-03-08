import App from '@/app.vue'
import { setupI18n } from '@/locales'
import { setupDayjs } from '@/plugins/dayjs'
import { setupElementPlusPropDefault } from '@/plugins/element-plus'
import { setupIconifyOffline } from '@/plugins/iconify'
import { setupNProgress } from '@/plugins/n-progress'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'

import '@/styles/plugins/index.scss'

async function setupApp() {
  setupNProgress()

  setupIconifyOffline()

  setupDayjs()

  setupElementPlusPropDefault()

  const app = createApp(App)

  setupStore(app)

  setupI18n(app)

  await setupRouter(app)

  app.mount('#app')
}

setupApp()
