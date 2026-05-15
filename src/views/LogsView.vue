<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useMetricsStore } from '@/stores/metrics.store'
import { useEngine } from '@/core/engineInstance'
import type { SeverityFilter } from '@/components/ActivityTable.vue'

const store = useMetricsStore()
const engine = useEngine()

const filter = ref<SeverityFilter>('all')

const logs = computed(() => {
  let data = store.logs

  if (filter.value !== 'all') {
    data = data.filter((log) => log.severity === filter.value)
  }

  return [...data].slice(-200)
})

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString()
}

function togglePause() {
  if (engine.isRunning) {
    engine.stop()
    store.isConnected = false
  } else {
    engine.start()
    store.isConnected = true
  }
}

onMounted(() => {
  engine.stop()
  engine.start()
  store.isConnected = true
})
</script>

<template>
  <div class="flex flex-col h-full">
    <header class="mb-4 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Logs Inspector</h1>
        <p class="text-xs text-neutral-400">Raw system event stream</p>
      </div>

      <div class="flex items-center gap-2 text-xs">
        <button
          @click="togglePause"
          class="px-3 py-1 rounded border border-neutral-700 hover:bg-neutral-800"
        >
          {{ store.isConnected ? 'Pause' : 'Resume' }}
        </button>
      </div>
    </header>

    <div class="flex gap-2 mb-3 text-xs">
      <button
        v-for="f in ['all', 'info', 'warning', 'critical']"
        :key="f"
        @click="filter = f as any"
        class="px-2 py-1 rounded border transition"
        :class="
          filter === f
            ? 'bg-neutral-700 border-neutral-600 text-white'
            : 'border-neutral-800 text-neutral-400 hover:bg-neutral-800'
        "
      >
        {{ f }}
      </button>
    </div>

    <div
      class="flex-1 overflow-y-auto scrollbar-hide bg-[#0b0b0f] border border-[#232526] rounded-lg p-3 font-mono text-xs"
    >
      <p v-if="logs.length === 0" class="text-neutral-500">No logs yet...</p>

      <div
        v-for="log in logs"
        :key="log.timestamp + log.message"
        class="py-1 border-b border-[#1c1c1f]"
      >
        <div class="flex justify-between">
          <span
            :class="{
              'text-green-400': log.severity === 'info',
              'text-yellow-400': log.severity === 'warning',
              'text-red-400': log.severity === 'critical',
            }"
          >
            [{{ formatTime(log.timestamp) }}] {{ log.message }}
          </span>

          <span class="text-neutral-600 ml-4">
            {{ log.trigger }}
          </span>
        </div>

        <pre class="text-neutral-500 text-[10px] mt-1"
          >{{ log }}
        </pre>
      </div>
    </div>
  </div>
</template>
