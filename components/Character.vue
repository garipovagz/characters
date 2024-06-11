<script setup lang="ts">
import { useGetFirstSeenIn } from '~/api/core'
export interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  imageUrl: string
  location: string
  firstEpisode: string
}

const props = defineProps<ICharacter>()
const { data, episodeName } = useGetFirstSeenIn(props.firstEpisode)
const color = () => {
  if (props.status === 'Alive') return '#008000'
  else if (props.status === 'Dead') return '#EF0A0A'
  else return '#A9A9A9'
}
</script>

<template>
  <div
    class="flex flex-col rounded-md bg-zinc-700 w-full xl:flex-row xl:gap-5 overflow-hidden transition-all duration-300"
  >
    <img
      :src="props.imageUrl"
      :alt="props.name"
      class="w-full h-[400px] object-cover xl:h-full xl:max-w-[200px]"
    />
    <div class="flex flex-col gap-4 lg:gap-5 p-4 w-full">
      <p class="text-3xl font-bold text-white">{{ props.name }}</p>
      <div class="text-white">
        <svg class="h-5 w-5 inline">
          <circle cx="6" cy="6" r="6" :fill="color()" />
        </svg>
        <p class="inline text-xl">{{ props.status }} - {{ props.species }}</p>
      </div>
      <div
        class="text-2xl flex items-center justify-between lg:flex-col lg:gap-2 lg:items-start"
      >
        <p class="text-xl text-gray-400">Last known location:</p>
        <p class="hover:text-orange-400 text-white">
          {{ props.location }}
        </p>
      </div>
      <div
        class="text-2xl flex items-center justify-between lg:flex-col lg:gap-2 lg:items-start"
      >
        <p class="text-xl text-gray-400">First seen in:</p>
        <p class="hover:text-orange-400 text-white">
          {{ episodeName }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
