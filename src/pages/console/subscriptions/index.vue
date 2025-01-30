<script setup lang="ts">
/**
 * 页面元数据
 */
definePageMeta({
  layout: 'console',
})

/**
 * 页头
 */
useHead({
  title: '订阅',
})
</script>

<template>
  <div class="space-y-10">
    <ConsoleBlockHeader title="订阅" :add="() => {}" />
  </div>
</template>
