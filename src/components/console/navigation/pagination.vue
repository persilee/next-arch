<script setup lang="ts">
import { UPagination } from '#components'

/**
 * 属性
 */
type Props = { pageCount: number; total: number; modelValue: number }

defineProps<Props>()

const emit = defineEmits()

const onUpdate = (value: number) => {
  emit('update:modelValue', value)
}

const { pagination } = useAppConfig()
</script>

<template>
  <UPagination
    :modelValue="modelValue"
    @update:modelValue="onUpdate"
    :pageCount="pageCount"
    :total="total"
    :activeButton="pagination.activeButton"
    :inactiveButton="pagination.inactiveButton"
    :prevButton="pagination.prevButton"
    :nextButton="pagination.nextButton"
  />
</template>
