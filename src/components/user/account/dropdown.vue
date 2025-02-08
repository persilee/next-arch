<script setup lang="ts">
import type { DropdownItem } from '@nuxt/ui/dist/runtime/types'

type Props = { withName?: boolean; text?: string }

const {} = defineProps<Props>()

const { currentUser } = useCurrentUser()

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
        label: currentUser.value?.name ?? '匿名',
        avatar: {
          src: '/images/avatar-2.svg',
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
    [
      {
        label: currentUser.value ? '退出' : '登录',
        icon: currentUser.value ? 'i-solar-logout-2-outline' : 'i-solar-login-2-outline',
        click: (event: PointerEvent) => {
          event.preventDefault()
          if (currentUser.value) {
            useCurrentUser(null)
          }
          navigateTo('/reception/signin')
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
      <UAvatar src="/images/avatar-2.svg" alt="头像" />
      <div v-if="withName" :class="['text-gray-600 dark:text-gray-400', text]">
        {{ currentUser?.name ?? '匿名' }}
      </div>
    </div>
  </UDropdown>
</template>
