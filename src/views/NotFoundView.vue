<script setup lang="ts">
const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到</p>
    <el-button type="primary" @click="goHome">返回首页</el-button>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.not-found h1 {
  font-size: 6rem;
  margin: 0;
  color: var(--el-text-color-primary);
}

.not-found p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--el-text-color-secondary);
}
</style>
