<script setup lang="ts"></script>

<template>
  <div
    class="h-screen flex items-center justify-center from-blue-50 to-indigo-100 bg-gradient-to-br dark:from-gray-900 dark:to-gray-800"
  >
    <div class="max-w-md w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
      <!-- Logo 和标题 -->
      <div class="mb-6 text-center">
        <h1 class="text-2xl text-gray-800 font-bold dark:text-white">Element Plus Best</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">中后台前端最佳实践模板</p>
      </div>

      <!-- 路由内容 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
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
