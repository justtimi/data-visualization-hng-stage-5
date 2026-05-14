import { Engine } from '@/core/streamEngine'
import { useMetricsStore } from '@/stores/metrics.store'

let engine: Engine | null = null

export function useEngine() {
  const store = useMetricsStore()

  if (!engine) {
    engine = new Engine((data) => store.addMetric(data))
    engine.setLogEmitter((log) => store.addLog(log))
  }

  return engine
}
