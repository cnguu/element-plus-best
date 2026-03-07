import type { EventBus, EventCallback, EventParams } from '@/types/event.ts'

import { isArr } from '@/utils/isUtil.ts'

/** 事件映射表 */
const events = new Map<keyof EventParams, Set<EventCallback<keyof EventParams>>>()

export const eventUtil: EventBus = {
  /** 订阅事件 */
  $on<K extends keyof EventParams>(eventName: K, callback: EventCallback<K>) {
    const callbacks = events.get(eventName)
    if (callbacks) {
      callbacks.add(callback as EventCallback<keyof EventParams>)
    } else {
      events.set(eventName, new Set([callback as EventCallback<keyof EventParams>]))
    }
  },

  /** 订阅一次性事件 */
  $once<K extends keyof EventParams>(eventName: K, callback: EventCallback<K>) {
    const wrapper: EventCallback<K> = (params) => {
      eventUtil.$off(eventName, wrapper)
      callback(params)
    }
    eventUtil.$on(eventName, wrapper)
  },

  /** 触发事件 */
  $emit<K extends keyof EventParams>(eventName: K, params?: EventParams[K]) {
    const callbacks = events.get(eventName)
    if (callbacks) {
      callbacks.forEach((callback) => callback(params as EventParams[K & keyof EventParams]))
    }
  },

  /** 取消订阅 */
  $off<K extends keyof EventParams>(eventName?: K | K[], callback?: EventCallback<K>) {
    // 无参数时清空所有事件
    if (eventName === undefined) {
      events.clear()
      return
    }

    // 数组时递归处理
    if (isArr(eventName)) {
      eventName.forEach((name) => eventUtil.$off(name))
      return
    }

    // 有事件名但无回调时移除该事件所有订阅
    if (callback === undefined) {
      events.delete(eventName)
      return
    }

    // 有事件名和回调时移除指定回调
    const callbacks = events.get(eventName)
    if (callbacks) {
      callbacks.delete(callback as EventCallback<keyof EventParams>)
      // 如果该事件没有订阅者了，移除整个事件
      if (callbacks.size === 0) {
        events.delete(eventName)
      }
    }
  },
}
