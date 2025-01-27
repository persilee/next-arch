<template>
  <div>
    <div class="bg-gradient-to-tr from-purple-700 to-teal-200">
      <div class="flex flex-col items-center justify-center relative min-h-[64vh] py-16">
        <div class="space-y-12">
          <AppLogo color="text-white dark:text-black" to="/" />
          <div class="min-w-[360px] max-w-xs md:max-w-md space-y-12">
            <slot></slot>
          </div>
        </div>
      </div>
      <LayoutReceptionWave />
    </div>
    <LayoutReceptionFooter />
  </div>
</template>
