<script setup lang="ts">
import type { DropdownItem } from '@nuxt/ui/dist/runtime/types'

type Props = { withName?: boolean; text?: string }

const {} = defineProps<Props>()

const colorMode = useColorMode()
const currentColorModeIcon = computed(() => {
  switch (colorMode.value) {
    case 'light':
      return 'i-solar-sun-2-linear'
    case 'dark':
      return 'i-solar-moon-linear'
  }
})

const currentItems = ref<'main' | 'appearance'>('main')

const mainItems = computed<DropdownItem[][]>(() => {
  return [
    [
      {
        label: 'Persilee',
        avatar: {
          src: 'https://cravatar.cn/avatar/ebf4749fb999f134566782c20e67a3ac?s=96&d=robohash&r=G',
        },
      },
    ],
    [
      {
        label: '外观',
        icon: currentColorModeIcon.value,
        click: (event: PointerEvent) => {
          event.preventDefault()
          currentItems.value = 'appearance'
        },
      },
    ],
  ]
})
const appearanceItems = computed<DropdownItem[][]>(() => {
  return [
    [
      {
        label: '返回',
        icon: 'i-solar-arrow-left-linear',
        click: (event: PointerEvent) => {
          event.preventDefault()
          currentItems.value = 'main'
        },
      },
    ],
    [
      {
        label: '浅色',
        icon: 'i-solar-sun-2-linear',
        click: (event: PointerEvent) => {
          event.preventDefault()
          colorMode.value = 'light'
        },
      },
      {
        label: '深色',
        icon: 'i-solar-moon-linear',
        click: (event: PointerEvent) => {
          event.preventDefault()
          colorMode.value = 'dark'
        },
      },
      {
        label: '跟随系统',
        icon: 'i-solar-devices-linear',
        click: (event: PointerEvent) => {
          event.preventDefault()
          colorMode.value = 'system'
        },
      },
    ],
  ]
})

const items = computed(() => {
  switch (currentItems.value) {
    case 'appearance':
      return appearanceItems.value
    default:
      return mainItems.value
  }
})
</script>

<template>
  <UDropdown :items="items">
    <div class="flex gap-4 items-center">
      <UAvatar
        src="https://cravatar.cn/avatar/ebf4749fb999f134566782c20e67a3ac?s=96&d=robohash&r=G"
        alt="头像"
      />
      <div v-if="withName" :class="['text-gray-600 dark:text-gray-400', text]">
        Persilee
      </div>
    </div>
  </UDropdown>
</template>
