<script setup lang="ts">
import { UAvatar } from '#components'

const { table } = useAppConfig()

const { data, pending } = await useLazyFetch<any>(
  'https://resources.ninghao.net/nid-camp/startups.json',
)

const rows = computed(() => {
  return data.value
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
</script>

<template>
  <div>
    <UTable
      :emptyState="table.emptyState"
      :loading="pending"
      :loadingState="table.loadingState"
      :rows="rows"
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
