// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vee-validate/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
})
