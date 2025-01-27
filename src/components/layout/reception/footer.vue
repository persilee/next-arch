<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <div class="flex flex-col items-center justify-center h-[20vh]">
    <p>&copy; {{ config.public.appName }}</p>
  </div>
</template>
