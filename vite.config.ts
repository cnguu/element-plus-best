import type { ConfigEnv } from 'vite'

import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createLogger, defineConfig, loadEnv, normalizePath } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import { UnPluginAutoImport, UnPluginVueComponents, VitePluginCompression } from './builder/plugin'
import { getServerProxy } from './builder/util'

const logger = createLogger()

export default ({ mode }: ConfigEnv) => {
  const isProd = mode === 'production'
  const envDir = fileURLToPath(new URL('./env', import.meta.url))
  const env = loadEnv(mode, envDir) as unknown as ImportMetaEnv
  const { VITE_APP_TITLE, VITE_SERVER_PORT, VITE_SERVER_PROXY } = env

  logger.info(`${VITE_APP_TITLE} 启动中...`, { timestamp: true })
  logger.info(`环境变量: ${JSON.stringify(env, null, 2)}`, { timestamp: true })

  return defineConfig({
    envDir,
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      UnPluginAutoImport,
      UnPluginVueComponents,
      isProd && VitePluginCompression,
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/shared.scss" as *;`,
        },
      },
    },
    server: {
      host: true,
      port: Number(VITE_SERVER_PORT),
      strictPort: false,
      proxy: VITE_SERVER_PROXY ? getServerProxy(JSON.parse(VITE_SERVER_PROXY)) : void 0,
      watch: {
        ignored: ['**/dist/**'],
      },
    },
    build: {
      target: 'baseline-widely-available',
      minify: 'esbuild',
      cssMinify: 'lightningcss',
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = normalizePath(id)
            if (normalizedId.includes('element-plus/')) {
              return 'element-plus'
            }
            if (
              normalizedId.includes('node_modules/vue/') ||
              normalizedId.includes('node_modules/@vue/')
            ) {
              return 'vue-vendor'
            }
            if (normalizedId.includes('node_modules/')) {
              return 'vendor'
            }
          },
        },
      },
    },
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : void 0,
    },
  })
}
