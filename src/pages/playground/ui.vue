<script setup lang="ts">
import { UButton } from '#components'
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <div class="py-8 px-4">
      <UButton>按钮</UButton>
    </div>
    <div>
      <UIcon name="i-heroicons-moon" class="text-4xl"></UIcon>
      <UIcon name="solar:asteroid-bold" class="text-4xl"></UIcon>
      <UIcon name="ri:aliens-fill" class="text-4xl"></UIcon>
    </div>
  </div>
</template>
