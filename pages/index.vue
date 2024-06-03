<script setup lang="ts">
import { useGetData } from '@/api/core'

const filters = reactive({
  status: '',
  species: '',
})

//add params
const { data, isPending, isError, error, characters, info } = useGetData({})
</script>

<template>
  <div class="grid grid-cols-3">
    <Character
      v-for="character in characters"
      :key="character.id"
      v-bind="character"
    />
  </div>
</template>

<style scoped></style>
