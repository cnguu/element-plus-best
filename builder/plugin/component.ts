import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export const UnPluginVueComponents = Components({
  resolvers: [
    ElementPlusResolver({
      importStyle: 'sass',
    }),
  ],
  dts: 'dts/components.d.ts',
})
