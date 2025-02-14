<script setup lang="ts">
const items = ref()

const getItems = () => {
  items.value = [
    {
      title: '黑喵',
    },
    {
      title: '橘喵',
    },
    {
      title: '花喵',
    },
  ]
}
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center px-4">
    <div class="flex flex-col gap-4 items-center list">
      <div class="font-bold text-lg">喵吧</div>
      <div class="item" v-for="(item, index) in items" :key="index">
        <div class="title">{{ item.title }}</div>
      </div>
      <UButton class="load" @click="getItems">加载数据</UButton>
    </div>
  </div>
</template>
