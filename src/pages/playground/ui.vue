<script setup lang="ts">
import { UButton } from '#components'

const { metaSymbol } = useShortcuts()

const isModalOpen = ref(false)
defineShortcuts({
  meta_o: {
    handler: () => {
      isModalOpen.value = true
    },
  },
})

const onClick = () => {
  const toast = useToast()
  toast.add({
    id: 'notification-1',
    title: '通知',
    description: '这是一条通知',
    icon: 'i-heroicons-information-circle',
    actions: [
      {
        label: '关闭',
        color: 'primary',
        variant: 'outline',
        click: () => {
          toast.remove('notification-1')
        },
      },
      {
        label: '接受',
        color: 'green',
        click: () => {
          toast.remove('notification-1')
        },
      },
    ],
  })
}
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
    <div class="flex gap-3">
      <UButton color="purple" @click="onClick">通知</UButton>
    </div>
  </div>
</template>
