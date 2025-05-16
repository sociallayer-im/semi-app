// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ui: {
    fonts: false
  },
  modules: ['@nuxt/icon', '@nuxt/ui'],
  css: ['~/assets/css/main.css']
})