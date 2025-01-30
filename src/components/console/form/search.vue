<script setup lang="ts">
import { UButton, UInput } from '#components'

/**
 * 属性
 */
type Props = { modelValue?: string; withReset?: boolean; onReset?: () => void }

defineProps<Props>()

const emit = defineEmits()

const onUpdate = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <UInput placeholder="搜索" :modelValue="modelValue" @update:modelValue="onUpdate">
    <template #trailing>
      <div class="flex items-center">
        <UButton
          v-if="withReset ? withReset : modelValue"
          trailingIcon="i-ri-close-line"
          variant="ghost"
          size="xs"
          :padded="false"
          class="pointer-events-auto"
          @click="onReset ? onReset : onUpdate('')"
        />
      </div>
    </template>
  </UInput>
</template>
