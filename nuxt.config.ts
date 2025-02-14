import type { Algorithm } from 'jsonwebtoken'

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
      ws: {
        port: 4000,
        protocol: 'ws',
        host: 'localhost',
      },
    },
    api: {
      pageSize: 25,
    },
    surreal: {
      rootUser: 'root',
      rootPass: '258369',
      url: 'http://localhost:3303/rpc',
      namespace: 'heimiao',
      database: 'app',
      scope: 'common',
      tokenName: 'heimiao',
    },
    jwt: {
      publicKey: '',
      privateKey: '',
      expiresIn: '7d',
      algorithm: 'RS256' as Algorithm,
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      username: 'default',
      password: '',
    },
    aliyun: {
      accessKeyID: '',
      accessKeySecret: '',
    },
  },
  ui: {},
  icon: {
    serverBundle: {
      collections: ['solar', 'ri'],
    },
  },
  routeRules: {
    '/playground/startups': { ssr: false },
  },
})
