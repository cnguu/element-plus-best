import { EventKeyEnum } from '@/enums/eventEnum.ts'

/** 事件传值类型 */
export type EventParams = {
  [EventKeyEnum.REFRESH]: undefined

  [EventKeyEnum.LOGIN_SUCCESS]: undefined
  [EventKeyEnum.LOGIN_EXPIRED]: undefined

  [EventKeyEnum.ACTION_SUCCESS]: undefined
}

export type EventCallback<K extends keyof EventParams> = (
  params: EventParams[K],
) => void | Promise<void>

export interface EventBus {
  $on<K extends keyof EventParams>(eventName: K, callback: EventCallback<K>): void
  $once<K extends keyof EventParams>(eventName: K, callback: EventCallback<K>): void
  $emit<K extends keyof EventParams>(eventName: K, params?: EventParams[K]): void
  $off(): void
  $off<K extends keyof EventParams>(eventName: K): void
  $off<K extends keyof EventParams>(eventName: K[]): void
  $off<K extends keyof EventParams>(eventName: K, callback: EventCallback<K>): void
}
