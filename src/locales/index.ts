import type { LangType } from '@/types/app'

import enUSEle from 'element-plus/es/locale/lang/en'
import zhCNEle from 'element-plus/es/locale/lang/zh-cn'
import { createI18n } from 'vue-i18n'

import { CacheKeyEnum } from '@/enums/cacheEnum'
import { storage } from '@/utils/storageUtil'

import enUS from './langs/en-US'
import zhCN from './langs/zh-CN'

/** 语言包映射 */
const messages: Record<LangType, Record<string, unknown>> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

/** Element Plus 语言包映射 */
const elementLocaleMap: Record<LangType, unknown> = {
  'zh-CN': zhCNEle,
  'en-US': enUSEle,
}

/** 获取存储的语言或默认语言 */
function getDefaultLocale(): LangType {
  const stored = storage.get(CacheKeyEnum.LANG)
  if (stored && messages[stored]) {
    return stored
  }
  return 'zh-CN'
}

/** 创建 i18n 实例 */
export const i18n = createI18n({
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages,
})

/** Element Plus 语言包 */
export const elementLocale = computed(() => {
  const locale = i18n.global.locale.value as LangType
  return elementLocaleMap[locale] || zhCNEle
})

/** 切换语言 */
export async function changeLocale(locale: LangType) {
  if (!messages[locale]) {
    return
  }

  // 更新 i18n
  i18n.global.locale.value = locale

  // 更新存储
  storage.set(CacheKeyEnum.LANG, locale)

  // 更新 HTML lang 属性
  document.documentElement.lang = locale
}

/** 翻译函数 */
export function $t(key: string, ...args: unknown[]): string {
  return i18n.global.t(key, ...args) as string
}

/** 设置 i18n */
export function setupI18n(app: import('vue').App) {
  app.use(i18n)
}

export { messages }
