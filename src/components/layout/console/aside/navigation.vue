<script setup lang="ts">
import { UVerticalNavigation } from '#components'
import type { VerticalNavigationLink } from '@nuxt/ui/dist/runtime/types'

const links: Array<VerticalNavigationLink> = [
  {
    label: '控制台',
    icon: 'i-solar-command-linear',
    to: '/console',
  },
  {
    label: '初创',
    icon: 'i-solar-rocket-2-outline',
    to: '/console/startups',
  },
  {
    label: '订阅',
    icon: 'i-solar-water-sun-linear',
    to: '/console/subscriptions',
  },
  {
    label: '用户',
    icon: 'i-solar-user-linear',
    to: '/console/users',
  },
  {
    label: '设置',
    icon: 'i-solar-tuning-linear',
    to: '/console/settings',
  },
]

const ui = /*ui*/ {
  wrapper: 'relative',
  icon: {
    base: 'flex-shrink-0 w-6 h-6',
  },
  padding: 'px-3 py-2',
  font: 'font-normal',
  base: 'group relative flex items-center gap-4 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-1 focus-visible:before:ring-primary-500 dark:focus-visible:before:ring-primary-400 before:absolute before:inset-px before:rounded-md disabled:cursor-not-allowed disabled:opacity-75 md:justify-center lg:justify-start',
  label: 'truncate relative md:hidden lg:block',
  active:
    'text-gray-900 dark:text-white before:bg-gray-100 dark:before:bg-gray-800 md:before:bg-transparent md:dark:before:bg-transparent lg:before:bg-gray-100 lg:dark:before:bg-gray-800',
}
</script>

<template>
  <UVerticalNavigation :links="links" :ui="ui" />
</template>
