<template>
  <div ref="chartRef" style="width: 100%; height: 300px" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { CPUSeriesPoint } from '@/core/transformer'

const props = defineProps<{
  series: CPUSeriesPoint[]
  type?: 'line' | 'bar'
  area?: boolean
  min?: number
  max?: number
}>()

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

function handleResize() {
  chart?.resize()
}

onMounted(() => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption({
    animation: true,
    animationDuration: 300,
    animationEasing: 'linear',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      min: props.min ?? undefined,
      max: props.max ?? undefined,
    },
    series: [
      {
        type: props.type ?? 'line',
        smooth: props.type !== 'bar',
        showSymbol: false,
        areaStyle: props.area ? { opacity: 0.2 } : undefined,
        data: [],
      },
    ],
  })
  window.addEventListener('resize', handleResize)
  updateChart(props.series)
})

function updateChart(series: CPUSeriesPoint[]) {
  if (!chart) return

  const data = series.map(([time, value]) => ({
    value: [time, value],
  }))

  chart.setOption(
    {
      series: [
        {
          data,
        },
      ],
    },
    false,
    true,
  )
}

watch(
  () => props.series,
  (newSeries) => {
    updateChart(newSeries)
  },
  { immediate: true },
)
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>
