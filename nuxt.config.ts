// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  pinia: {
    storesDirs: ['./src/stores/**'],
  },
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      appName: '黑喵',
    },
    surreal: {
      rootUser: 'root',
      rootPass: '258369',
      url: 'http://localhost:3303/rpc',
      namespace: 'heimiao',
      database: 'app',
    },
  },
  ui: {},
  icon: {
    serverBundle: {
      collections: ['solar', 'ri'],
    },
  },
})
