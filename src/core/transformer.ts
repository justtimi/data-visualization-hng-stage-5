import type { MetricPoint } from '@/types/types'

export type SeriesPoint = [number, number]

export class Transformer {
  private series: SeriesPoint[] = []
  private readonly maxSize: number

  constructor(maxSize = 200) {
    this.maxSize = maxSize
  }

  add(mapper: (p: MetricPoint) => number, point: MetricPoint) {
    const transformed: SeriesPoint = [point.timestamp, mapper(point)]

    this.series = [...this.series, transformed].slice(-this.maxSize)

    return this.series
  }
  getSeries() {
    return [...this.series]
  }
  clear() {
    this.series = []
  }
}
