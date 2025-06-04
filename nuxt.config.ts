// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ui: {
    fonts: false
  },
  modules: ['@nuxt/icon', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/api/**': {
      cors: true,
    },
  },
  experimental: {
    clientNodeCompat: true,
  },
  app: {
    head: {
      title: 'Semi', // default fallback title
      htmlAttrs: {
        lang: 'zh-CN',
      }
    }
  }
})