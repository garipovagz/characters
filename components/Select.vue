<script setup lang="ts">
interface IOptions {
  value: string
  title: string
}

export interface SelectProps {
  options: IOptions[]
  name: string
  placeholder: string
}

const props = defineProps<SelectProps>()

const { value } = useField(toRef(props.name), undefined, {
  validateOnValueUpdate: false,
  syncVModel: true,
})

const selectedTitle = computed(() => {
  const option = props.options.find((v) => v.value === unref(value))
  opened.value = false

  return option ? option.title : props.placeholder
})

const selector = ref<HTMLElement | null>(null)
const opened = ref(false)

onClickOutside(selector, () => (opened.value = false))
</script>

<template>
  <div
    ref="selector"
    class="text-normal relative h-12 w-full cursor-pointer transition-all"
  >
    <div
      class="text-normal absolute box-border flex w-full flex-col flex-nowrap rounded-lg border border-gray-400"
      :class="{
        'z-10 bg-gray-400 !text-white': opened,
      }"
    >
      <span
        class="flex h-12 w-auto flex-nowrap items-center justify-between gap-4 px-4 transition-all"
        @click="opened = !opened"
      >
        <p :class="{ 'text-black': selectedTitle === props.placeholder }">
          {{ selectedTitle }}
        </p>
      </span>

      <div class="wrapper grid" :class="{ 'is-open': opened }">
        <div class="w-full overflow-y-hidden px-2">
          <div v-for="item in options" :key="item.value" class="last:mb-2">
            <input
              type="radio"
              v-model="value"
              @click="opened = false"
              class="hidden"
              :value="item.value"
              :id="item.value"
              :name="props.name"
            />
            <label class="cursor-pointer" :for="item.value">
              <p
                class="flex items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-kicks-primary/10"
                :class="{
                  'text-kicks-white/70': item.title !== selectedTitle,
                }"
              >
                {{ item.title }}
              </p>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 500ms;
}

.wrapper.is-open {
  grid-template-rows: 1fr;
}
</style>
