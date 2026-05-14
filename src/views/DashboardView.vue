<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { Engine } from '@/core/streamEngine'
import { useMetricsStore } from '@/stores/metrics.store'
import BaseChart from '@/components/BaseChart.vue'
import MetricCard from '@/components/MetricCard.vue'
const store = useMetricsStore()
let engine: Engine | null = null
onMounted(() => {
  engine = new Engine((data) => {
    store.addMetric(data)
  })
  store.isConnected = true
  engine.start()
})
onUnmounted(() => {
  if (!engine) return
  engine.stop()
  store.isConnected = false
  engine = null
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
  <div class="bg-[#06050A] min-h-screen text-white flex">
    <AppSidebar />
    <main class="flex-1 pl-48 pr-6 py-6 overflow-x-hidden">
      <header class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight text-neutral-100">My Dashboard</h1>
        <p class="text-xs text-neutral-400 mt-1">
          Real-time system telemetry and performance monitors
        </p>
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
      <section class="bg-[#111113] border border-[#232526] rounded-lg p-4 shadow-xl">
        <h2 class="text-sm font-semibold tracking-wide uppercase text-neutral-400 mb-4">
          CPU Utilization (%)
        </h2>
        <BaseChart :series="store.cpuSeries" :min="0" :max="100" />
      </section>
    </main>
  </div>
</template>
