import { VueQueryPlugin } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(VueQueryPlugin)
})
