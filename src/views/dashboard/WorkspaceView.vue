<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

// 快捷操作
const quickActions = [
  { title: '新建项目', icon: 'ep:folder-add', color: '#409eff' },
  { title: '新建文档', icon: 'ep:document-add', color: '#67c23a' },
  { title: '新建成员', icon: 'ep:user-filled', color: '#e6a23c' },
  { title: '系统设置', icon: 'ep:setting', color: '#909399' },
]

// 最近访问
const recentVisits = [
  { title: '用户管理', time: '2小时前' },
  { title: '角色管理', time: '3小时前' },
  { title: '菜单管理', time: '昨天' },
  { title: '系统日志', time: '2天前' },
]

// 获取问候语
function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 6) return '夜深了'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 17) return '下午好'
  if (hour < 19) return '傍晚好'
  if (hour < 22) return '晚上好'
  return '夜深了'
}
</script>

<template>
  <div class="workspace">
    <!-- 欢迎区域 -->
    <div class="mb-6 rounded-lg from-blue-500 to-indigo-600 bg-gradient-to-r p-6 text-white">
      <h2 class="text-2xl font-semibold">
        {{ getGreeting() }}，{{
          authStore.userInfo?.realName || authStore.userInfo?.username || '用户'
        }}！
      </h2>
      <p class="mt-2 text-blue-100">欢迎使用 Element Plus Best 中后台管理系统</p>
    </div>

    <!-- 快捷操作 -->
    <div class="mb-6">
      <h3 class="mb-4 text-lg font-semibold">快捷操作</h3>
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="action in quickActions"
          :key="action.title"
          class="flex flex-col cursor-pointer items-center justify-center rounded-lg bg-white p-4 shadow-sm transition-shadow dark:bg-gray-800 hover:shadow-md"
        >
          <el-icon :size="32" :style="{ color: action.color }">
            <i :class="action.icon" />
          </el-icon>
          <span class="mt-2 text-sm">{{ action.title }}</span>
        </div>
      </div>
    </div>

    <!-- 统计数据 -->
    <div class="mb-6">
      <h3 class="mb-4 text-lg font-semibold">数据统计</h3>
      <div class="grid grid-cols-4 gap-4">
        <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div class="text-2xl text-blue-500 font-bold">1,234</div>
          <div class="mt-1 text-sm text-gray-500">总用户数</div>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div class="text-2xl text-green-500 font-bold">567</div>
          <div class="mt-1 text-sm text-gray-500">活跃用户</div>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div class="text-2xl text-orange-500 font-bold">89</div>
          <div class="mt-1 text-sm text-gray-500">今日访问</div>
        </div>
        <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div class="text-2xl text-purple-500 font-bold">12</div>
          <div class="mt-1 text-sm text-gray-500">系统任务</div>
        </div>
      </div>
    </div>

    <!-- 最近访问 -->
    <div class="mb-6">
      <h3 class="mb-4 text-lg font-semibold">最近访问</h3>
      <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <el-timeline>
          <el-timeline-item
            v-for="visit in recentVisits"
            :key="visit.title"
            :timestamp="visit.time"
            placement="top"
          >
            <div class="cursor-pointer text-blue-500 hover:underline">
              {{ visit.title }}
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
