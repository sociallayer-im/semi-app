// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ui: {
    fonts: false
  },
  modules: ['@nuxt/icon', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Semi', // default fallback title
      htmlAttrs: {
        lang: 'zh-CN',
      }
    }
  }
})