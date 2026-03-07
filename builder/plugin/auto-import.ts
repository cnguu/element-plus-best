import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const UnPluginAutoImport = AutoImport({
  imports: ['vue', 'vue-router', 'pinia'],
  resolvers: [ElementPlusResolver()],
  dts: 'dts/auto-import.d.ts',
})
