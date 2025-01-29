<script setup lang="ts">
const isModalOpen = ref(false)
</script>

<template>
  <aside :class="['sticky top-0']">
    <div class="backdrop-blur-lg md:backdrop-blur-none py-4">
      <div class="flex justify-between px-4 md:px-6">
        <AppLogo to="/" />
        <UButton
          icon="i-solar-hamburger-menu-linear"
          color="white"
          @click="isModalOpen = true"
          class="md:hidden"
        />
      </div>
    </div>
    <UModal v-model="isModalOpen" class="md:hidden">
      <LayoutConsoleAsideNavigation />
      <template #footer>
        <UserAccountDropdown withName class="px-4" />
      </template>
    </UModal>
  </aside>
</template>
