<script setup lang="ts">
import { useAuthStore, useThemeStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

// 菜单项
const menuItems = [
  { path: '/dashboard', title: '工作台', icon: 'ep:home-filled' },
  { path: '/about', title: '关于', icon: 'ep:info-filled' },
]

// 当前激活菜单
const activeMenu = computed(() => route.path)

// 是否折叠菜单
const isCollapse = ref(false)

// 切换菜单折叠
function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}

// 退出登录
async function handleLogout() {
  await authStore.logout()
}

// 切换主题
function handleToggleTheme() {
  themeStore.toggleDark()
}
</script>

<template>
  <el-container class="h-screen">
    <!-- 侧边栏 -->
    <el-aside
      :width="isCollapse ? '64px' : '220px'"
      class="bg-[var(--el-bg-color-page)] transition-width duration-300"
    >
      <div class="h-full flex flex-col">
        <!-- Logo -->
        <div
          class="h-14 flex items-center justify-center border-b border-[var(--el-border-color-lighter)]"
        >
          <span v-if="!isCollapse" class="text-lg font-bold">Element Plus Best</span>
          <span v-else class="text-lg font-bold">E</span>
        </div>

        <!-- 菜单 -->
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :router="true"
          class="flex-1 border-none"
        >
          <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
            <el-icon>
              <i :class="item.icon" />
            </el-icon>
            <template #title>
              {{ item.title }}
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header
        class="flex items-center justify-between border-b border-[var(--el-border-color-lighter)] bg-white"
      >
        <div class="flex items-center">
          <el-button text @click="toggleCollapse">
            <el-icon :size="20">
              <i :class="isCollapse ? 'ep:expand' : 'ep:fold'" />
            </el-icon>
          </el-button>
        </div>

        <div class="flex items-center gap-2">
          <!-- 主题切换 -->
          <el-button text @click="handleToggleTheme">
            <el-icon :size="20">
              <i :class="themeStore.isDark ? 'ep:sunny' : 'ep:moon'" />
            </el-icon>
          </el-button>

          <!-- 用户菜单 -->
          <el-dropdown>
            <div class="flex cursor-pointer items-center gap-2">
              <el-avatar :size="32" :src="authStore.userInfo?.avatar">
                {{ authStore.userInfo?.realName?.charAt(0) || 'U' }}
              </el-avatar>
              <span>{{
                authStore.userInfo?.realName || authStore.userInfo?.username || '用户'
              }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/profile')">
                  <el-icon><i class="ep:user" /></el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><i class="ep:switch-button" /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主内容区 -->
      <el-main class="bg-[var(--el-bg-color-page)] p-4">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>

      <!-- 页脚 -->
      <el-footer
        v-if="themeStore.config.showFooter"
        class="h-10 flex items-center justify-center border-t border-[var(--el-border-color-lighter)] bg-white text-sm text-[var(--el-text-color-secondary)]"
      >
        Copyright © 2024 Element Plus Best
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
