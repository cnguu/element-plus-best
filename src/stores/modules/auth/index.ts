import type { Userinfo } from '@/types/shared'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { CacheKeyEnum } from '@/enums/cacheEnum'
import { router } from '@/router'
import { LOGIN_PATH } from '@/router/routes/core'
import { storage } from '@/utils/storageUtil'

export const useAuthStore = defineStore('auth', () => {
  /** 访问令牌 */
  const accessToken = ref<string | null>(storage.get(CacheKeyEnum.TOKEN) ?? null)

  /** 用户信息 */
  const userInfo = ref<Userinfo | null>(storage.get(CacheKeyEnum.USERINFO) ?? null)

  /** 是否已登录 */
  const isLoggedIn = computed(() => !!accessToken.value)

  /** 登录加载状态 */
  const loginLoading = ref(false)

  /** 设置 Token */
  function setAccessToken(token: string | null) {
    accessToken.value = token
    if (token) {
      storage.set(CacheKeyEnum.TOKEN, token)
    } else {
      storage.remove(CacheKeyEnum.TOKEN)
    }
  }

  /** 设置用户信息 */
  function setUserInfo(info: Userinfo | null) {
    userInfo.value = info
    if (info) {
      storage.set(CacheKeyEnum.USERINFO, info)
    } else {
      storage.remove(CacheKeyEnum.USERINFO)
    }
  }

  /** 登录 */
  async function login(params: { username: string; password: string }) {
    loginLoading.value = true
    try {
      const result = await loginApi(params)
      setAccessToken(result.accessToken)
      return result
    } finally {
      loginLoading.value = false
    }
  }

  /** 退出登录 */
  async function logout(redirect = true) {
    try {
      await logoutApi()
    } catch {
      // ignore
    }

    setAccessToken(null)
    setUserInfo(null)

    if (redirect) {
      await router.push(LOGIN_PATH)
    }
  }

  /** 重置状态 */
  function $reset() {
    setAccessToken(null)
    setUserInfo(null)
  }

  return {
    accessToken,
    userInfo,
    isLoggedIn,
    loginLoading,
    setAccessToken,
    setUserInfo,
    login,
    logout,
    $reset,
  }
})
