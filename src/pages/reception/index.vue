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
      <ReceptionElementButton
        label="创建账户"
        to="/reception/signup"
        description="注册表示同意服务条款及隐私政策，其中包括 Cookie 使用条款。"
      />
    </div>
    <ReceptionElementButton
      label="登录"
      variant="outline"
      to="/reception/signup"
      title="已有账户？"
    />
  </div>
</template>
