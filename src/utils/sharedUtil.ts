import type { ComponentInternalInstance } from 'vue'

export function getLifeCycleTarget(target?: ComponentInternalInstance | null) {
  return target || getCurrentInstance()
}

/**
 * Promised setTimeout
 */
export function sleep(ms: number, callback?: Fn<any>): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(async () => {
      await (callback == null ? void 0 : callback())
      resolve()
    }, ms),
  )
}
