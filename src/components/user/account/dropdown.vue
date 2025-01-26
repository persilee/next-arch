<script setup lang="ts">
import type { DropdownItem } from '@nuxt/ui/dist/runtime/types'

type Props = { withName?: boolean; text?: string }

const {} = defineProps<Props>()

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
        icon: 'i-solar-moon-linear',
        click: (event: PointerEvent) => {
          event.preventDefault()
        },
      },
    ],
  ]
})
</script>

<template>
  <UDropdown :items="mainItems">
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
