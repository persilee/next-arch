<script setup lang="ts">
/**
 * 属性
 */
type Props = { label: string }

const props = defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 items-center my-6 text-white dark:text-black text-xs">
    <hr class="w-full h-px border-0 bg-white/60 dark:bg-black/60" />
    <div class="whitespace-nowrap">
      <slot>{{ label }}</slot>
    </div>
    <hr class="w-full h-px border-0 bg-white/60 dark:bg-black/60" />
  </div>
</template>
