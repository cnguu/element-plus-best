<script setup lang="ts">
const features = [
  { title: 'Vue 3.5', description: '最新的 Vue 3 组合式 API', icon: 'logos:vue' },
  { title: 'Vite 7', description: '极速的开发体验', icon: 'logos:vitejs' },
  { title: 'TypeScript 5.9', description: '完整的类型支持', icon: 'logos:typescript-icon' },
  { title: 'Element Plus', description: '企业级 UI 组件库', icon: 'logos:element' },
  { title: 'Pinia 3', description: '轻量级状态管理', icon: 'logos:pinia' },
  { title: 'UnoCSS', description: '原子化 CSS 引擎', icon: 'logos:unocss' },
]
</script>

<template>
  <div class="about">
    <div class="mb-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
      <h2 class="mb-4 text-2xl font-bold">关于项目</h2>
      <p class="mb-4 text-gray-600 dark:text-gray-300">
        Element Plus Best 是一个基于 Vue 3 + TypeScript + Element Plus 的中后台前端最佳实践模板。
        旨在提供一套开箱即用的中后台前端解决方案。
      </p>

      <h3 class="mb-3 text-lg font-semibold">技术栈</h3>
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex items-center gap-3 border border-gray-200 rounded-lg p-4 dark:border-gray-700"
        >
          <el-icon :size="24">
            <i :class="feature.icon" />
          </el-icon>
          <div>
            <div class="font-medium">{{ feature.title }}</div>
            <div class="text-sm text-gray-500">{{ feature.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
      <h3 class="mb-3 text-lg font-semibold">项目特点</h3>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="代码规范">
          ESLint + Prettier + Husky 完整的代码规范工具链
        </el-descriptions-item>
        <el-descriptions-item label="类型安全">
          完整的 TypeScript 类型定义，告别 any
        </el-descriptions-item>
        <el-descriptions-item label="组件封装">
          基于 Element Plus 的二次封装，提高开发效率
        </el-descriptions-item>
        <el-descriptions-item label="权限管理"> 完整的路由权限和按钮权限控制 </el-descriptions-item>
        <el-descriptions-item label="主题定制">
          支持亮色/暗色主题切换，CSS 变量驱动
        </el-descriptions-item>
        <el-descriptions-item label="国际化"> 内置 i18n 国际化支持 </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>
