<script setup lang="ts">
import { UButton } from '#components'

const { metaSymbol } = useShortcuts()
console.log(metaSymbol)

const isModalOpen = ref(false)
defineShortcuts({
  meta_o: {
    handler: () => {
      isModalOpen.value = true
    },
  },
})
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center gap-6">
    <div>
      <UButton>按钮</UButton>
    </div>
    <div class="flex gap-3">
      <UIcon name="i-heroicons-moon" class="text-4xl"></UIcon>
      <UIcon name="solar:asteroid-bold" class="text-4xl"></UIcon>
      <UIcon name="ri:aliens-fill" class="text-4xl"></UIcon>
    </div>
    <div class="flex gap-3">
      <UKbd>{{ metaSymbol }}</UKbd>
      <UKbd>O</UKbd>
    </div>
    <UModal v-model="isModalOpen">
      <UCard>快捷键</UCard>
    </UModal>
  </div>
</template>
