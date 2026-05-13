<template>
  <div ref="chartRef" style="width: 100%; height: 300px" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useMetricsStore } from '@/stores/metrics.store'
import type { CPUSeriesPoint } from '@/core/transformer'

const store = useMetricsStore()
const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

onMounted(() => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption({
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
    },
    series: [
      {
        type: 'line',
        data: [],
        smooth: true,
        showSymbol: false,
      },
    ],
  })
  updateChart(store.cpuSeries)
})

function updateChart(series: CPUSeriesPoint[]) {
  if (!chart) return

  const data:[number, number][] = series.map((p) => [p.timestamp, p.value] as[number, number]).sort((a, b) => a[0] - b[0])

  chart.setOption({
    series: [
      {
        data,
      },
    ],
  })
}

watch(
  () => store.tick,
  () => updateChart(store.cpuSeries)
)
onUnmounted(() => {
  chart?.dispose()
})

// Component logic here
</script>

<style scoped></style>
