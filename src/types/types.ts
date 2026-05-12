export type MetricData = {
  timestamp: number
  cpu: number
  memory: number
  latency: number
  errorRate: number
}

export type LogEvent = {
  timestamp: number
  trigger: string
  severity: "info" | "warning" | "critical"
  message: string
}
