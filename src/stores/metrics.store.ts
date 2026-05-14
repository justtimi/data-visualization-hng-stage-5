import type { SeriesPoint } from '@/core/transformer'
import { Transformer } from '@/core/transformer'
import type { LogEvent, MetricPoint } from '@/types/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMetricsStore = defineStore('engine', () => {
  const metrics = ref<MetricPoint[]>([])
  const logs = ref<LogEvent[]>([])
  const cpuSeries = ref<SeriesPoint[]>([])
  const memorySeries = ref<SeriesPoint[]>([])
  const latencySeries = ref<SeriesPoint[]>([])
  const errorSeries = ref<SeriesPoint[]>([])
  const isPaused = ref(false)
  const isConnected = ref(false)
  const tick = ref(0)

  const cpuTransformer = new Transformer(200)
  const memoryTransformer = new Transformer(200)
  const latencyTransformer = new Transformer(200)
  const errorTransformer = new Transformer(200)

  const addMetric = (point: MetricPoint) => {
    metrics.value.push(point)
    cpuSeries.value = cpuTransformer.add((p) => p.cpu, point)
    memorySeries.value = memoryTransformer.add((p) => p.memory, point)
    latencySeries.value = latencyTransformer.add((p) => p.latency, point)
    errorSeries.value = errorTransformer.add((p) => p.errorRate, point)
    tick.value++
  }
  const addLog = (event: LogEvent) => {
    logs.value.push(event)
  }
  const clear = () => {
    metrics.value = []
    logs.value = []
    cpuSeries.value = []
    memorySeries.value = []
    latencySeries.value = []
    errorSeries.value = []
    cpuTransformer.clear()
    memoryTransformer.clear()
    latencyTransformer.clear()
    errorTransformer.clear()
  }
  const setPaused = (value?: boolean) => {
    isPaused.value = value !== undefined ? value : !isPaused.value
  }

  return {
    metrics,
    logs,
    cpuSeries,
    memorySeries,
    latencySeries,
    errorSeries,
    tick,
    isPaused,
    isConnected,
    addMetric,
    addLog,
    clear,
    setPaused,
  }
})
