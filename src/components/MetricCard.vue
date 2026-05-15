<script setup lang="ts">
import { computed } from 'vue'
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-vue-next';

const props = defineProps<{
  label: string
  value?: number | null
  previous?: number | null
  unit?: string
}>()

const safeValue = computed(() => props.value ?? 0)

const delta = computed(() => {
  if (props.value == null || props.previous == null) return 0
  return props.value - props.previous
})

const direction = computed(() => {
  if (delta.value > 0) return 'up'
  if (delta.value < 0) return 'down'
  return 'flat'
})

const formattedDelta = computed(() => {
  const abs = Math.abs(delta.value).toFixed(1)
  return `${direction.value === 'down' ? '-' : '+'}${abs}`
})

const trendColor = computed(() => {
  if (direction.value === 'up') return 'text-green-400'
  if (direction.value === 'down') return 'text-red-400'
  return 'text-neutral-400'
})
</script>
<template>
  <div
    class="dark:bg-[#111113] bg-white dark:border-[#232526] border-slate-200 rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
  >
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-xs uppercase tracking-wide dark:text-neutral-400 text-slate-500">
        {{ label }}
      </h3>
      <div class="flex items-center gap-1 text-xs" :class="trendColor">
        <span v-if="direction === 'up'"><ArrowUp/></span>
        <span v-else-if="direction === 'down'"><ArrowDown/></span>
        <span v-else><ArrowRight/></span>
        <span>{{ formattedDelta }}</span>
      </div>
    </div>

    <div class="flex items-end gap-1">
      <span class="text-2xl font-bold dark:text-white text-slate-900 tabular-nums">
        {{ safeValue.toFixed(1) }}
      </span>
      <span class="text-sm dark:text-neutral-400 text-slate-500">
        {{ unit }}
      </span>
    </div>

    <div class="mt-2 flex items-center gap-2 text-[10px] dark:text-green-400 text-green-600">
      <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
      LIVE
    </div>
  </div>
</template>

<style scoped></style>
