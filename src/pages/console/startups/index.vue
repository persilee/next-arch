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
  title: '初创',
})

const store = useStartupStore()
store.read()
watch(store.params, () => {
  store.read()
})
</script>

<template>
  <div class="space-y-10">
    <ConsoleBlockHeader title="初创" :add="() => {}" />
    <div>
      <ConsoleStartupDataTable />
    </div>
  </div>
</template>
