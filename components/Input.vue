<script setup lang="ts">
export interface IInput {
  name: string
  placeholder: string
}

const props = defineProps<IInput>()

const { value: text } = useField(toRef(props, 'name'), undefined)
</script>

<template>
  <input
    :name="props.name"
    :placeholder="props.placeholder"
    v-model="text"
    class="h-12 w-full rounded-lg px-4 outline-none transition-all duration-300 disabled:cursor-not-allowed border border-gray-400"
  />
</template>

<style scoped></style>
