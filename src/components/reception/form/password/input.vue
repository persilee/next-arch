<script setup lang="ts">
import { UInput } from '#components'

type Props = {
  withVisibility?: boolean
  withReset?: boolean
}

withDefaults(defineProps<Props>(), {
  withVisibility: true,
  withReset: false,
})

const inputType = ref('password')

const visibilityIcon = computed(() => {
  return inputType.value === 'password' ? 'i-ri-eye-off-line' : 'i-ri-eye-line'
})

const onClickVisibility = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>

<template>
  <UInput
    class="!ring-0"
    autocomplete="current-password"
    :type="inputType"
    size="lg"
    placeholder="密码"
  >
    <template #trailing>
      <div class="flex gap-2 items-center">
        <UTooltip
          text="显示密码"
          class="!ring-0"
          :ui="{ ring: 'ring-0' }"
          v-if="withVisibility"
        >
          <UButton
            class="pointer-events-auto"
            :icon="visibilityIcon"
            size="2xs"
            variant="soft"
            padded
            @click="onClickVisibility"
          />
        </UTooltip>
        <UTooltip
          text="找回密码"
          class="!ring-0"
          :ui="{ ring: 'ring-0' }"
          v-if="withReset"
        >
          <UButton
            class="pointer-events-auto"
            icon="i-ri-rotate-lock-fill"
            size="2xs"
            variant="soft"
            padded
          />
        </UTooltip>
      </div>
    </template>
  </UInput>
</template>
