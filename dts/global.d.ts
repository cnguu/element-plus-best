export {}

declare global {
  /**
   * Void function
   */
  type Fn<T = void> = () => T

  /**
   * Any function
   */
  type AnyFn = (...args: any[]) => any

  /**
   * Generic function
   */
  type GenericFn<Args extends any[] = [], R = void> = (...args: Args) => R

  interface Pausable {
    /**
     * A ref indicate whether a pausable instance is active
     */
    readonly isActive: Readonly<ShallowRef<boolean>>

    /**
     * Temporary pause the effect from executing
     */
    pause: Fn

    /**
     * Resume the effects
     */
    resume: Fn
  }

  export interface Window {
    /** NProgress instance */
    NProgress: (typeof import('@/plugins/n-progress'))['default']
  }
}
