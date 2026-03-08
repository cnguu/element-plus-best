import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { CacheKeyEnum } from '@/enums/cacheEnum'
import { storage } from '@/utils/storageUtil'

/** 主题模式 */
export type ThemeMode = 'light' | 'dark' | 'auto'

/** 主题配置 */
export interface ThemeConfig {
  /** 主题模式 */
  mode: ThemeMode
  /** 主题色 */
  primaryColor: string
  /** 是否显示水印 */
  showWatermark: boolean
  /** 是否显示页脚 */
  showFooter: boolean
}

/** 默认主题配置 */
const defaultThemeConfig: ThemeConfig = {
  mode: 'light',
  primaryColor: '#409eff',
  showWatermark: false,
  showFooter: true,
}

export const useThemeStore = defineStore('theme', () => {
  /** 主题配置 */
  const config = ref<ThemeConfig>(storage.get(CacheKeyEnum.THEME) ?? defaultThemeConfig)

  /** 是否暗黑模式 */
  const isDark = ref(false)

  /** 设置主题配置 */
  function setConfig(configs: Partial<ThemeConfig>) {
    config.value = { ...config.value, ...configs }
    storage.set(CacheKeyEnum.THEME, config.value)
  }

  /** 设置主题模式 */
  function setMode(mode: ThemeMode) {
    setConfig({ mode })
  }

  /** 设置主题色 */
  function setPrimaryColor(color: string) {
    setConfig({ primaryColor: color })
  }

  /** 切换暗黑模式 */
  function toggleDark() {
    const newMode = isDark.value ? 'light' : 'dark'
    setMode(newMode)
  }

  /** 监听主题模式变化 */
  watch(
    () => config.value.mode,
    (mode) => {
      if (mode === 'auto') {
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      } else {
        isDark.value = mode === 'dark'
      }
      updateDocumentClass()
    },
    { immediate: true },
  )

  /** 更新文档类名 */
  function updateDocumentClass() {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  /** 监听系统主题变化 */
  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (config.value.mode === 'auto') {
        isDark.value = e.matches
        updateDocumentClass()
      }
    })
  }

  /** 重置状态 */
  function $reset() {
    config.value = defaultThemeConfig
    storage.set(CacheKeyEnum.THEME, defaultThemeConfig)
  }

  return {
    config,
    isDark,
    setConfig,
    setMode,
    setPrimaryColor,
    toggleDark,
    $reset,
  }
})
