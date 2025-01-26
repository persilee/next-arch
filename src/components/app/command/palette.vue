<script setup lang="ts">
import type { Command } from '@nuxt/ui/dist/runtime/types'

const emptyState = {
  icon: 'i-heroicons-magnifying-glass-20-solid',
  label: '暂无可用命令',
  queryLabel: '请尝试使用其他关键字搜索',
}

const isModalOpen = ref(false)
const colorMode = useColorMode()

defineShortcuts({
  meta_k: {
    handler: () => {
      isModalOpen.value = true
    },
  },
  meta_shift_l: {
    usingInput: true,
    handler: () => {
      colorMode.value = 'light'
    },
  },
  meta_shift_d: {
    usingInput: true,
    handler: () => {
      colorMode.value = 'dark'
    },
  },
  meta_shift_s: {
    usingInput: true,
    handler: () => {
      colorMode.value = 'system'
    },
  },
})

const commands: Command[] = [
  {
    id: 'color-mode-light',
    label: '浅色外观',
    icon: 'i-solar-sun-2-linear',
    shortcuts: ['⌘', '⇧', 'L'],
    click: () => {
      colorMode.value = 'light'
    },
  },
  {
    id: 'color-mode-dark',
    label: '暗色外观',
    icon: 'i-solar-moon-linear',
    shortcuts: ['⌘', '⇧', 'D'],
    click: () => {
      colorMode.value = 'dark'
    },
  },
  {
    id: 'color-mode-system',
    label: '跟随系统',
    icon: 'i-solar-devices-linear',
    shortcuts: ['⌘', '⇧', 'S'],
    click: () => {
      colorMode.value = 'system'
    },
  },
]

const groups = [
  {
    key: 'commands',
    commands,
  },
]

const router = useRouter()
const onSelect = (option: Command) => {
  if (option.click) {
    option.click()
  }

  if (option.to) {
    router.push(option.to)
  }

  if (option.href) {
    window.open(option.href, '_blank')
  }
}
</script>

<template>
  <UModal v-model="isModalOpen">
    <UCommandPalette
      placeholder="搜索"
      :emptyState
      :groups
      @update:model-value="onSelect"
    />
  </UModal>
</template>
