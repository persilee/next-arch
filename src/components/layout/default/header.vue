<template>
  <header class="flex justify-between py-3 px-4">
    <AppLogo to="/" />
    <UserAccountDropdown />
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
</script>
