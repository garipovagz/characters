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

const { characters, isPending, total } = useGetData(getData)
</script>

<template>
  <div>
    <Pagination v-model="currentPage" :total-items="total" />
    <form @submit="onSubmit">
      <Input name="species" placeholder="Enter" />
      <button>Search</button>
    </form>

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
