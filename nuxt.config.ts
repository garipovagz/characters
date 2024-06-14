// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/characters/',
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vee-validate/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
})
