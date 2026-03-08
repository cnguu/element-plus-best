import type { Userinfo } from '@/types/shared.ts'

/**
 * 缓存键枚举
 */
export const CacheKeyEnum = {
  /** 语言 */
  LANG: 'lang',
  /** 授权令牌 */
  TOKEN: 'token',
  /** 用户信息 */
  USERINFO: 'userinfo',
} as const
export type CacheKeyType = (typeof CacheKeyEnum)[keyof typeof CacheKeyEnum]

/** 存储值的类型映射 */
export type CacheValueType = {
  /** 语言 */
  [CacheKeyEnum.LANG]: App.I18n.LangType
  /** 授权令牌 */
  [CacheKeyEnum.TOKEN]: string
  /** 用户信息 */
  [CacheKeyEnum.USERINFO]: Userinfo | null
}
