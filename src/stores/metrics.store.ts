import type { CPUSeriesPoint } from '@/core/transformer'
import { Transformer } from '@/core/transformer'
import type { LogEvent, MetricPoint } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMetricsStore = defineStore('engine', () => {
  const metrics = ref<MetricPoint[]>([])
  const logs = ref<LogEvent[]>([])
  const cpuSeries = ref<CPUSeriesPoint[]>([])
  const isPaused = ref(false)
  const isConnected = ref(false)
  const tick = ref(0)

  const cpuTransformer = new Transformer(200)

  const addMetric = (point: MetricPoint) => {
    metrics.value.push(point)
    cpuSeries.value = cpuTransformer.add(point)
    tick.value++
  }
  const addLog = (event: LogEvent) => {
    logs.value.push(event)
  }
  const clear = () => {
    metrics.value = []
    logs.value = []
    cpuSeries.value = []
    cpuTransformer.clear()
  }
  const setPaused = (value?: boolean) => {
    isPaused.value = value !== undefined ? value : !isPaused.value
  }

  return {
    metrics,
    logs,
    cpuSeries,
    tick,
    isPaused,
    isConnected,
    addMetric,
    addLog,
    clear,
    setPaused,
  }
})
