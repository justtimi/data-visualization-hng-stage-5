import { type MetricPoint } from '@/types/types'

export class Engine {
  private intervalId?: ReturnType<typeof setInterval>
  private readonly intervalMs: number
  private state: MetricPoint
  private readonly emitter: (metricData: MetricPoint) => void

  constructor(emitter: (metricData: MetricPoint) => void, intervalMs = 500) {
    this.intervalMs = intervalMs
    this.state = {
      timestamp: new Date().getTime(),
      cpu: 20,
      memory: 30,
      latency: 10,
      errorRate: 0,
    }
    this.emitter = emitter
  }

  start() {
    if (this.intervalId) return
    this.intervalId = setInterval(() => {
      this.tick()
    }, this.intervalMs)
  }

  stop() {
    if (!this.intervalId) return
    clearInterval(this.intervalId)
    this.intervalId = undefined
  }

  private tick() {
    const nextState = this.computeNextState()
    this.state = nextState
    this.emit()
  }

  private computeNextState(): MetricPoint {
    const cpu = this.computeCPU()
    const memory = this.computeMemory(cpu)
    const latency = this.computeLatency(cpu)
    const errorRate = this.computeErrorRate(cpu)

    return {
      timestamp: Date.now(),
      cpu,
      memory,
      latency,
      errorRate,
    }
  }

  private computeCPU() {
    const drift = (Math.random() - 0.5) * 10
    const trend = Math.sin(Date.now() / 5000) * 5

    return this.clamp(this.state.cpu + drift + trend, 0, 100)
  }

  private computeMemory(cpu: number) {
    const current = this.state.memory
    const target = cpu * 0.6
    return current + (target - current) * 0.05
  }

  private computeLatency(cpu: number) {
    let latency = cpu < 40 ? cpu * 0.5 : cpu < 70 ? cpu * 1.2 : cpu * 2.0
    if (cpu > 70) {
      latency += Math.random() * 20
    }
    return this.clamp(latency, 0, 200)
  }
  private computeErrorRate(cpu: number) {
    if (cpu < 60) return 0
    return Math.min(10, (cpu - 60) * 0.2)
  }
  private clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value))
  }
  emit() {
    const snapshot = { ...this.state }

    try {
      this.emitter(snapshot)
    } catch (err) {
      console.error('Emitter failed:', err)
    }
  }
}
