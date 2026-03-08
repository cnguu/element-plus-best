<script setup lang="ts">
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
</script>

<template>
  <div class="rounded-lg bg-white p-6 dark:bg-gray-800">
    <h2 class="mb-6 text-xl font-semibold">个人中心</h2>

    <el-descriptions :column="1" border>
      <el-descriptions-item label="用户名">
        {{ authStore.userInfo?.username }}
      </el-descriptions-item>
      <el-descriptions-item label="真实姓名">
        {{ authStore.userInfo?.realName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="头像">
        <el-avatar v-if="authStore.userInfo?.avatar" :src="authStore.userInfo?.avatar" :size="40" />
        <span v-else>未设置</span>
      </el-descriptions-item>
      <el-descriptions-item label="角色">
        <el-tag v-for="role in authStore.userInfo?.roles" :key="role" class="mr-1">
          {{ role }}
        </el-tag>
        <span v-if="!authStore.userInfo?.roles?.length">-</span>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
