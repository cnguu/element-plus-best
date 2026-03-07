import type { PluginOption } from 'vite'

import { visualizer } from 'rollup-plugin-visualizer'

export const UnPluginVisualizer = visualizer({
  filename: './dist/stats.html',
  open: true,
  gzipSize: true,
  brotliSize: true,
}) as PluginOption
