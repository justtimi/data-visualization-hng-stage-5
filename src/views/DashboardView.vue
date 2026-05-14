<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useEngine } from '@/core/engineInstance'
import { useMetricsStore } from '@/stores/metrics.store'
import BaseChart from '@/components/BaseChart.vue'
import MetricCard from '@/components/MetricCard.vue'
import ActivityFeed from '@/components/ActivityFeed.vue'
const store = useMetricsStore()
const engine = useEngine()

const isRunning = computed(() => engine.isRunning)

function toggleStream() {
  if (engine.isRunning) {
    engine.stop()
  } else {
    engine.start()
  }

  store.isConnected = engine.isRunning
}
function clearAll() {
  store.clear()
}
onMounted(() => {
  if (!engine.isRunning) {
    engine.start()
    store.isConnected = true
  }
})

const latestMetric = computed(() => {
  const arr = store.metrics
  return arr.length ? arr[arr.length - 1] : null
})

const previousMetric = computed(() => {
  const arr = store.metrics
  return arr.length > 1 ? arr[arr.length - 2] : null
})
</script>

<template>
      <header class="mb-6 flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-neutral-100">My Dashboard</h1>
          <p class="text-xs text-neutral-400 mt-1">
            Real-time system telemetry and performance monitors
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-xs">
            <span
              class="w-2 h-2 rounded-full"
              :class="store.isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'"
            ></span>
            {{ store.isConnected ? 'Connected' : 'Disconnected' }}
          </div>

          <button
            @click="toggleStream"
            class="px-3 py-1 text-xs rounded-md border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition"
          >
            {{ isRunning ? 'Pause' : 'Resume' }}
          </button>
          <button
            @click="clearAll"
            class="px-3 py-1 text-xs rounded-md border border-red-800 bg-red-950 hover:bg-red-900 transition"
          >
            Clear
          </button>
        </div>
      </header>
      <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="CPU Usage"
          unit="%"
          :value="latestMetric?.cpu"
          :previous="previousMetric?.cpu"
        />

        <MetricCard
          label="Memory Usage"
          unit="%"
          :value="latestMetric?.memory"
          :previous="previousMetric?.memory"
        />

        <MetricCard
          label="Latency"
          unit="ms"
          :value="latestMetric?.latency"
          :previous="previousMetric?.latency"
        />

        <MetricCard
          label="Error Rate"
          unit="%"
          :value="latestMetric?.errorRate"
          :previous="previousMetric?.errorRate"
        />
      </section>
      <section class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section class="bg-[#111113] border border-[#232526] rounded-lg p-4 shadow-xl">
          <h2 class="text-sm font-semibold tracking-wide uppercase text-neutral-400 mb-4">
            CPU Utilization (%)
          </h2>
          <BaseChart :series="store.cpuSeries" type="line" :min="0" :max="100" />
        </section>
        <section class="bg-[#111113] border border-[#232526] rounded-lg p-4 shadow-xl">
          <h2 class="text-sm font-semibold tracking-wide uppercase text-neutral-400 mb-4">
            Memory Usage (%)
          </h2>
          <BaseChart :series="store.memorySeries" type="line" :area="true" :min="0" :max="100" />
        </section>
        <section class="bg-[#111113] border border-[#232526] rounded-lg p-4 shadow-xl">
          <h2 class="text-sm font-semibold tracking-wide uppercase text-neutral-400 mb-4">
            Latency (ms)
          </h2>
          <BaseChart :series="store.latencySeries" type="line" :area="true" :min="0" :max="200" />
        </section>
        <section class="bg-[#111113] border border-[#232526] rounded-lg p-4 shadow-xl">
          <h2 class="text-sm font-semibold tracking-wide uppercase text-neutral-400 mb-4">
            Error Rate (%)
          </h2>
          <BaseChart :series="store.errorSeries" type="bar" :min="0" :max="10" />
        </section>
      </section>
      <ActivityFeed />
</template>
