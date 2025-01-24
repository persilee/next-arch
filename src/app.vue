<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
const {
  public: { appName },
} = useRuntimeConfig()

useHead({
  titleTemplate(title) {
    return title ? `${title} - ${appName}` : appName
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
</script>
