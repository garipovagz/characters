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
</script>

<template>
  <div class="section">
    <img :src="props.imageUrl" :alt="props.name" />
    <div class="info">
      <div>
        <p>{{ props.name }}</p>
        <p>{{ props.status }} - {{ props.species }}</p>
      </div>
      <div>
        <p>Last known location:</p>
        <p>{{ props.location }}</p>
      </div>
      <div>
        <p>First seen in:</p>
        <p>{{ episodeName }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
