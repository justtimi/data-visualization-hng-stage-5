<script lang="ts">
</script><script setup lang="ts">
import { computed } from 'vue'
import { useMetricsStore } from '@/stores/metrics.store'

const store = useMetricsStore()

const logs = computed(() => {
  return [...store.logs].slice(-50).reverse()
})

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString()
}

function color(severity: string) {
  if (severity === 'critical') return 'text-red-400'
  if (severity === 'warning') return 'text-yellow-400'
  return 'text-green-400'
}
</script>

<template>
  <div class="bg-[#111113] border border-[#232526] rounded-lg p-4 h-75 overflow-y-auto">
    <h2 class="text-xs uppercase text-neutral-400 mb-3">Activity Feed</h2>

    <div v-if="logs.length === 0" class="text-xs text-neutral-500">
      No events yet...
    </div>

    <div v-for="log in logs" :key="log.timestamp" class="mb-2 text-xs">
      <div class="flex justify-between">
        <span :class="color(log.severity)">
          {{ log.message }}
        </span>
        <span class="text-neutral-500">
          {{ formatTime(log.timestamp) }}
        </span>
      </div>
    </div>
  </div>
</template>
