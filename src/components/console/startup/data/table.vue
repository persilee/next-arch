<script setup lang="ts">
const { table } = useAppConfig()

const { data, pending } = await useLazyFetch<any>(
  'https://resources.ninghao.net/nid-camp/startups.json',
)

const rows = computed(() => {
  return data.value
})

const columns = [
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
    ></UTable>
  </div>
</template>
