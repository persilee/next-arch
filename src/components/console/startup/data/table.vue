<script setup lang="ts">
import { UAvatar } from '#components'

const { table } = useAppConfig()

const { data, pending } = await useLazyFetch<any>('/api/console/startups')

const store = useStartupStore()

const rows = computed(() => {
  if (!data.value) return []
  return filtered.value.slice(
    (page.value - 1) * pageCount.value,
    page.value * pageCount.value,
  )
})

const columns = [
  { key: 'avatar' },
  {
    key: 'name',
    label: '名称',
  },
  {
    key: 'oneline',
    label: '简介',
  },
  {
    key: 'industry',
    label: '行业',
    sortable: true,
  },
  {
    key: 'teamSize',
    label: '团队规模',
    sortable: true,
  },
]

const keyword = ref('')

const filtered = computed((item: any) => {
  if (!data.value) return []

  return data.value.filter((item: any) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(keyword.value.toLocaleLowerCase())
    })
  })
})

const page = ref(1)
const pageCount = ref(25)
const total = computed(() => filtered.value.length)
</script>

<template>
  <div>
    <div class="mb-4 flex justify-between">
      <ConsoleFormSearch v-model="keyword" />
      <ConsoleNavigationPagination v-model="page" :pageCount="pageCount" :total="total" />
    </div>
    <UTable
      :emptyState="table.emptyState"
      :loading="pending"
      :loadingState="table.loadingState"
      :rows="store.list"
      :columns="columns"
    >
      <template #avatar-data="{ row }">
        <UAvatar :src="row.avatar" :alt="row.name" />
      </template>
      <template #name-data="{ row }">
        <div class="flex gap-2 items-center">
          <div>{{ row.name }}</div>
          <UTooltip text="头部估值" v-if="row.isTopValuation">
            <UIcon
              name="i-solar-medal-ribbons-star-linear"
              class="text-xs text-amber-400 dark:text-amber-300"
            />
          </UTooltip>
          <UTooltip text="头部营收" v-if="row.isTopRevenue">
            <UIcon
              name="i-solar-money-bag-linear"
              class="text-xs text-violet-400 dark:text-violet-300"
            />
          </UTooltip>
        </div>
      </template>
    </UTable>
  </div>
</template>
