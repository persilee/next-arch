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
  title: '注册',
})
</script>

<template>
  <div>
    <div class="space-y-4">
      <ReceptionProviderWechatButton scene="signup" />
    </div>
    <ReceptionElementSeparator label="通过用户名注册" />
    <ReceptionSignupForm />
  </div>
</template>
