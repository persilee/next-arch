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
  title: '加入',
})
</script>

<template>
  <div>
    <div class="mb-6">
      <ReceptionProviderWechatButton scene="signup" />
      <ReceptionElementSeparator label="通过用户名注册" />
    </div>
  </div>
</template>
