import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist'],
    },
  },
  presets: [presetWind3({ dark: 'class' })],
})
