<script setup lang="ts">
const { table } = useAppConfig()

const { data, pending } = await useLazyFetch<any>(
  'https://resources.ninghao.net/nid-camp/startups.json',
)

const rows = computed(() => {
  return data.value
})
</script>

<template>
  <div>
    <UTable
      :emptyState="table.emptyState"
      :loading="pending"
      :loadingState="table.loadingState"
      :rows="rows"
    ></UTable>
  </div>
</template>
