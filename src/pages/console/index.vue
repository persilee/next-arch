<template>
  <div class="space-y-10">
    <ConsoleBlockHeader :title="emojiTitle" @click="() => setTitle('console')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'console',
})

const store = useConsoleStore()
const { title, emojiTitle } = storeToRefs(store)
const { setTitle } = store
console.log(store)

useHead({
  title: () => store.title,
})
</script>
