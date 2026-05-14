import { type MetricPoint, type LogEvent } from '@/types/types'

type Mode = 'live' | 'replay'

export class Engine {
  private intervalId?: ReturnType<typeof setInterval>
  private readonly intervalMs: number
  private state: MetricPoint
  private history: MetricPoint[] = []
  private logEmitter?: (log: LogEvent) => void
  private readonly emitter: (metricData: MetricPoint) => void
  private simTime = 0
  private isPaused = false
  private speed = 1
  private mode: Mode = 'live'

  constructor(emitter: (metricData: MetricPoint) => void, intervalMs = 500) {
    this.intervalMs = intervalMs
    this.state = {
      timestamp: Date.now(),
      cpu: 20,
      memory: 30,
      latency: 10,
      errorRate: 0,
    }
    this.emitter = emitter
  }

  get isRunning() {
    return Boolean(this.intervalId)
  }

  setLogEmitter(emitter: (log: LogEvent) => void) {
    this.logEmitter = emitter
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

  pause() {
    this.isPaused = true
  }

  resume() {
    this.isPaused = false
  }

  setSpeed(value: number) {
    this.speed = Math.max(0.1, Math.min(5, value))
  }

  setMode(mode: Mode) {
    this.mode = mode
    this.replayIndex = 0
  }

  private tick() {
    if (this.isPaused) return
    let nextState: MetricPoint
    this.simTime += this.intervalMs * this.speed
    if (this.mode === 'replay') {
      nextState = this.replayTick()
    } else {
      nextState = this.computeNextState()
      this.history.push(nextState)
      if (this.history.length > 500) this.history.shift()
    }

    this.state = nextState
    this.emit()
    const log = this.generateLog(nextState)
    if (log) {
      this.emitLog(log)
    }
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
    const drift = (Math.random() - 0.5) * 10 * this.speed
    const trend = Math.sin(this.simTime / 5000) * 5

    return this.clamp(this.state.cpu + drift + trend, 0, 100)
  }

  private computeMemory(cpu: number) {
    const current = this.state.memory
    const target = cpu * 0.6
    return this.clamp(current + (target - current) * 0.05, 0, 100)
  }

  private computeLatency(cpu: number) {
    let latency = cpu < 40 ? cpu * 0.5 : cpu < 70 ? cpu * 1.2 : cpu * 2.0
    if (cpu > 70) {
      latency += Math.random() * 20 * this.speed
    }
    return this.clamp(latency, 0, 200)
  }
  private computeErrorRate(cpu: number) {
    if (cpu < 60) return 0
    return Math.min(10, (cpu - 60) * 0.2)
  }

  private replayIndex = 0

  private replayTick(): MetricPoint {
    if (this.history.length === 0) {
      return this.state
    }

    const point = this.history[this.replayIndex] ?? this.state

    this.replayIndex = (this.replayIndex + 1) % this.history.length

    return point
  }

  private generateLog(point: MetricPoint): LogEvent | null {
    if (point.cpu > 85) {
      return {
        timestamp: point.timestamp,
        trigger: 'cpu_spike',
        severity: 'critical',
        message: `CPU spike detected: ${point.cpu.toFixed(1)}%`,
      }
    }
    if (point.latency > 120) {
      return {
        timestamp: point.timestamp,
        trigger: 'latency_warning',
        severity: 'warning',
        message: `High latency: ${point.latency.toFixed(1)}ms`,
      }
    }

    if (point.errorRate > 5) {
      return {
        timestamp: point.timestamp,
        trigger: 'error_rate',
        severity: 'critical',
        message: `Error rate elevated: ${point.errorRate.toFixed(1)}%`,
      }
    }
    if (Math.random() < 0.2) {
      return {
        timestamp: point.timestamp,
        trigger: 'heartbeat',
        severity: 'info',
        message: `System stable. The CPU is ${point.cpu.toFixed(1)}%`,
      }
    }

    return null
  }

  private emitLog(log: LogEvent) {
    try {
      this.logEmitter?.(log)
    } catch (err) {
      console.error('Log emitter failed:', err)
    }
  }

  private clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value))
  }
  private emit() {
    const snapshot = { ...this.state }

    try {
      this.emitter(snapshot)
    } catch (err) {
      console.error('Emitter failed:', err)
    }
  }
}
