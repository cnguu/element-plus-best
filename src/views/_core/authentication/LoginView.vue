<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { useAuthStore } from '@/stores'
import { logUtil } from '@/utils/logUtil.ts'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' },
  ],
}

async function handleSubmit() {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      await authStore.login(loginForm)
      ElMessage.success('登录成功')

      // 跳转到之前的页面或首页
      const redirect = (route.query.redirect as string) || '/dashboard'
      await router.push(redirect)
    } catch (error) {
      logUtil.error('登录失败:', error)
    } finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <el-form
    ref="formRef"
    :model="loginForm"
    :rules="rules"
    label-position="top"
    @submit.prevent="handleSubmit"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="ep:user" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="请输入密码"
        prefix-icon="ep:lock"
        show-password
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading" class="w-full">
        登录
      </el-button>
    </el-form-item>
  </el-form>

  <div class="mt-4 text-center text-sm text-gray-500">
    <p>演示账号: admin / 123456</p>
  </div>
</template>
