<script setup lang="ts">
export interface IPagination {
  totalItems: number
  modelValue: number
}

const props = defineProps<IPagination>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <vue-awesome-paginate
    :total-items="props.totalItems"
    :items-per-page="20"
    :max-pages-shown="5"
    v-model="value"
    paginate-buttons-class="btn"
    active-page-class="btn-active"
  >
    <template #prev-button>
      <div
        class="flex items-center justify-center w-12 cursor-pointer bg-gray-900 h-12 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          class="rotate-180"
        >
          <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
        </svg>
      </div>
    </template>
    <template #next-button>
      <div
        class="flex items-center justify-center w-12 cursor-pointer bg-gray-900 h-12 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
        </svg>
      </div>
    </template>
  </vue-awesome-paginate>
</template>

<style lang="scss">
.pagination-container {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
li {
  cursor: pointer;
}
.btn {
  color: black;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 6px;
  padding: 8px;
}
.btn-active {
  background: rgb(156 163 175);
}
</style>
