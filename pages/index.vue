<script setup lang="ts">
import { useGetData } from '@/api/core'

const currentPage = ref(1)

const params = reactive({
  page: currentPage,
})

const { characters, isPending, total } = useGetData(params)
</script>

<template>
  <div>
    <Pagination v-model="currentPage" :total-items="total" />
    <div class="grid grid-cols-3">
      <Character
        v-for="character in characters"
        :key="character.id"
        v-bind="character"
      />
    </div>
  </div>
</template>

<style scoped></style>
