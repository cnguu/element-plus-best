import type { ConfigEnv } from 'vite'

import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createLogger, defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import {
  UnPluginAutoImport,
  UnPluginVisualizer,
  UnPluginVueComponents,
  VitePluginCompression,
} from './builder/plugin'
import { getServerProxy } from './builder/util'

const logger = createLogger()

export default ({ mode }: ConfigEnv) => {
  const isProd = mode === 'production'
  const envDir = fileURLToPath(new URL('./env', import.meta.url))
  const env = loadEnv(mode, envDir) as unknown as ImportMetaEnv
  const { VITE_APP_TITLE, VITE_SERVER_PORT, VITE_SERVER_PROXY } = env

  logger.info(VITE_APP_TITLE, { timestamp: true })
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
      isProd && UnPluginVisualizer,
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
      chunkSizeWarningLimit: 500,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          compact: true,
          experimentalMinChunkSize: 10 * 1024,
          manualChunks: {
            'vendor-core': ['pinia', 'vue', 'vue-router'],
            'vendor-utils': ['dayjs', 'enum-plus', 'lodash', 'number-precision'],
          },
        },
      },
      reportCompressedSize: true,
    },
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : void 0,
    },
  })
}
