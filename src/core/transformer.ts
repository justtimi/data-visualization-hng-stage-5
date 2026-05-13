import type { MetricPoint } from '@/types/types'

export type CPUSeriesPoint = {
  timestamp: number
  value: number
}

export class Transformer {
  private series: CPUSeriesPoint[] = []
  private readonly maxSize: number

  constructor(maxSize = 200) {
    this.maxSize = maxSize
  }

  add(point: MetricPoint) {
    const transformed: CPUSeriesPoint = {
      timestamp: point.timestamp,
      value: point.cpu,
    }

    const next = [...this.series, transformed]

    this.series = next.slice(-this.maxSize)

    return this.series
  }
  getSeries() {
    return this.series
  }
  clear() {
    this.series = []
  }
}
