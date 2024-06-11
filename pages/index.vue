<script setup lang="ts">
import { useGetData } from '@/api/core'
import { z } from 'zod'

const currentPage = ref(1)
const params = ref({
  species: '',
  status: '',
})

const getData = computed(() => ({
  page: unref(currentPage),
  ...unref(params),
}))

const validationSchema = toTypedSchema(
  z.object({
    species: z.string().optional(),
    status: z.string().optional(),
  })
)
const { handleSubmit } = useForm({
  validationSchema,
  initialValues: { status: 'all' },
})

const onSubmit = handleSubmit(async (values) => {
  params.value.species = values.species ?? ''
  if (values.status == 'all') {
    params.value.status = ''
    return
  }
  params.value.status = values.status ?? ''
})

const selectOptions = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Alive',
    value: 'alive',
  },
  {
    title: 'Dead',
    value: 'dead',
  },
  {
    title: 'Unknown',
    value: 'unknown',
  },
]

const { characters, isPending, total } = useGetData(getData)
</script>

<template>
  <div class="w-full flex flex-col gap-5">
    <Pagination v-model="currentPage" :total-items="total" />
    <form @submit="onSubmit" class="flex gap-6">
      <Input name="species" placeholder="Enter" />
      <Select :options="selectOptions" name="status" placeholder="Choose" />
      <button class="rounded-md bg-gray-900 text-white w-full max-w-[300px]">
        Search
      </button>
    </form>

    <div
      v-if="isPending"
      class="h-[200px] w-full flex items-center justify-center"
    >
      <div
        class="border-[5px] w-10 h-10 border-blue-400 rounded-full border-t-transparent animate-spin"
      />
    </div>
    <div
      v-else-if="!characters?.length"
      class="h-[200px] w-full flex items-center justify-center"
    >
      <span class="text-lg font-semibold text-gray-900 uppercase"
        >no data :(</span
      >
    </div>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full bg-gray-900 pt-14"
    >
      <Character v-for="item in characters" :key="item.id" v-bind="item" />
    </div>
  </div>
</template>

<style scoped></style>
