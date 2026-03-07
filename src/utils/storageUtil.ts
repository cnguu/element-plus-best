import type { CacheKeyType, CacheValueType } from '@/enums/cacheEnum.ts'

interface StorageValue<K extends CacheKeyType> {
  value: CacheValueType[K]
  ttl?: number
}

interface StorageInfo {
  keys: CacheKeyType[]
  length: number
}

class Storage {
  private namespace: string
  private prefix: string

  constructor(namespace?: string) {
    this.namespace = namespace ?? 'epb'
    this.prefix = `${this.namespace}#`
  }

  set<K extends CacheKeyType>(key: K, value: CacheValueType[K], ttl: number = 0): void {
    const storageKey: string = `${this.prefix}${key}`
    const storageValue: StorageValue<K> = {
      value,
      ttl: ttl > 0 ? ttl * 1000 + Date.now() : 0,
    }
    localStorage.setItem(storageKey, JSON.stringify(storageValue))
  }

  get<K extends CacheKeyType>(key: K): CacheValueType[K] | undefined {
    const storageKey: string = `${this.prefix}${key}`
    const rawValue: string | null = localStorage.getItem(storageKey)
    if (!rawValue) {
      return void 0
    }
    try {
      const storageValue: StorageValue<K> = JSON.parse(rawValue)
      storageValue.ttl = storageValue.ttl ?? 0
      if (storageValue.ttl > 0 && storageValue.ttl < Date.now()) {
        this.remove(key)
        return void 0
      }
      return storageValue.value
    } catch {
      return void 0
    }
  }

  remove<K extends CacheKeyType>(key: K): void {
    const storageKey: string = `${this.prefix}${key}`
    localStorage.removeItem(storageKey)
  }

  getInfo(): StorageInfo {
    const keys: CacheKeyType[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(this.prefix)) {
        keys.push(key.slice(this.prefix.length) as CacheKeyType)
      }
    }
    return {
      keys,
      length: keys.length,
    }
  }

  clear(): void {
    this.getInfo().keys.forEach((key) => this.remove(key))
  }
}

/**
 * 存储工具类
 */
export const storage = new Storage()
