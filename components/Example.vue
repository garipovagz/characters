<script setup lang="ts">
import { beautifyISODate } from '~/utils/dates.js'
import { computed } from 'vue'
import SolvitButton from '~/components/ui/buttons/SolvitButton.vue'
import { useDictStore } from '~/stores/dictionary'

const interviews: any = defineModel('interviews')

const dictStore = useDictStore()
const colorBarClass =
  'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center'

const getIconLocation = (objectId: number, isFramework: boolean = false) => {
  const iconsMap: any = {
    python: '/topics/python.svg',
    javascript: '/topics/js.svg',
    git: '/topics/git.svg',
    docker: '/topics/docker.svg',
    sql: '/topics/sql.svg',
    fastapi: '/fastapi.svg',
    django: '/django.svg',
    'vue.js': '/vuejs.svg',
  }
  let name
  if (dictStore.dict) {
    if (isFramework) {
      name = dictStore.dict.frameworks[objectId]
    } else {
      name = dictStore.dict.languages[objectId]
    }
    for (const key of Object.keys(iconsMap)) {
      try {
        if (name.toLowerCase().includes(key)) {
          return iconsMap[name.toLowerCase()]
        }
      } catch {
        return null
      }
    }
  }
}

const metrics = computed(() => {
  const metrics: any = {}
  if (interviews.value) {
    interviews?.value.forEach((item: any) => {
      const totalQuestions = item.questions_ids.length
      const answeredQuestions = item.answered_ids.length
      const unclearQuestions = item.unclear_ids.length
      const failedQuestions = item.failed_ids.length
      const passedQuestions =
        answeredQuestions + unclearQuestions + failedQuestions
      const passedQuestionsPct = Math.ceil(
        ((answeredQuestions + unclearQuestions + failedQuestions) /
          totalQuestions) *
          100
      )

      const answeredPct = Math.ceil((answeredQuestions / totalQuestions) * 100)
      const unclearPct = Math.ceil((unclearQuestions / totalQuestions) * 100)
      const failedPct = Math.ceil((failedQuestions / totalQuestions) * 100)

      metrics[item.id] = {
        totalQuestions,
        answeredQuestions,
        unclearQuestions,
        failedQuestions,
        passedQuestions,
        passedQuestionsPct,
        answeredPct,
        unclearPct,
        failedPct,
      }
    })
    return metrics
  }
})

const allQuestionsPassedInInterview = (interviewId: number) => {
  return (
    metrics.value[interviewId].passedQuestions ===
    metrics.value[interviewId].totalQuestions
  )
}

const getInterviewBgColor = (interviewId: number) => {
  if (!metrics) {
    return 'white'
  }
  const metricss = metrics.value
  if (interviewId in metricss) {
    const { answeredPct, unclearPct, failedPct } = metricss[interviewId]
    return answeredPct > unclearPct && answeredPct > failedPct
      ? 'bg-[#00AF9B]/10'
      : unclearPct > answeredPct && unclearPct > failedPct
        ? 'bg-[#FFB800]/10'
        : failedPct > unclearPct && failedPct > answeredPct
          ? 'bg-[#EF4743]/10'
          : 'white'
  }
}

const getInterviewEmoji = (interviewId: number) => {
  if (!metrics) {
    return ''
  }
  const metricss = metrics.value
  if (interviewId in metricss) {
    const { answeredPct, unclearPct, failedPct } = metricss[interviewId]
    return answeredPct > unclearPct && answeredPct > failedPct
      ? '✅'
      : unclearPct > answeredPct && unclearPct > failedPct
        ? '😐'
        : failedPct > unclearPct && failedPct > answeredPct
          ? '❌'
          : ''
  }
}
</script>

<template>
  <div
    v-if="dictStore.dict"
    class="grid grid-cols-2 max-[620px]:grid-cols-1 gap-8"
  >
    <div v-for="interview in interviews" :key="`interview-${interview.id}}`">
      <div
        class="flex flex-col gap-1 rounded-xl px-5 pt-3 pb-4 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
        :class="getInterviewBgColor(interview.id)"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <h3 class="font-semibold">
              Собеседование #{{ interview.user_interview_id }}
            </h3>
            <h3 class="text-gray-500 text-xs">
              {{ beautifyISODate(interview.created_at) }}
            </h3>
          </div>
          <div>
            <p>{{ getInterviewEmoji(interview.id) }}</p>
          </div>
        </div>
        <div>
          <p class="text-gray-600 text-xs -mt-1">
            {{ dictStore.dict.positions[interview.position_id] }}
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <img
            v-if="getIconLocation(interview.language_id)"
            :src="getIconLocation(interview.language_id)"
            width="20"
            alt=""
          />
          <span v-else class="text-gray-500">| </span>
          <span>{{ dictStore.dict.languages[interview.language_id] }}</span>
          <div v-if="interview.frameworks_ids.length > 0" class="flex gap-2">
            <div
              v-for="frameworkId in interview.frameworks_ids"
              :key="`interview-${interview.id}-framework-${frameworkId}`"
              class="flex gap-1"
            >
              <img
                v-if="getIconLocation(frameworkId, true)"
                :src="getIconLocation(frameworkId, true)"
                width="20"
                alt=""
              />
              <span>{{ dictStore.dict.frameworks[frameworkId] }}</span>
            </div>
          </div>
        </div>
        <p class="text-sm">
          Отвечено {{ metrics[interview.id].passedQuestions }}/{{
            metrics[interview.id].totalQuestions
          }}
          вопросов
        </p>
        <div class="relative pt-1">
          <div class="overflow-hidden h-3 mb-2 flex rounded-full bg-slate-200">
            <div
              v-if="metrics[interview.id].answeredPct"
              :style="{
                width: metrics[interview.id].answeredPct + '%',
                'background-color': '#00AF9B',
              }"
              :class="[colorBarClass]"
            ></div>
            <div
              v-if="metrics[interview.id] && metrics[interview.id].unclearPct"
              :style="{ width: metrics[interview.id].unclearPct + '%' }"
              :class="[colorBarClass]"
              class="bg-[#FFB800]"
            ></div>
            <div
              v-if="metrics[interview.id] && metrics[interview.id].failedPct"
              :style="{ width: metrics[interview.id].failedPct + '%' }"
              :class="[colorBarClass]"
              class="bg-[#EF4743]"
            ></div>
          </div>
        </div>
        <NuxtLink
          v-if="allQuestionsPassedInInterview(interview.id)"
          :to="`/interviews/${interview.id}/analytics`"
          class="hover:text-white w-full"
        >
          <SolvitButton
            buttonText="Перейти к аналитике"
            buttonType="primary"
            buttonSize="small"
            buttonClasses="w-full"
          />
        </NuxtLink>
        <NuxtLink
          v-else
          :to="`/interviews/${interview.id}/questions/${interview.last_visited_id}`"
          class="hover:text-white w-full"
        >
          <SolvitButton
            buttonText="Продолжить собеседование"
            buttonType="primary"
            buttonSize="small"
            buttonClasses="w-full"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
