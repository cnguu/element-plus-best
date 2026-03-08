<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="text-center">
      <h1 class="text-9xl text-gray-200 font-bold dark:text-gray-700">500</h1>
      <p class="mt-4 text-2xl text-gray-600 font-semibold dark:text-gray-300">服务器错误</p>
      <p class="mt-2 text-gray-500 dark:text-gray-400">抱歉，服务器出错了，请稍后再试</p>
      <el-button type="primary" class="mt-6" @click="goHome"> 返回首页 </el-button>
    </div>
  </div>
</template>
