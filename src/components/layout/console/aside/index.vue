<script setup lang="ts">
const isModalOpen = ref(false)
</script>

<template>
  <aside
    :class="[
      'sticky top-0 z-10',
      'flex flex-col justify-between gap-8',
      'md:pt-2 md:pb-6 md:h-screen lg:min-w-[260px]',
      'md:ring-1 ring-gray-100 dark:ring-gray-900',
    ]"
  >
    <div class="backdrop-blur-lg md:backdrop-blur-none py-4">
      <div class="flex justify-between px-4 md:px-6">
        <AppLogo to="/" text="md:hidden lg:block" />
        <UButton
          icon="i-solar-hamburger-menu-linear"
          color="white"
          @click="isModalOpen = true"
          class="md:hidden"
        />
      </div>
      <LayoutConsoleAsideNavigation class="hidden md:block mt-12 px-3 md:px-4" />
    </div>
    <div>
      <UserAccountDropdown
        withName
        class="hidden md:block px-4 md:px-6"
        text="md:hidden lg:block"
      />
    </div>
    <UModal v-model="isModalOpen" class="md:hidden">
      <UCard>
        <LayoutConsoleAsideNavigation />
        <template #footer>
          <UserAccountDropdown withName class="px-4" />
        </template>
      </UCard>
    </UModal>
  </aside>
</template>
