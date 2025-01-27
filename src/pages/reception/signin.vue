<script setup lang="ts">
/**
 * 页面元数据
 */
definePageMeta({
  layout: 'reception',
})

/**
 * 页头
 */
useHead({
  title: '登录',
})

const signMethod = useState('signinMethod', () => 'password')

const separatorLabel = computed(() => {
  return signMethod.value === 'password'
    ? '通过用户名、邮箱、手机号和密码登录'
    : '通过邮箱、手机号和验证码登录'
})
</script>

<template>
  <div>
    <div class="space-y-4">
      <ReceptionProviderWechatButton scene="signin" />
      
    </div>
    <ReceptionElementSeparator :label="separatorLabel" />
    <ReceptionSigninForm />
  </div>
</template>
