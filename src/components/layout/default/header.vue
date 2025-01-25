<template>
  <AppLogo to="/" />
  <header class="flex justify-between py-3 px-4">
    <div class="flex gap-4">
      <button @click="colorMode.preference = 'light'">亮色</button>
      <button @click="colorMode.preference = 'dark'">暗色</button>
      <button @click="colorMode.preference = 'system'">跟随系统</button>
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
console.log(colorMode)
</script>
