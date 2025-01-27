<script setup lang="ts">
type Props = {
  scene: 'signin' | 'signup'
}

const props = defineProps<Props>()

const label = computed(() => {
  switch (props.scene) {
    case 'signin':
      return '通过微信登录'
    case 'signup':
      return '通过微信注册'
  }
})
</script>

<template>
  <UButton block size="xl" color="white" class="!ring-0">
    <template #leading>
      <UIcon name="i-ri-wechat-fill" class="bg-green-500 dark:bg-green-400 text-xl" />
    </template>
    <slot>{{ label }}</slot>
  </UButton>
</template>
