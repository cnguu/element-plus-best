import type { ProxyOptions } from 'vite'

export const getServerProxy = (list: [string, string][]) => {
  const ret: Record<string, string | ProxyOptions> = {}
  for (const [prefix, target] of list) {
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(/^https:\/\//.test(target) ? { secure: false } : {}),
    }
  }
  return ret
}
