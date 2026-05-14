import type { MetricPoint } from '@/types/types'

export type CPUSeriesPoint = [number, number]

export class Transformer {
  private series: CPUSeriesPoint[] = []
  private readonly maxSize: number

  constructor(maxSize = 200) {
    this.maxSize = maxSize
  }

  add(point: MetricPoint) {
    const transformed: CPUSeriesPoint = [
    point.timestamp,
    point.cpu,
  ]

     this.series = [...this.series, transformed].slice(-this.maxSize)

  return this.series
  }
  getSeries() {
    return this.series
  }
  clear() {
    this.series = []
  }
}
