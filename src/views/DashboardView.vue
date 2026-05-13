<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Sidebar from '@/components/AppSidebar.vue'
import { Engine } from '@/core/streamEngine'
import { useMetricsStore } from '@/stores/metrics.store'
import CPUChart from '@/components/CPUChart.vue'
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
</script>

<template>
  <Sidebar />
  <main>
    <CPUChart/>
  </main>
</template>
