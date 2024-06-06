<script setup lang="ts">
export interface IInput {
  name: string
  placeholder: string
}

const props = defineProps<IInput>()

const { value: text } = useField(toRef(props, 'name'), undefined)
</script>

<template>
  <input :name="props.name" :placeholder="props.placeholder" v-model="text" />
</template>

<style scoped></style>
