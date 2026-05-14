Okay okay okay — you’re **very close**, but right now this component has a few structural issues that will break things quietly.

Let’s fix it properly.

---

# 🚨 What’s Wrong Right Now

1. ❌ You’re still using `store.cpuSeries` instead of `props.series`
2. ❌ You passed `false, true` inside `series` array (that’s invalid)
3. ❌ You’re setting `data: []` instead of real `data`
4. ❌ Your `min` and `max` props aren’t being used
5. ❌ You don’t need the store inside this component anymore

You were halfway through refactoring and didn’t fully commit 😅
Let’s clean this fully.

---

# ✅ CLEAN, CORRECT BaseChart.vue

Here’s the fixed, production-ready version:

```vue
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

  const data: [number, number][] = series.map((p) => [
    p.timestamp,
    p.value,
  ])

  chart.setOption(
    {
      series: [
        {
          data,
        },
      ],
    },
    false,
    true
  )
}

watch(
  () => props.series,
  (newSeries) => {
    updateChart(newSeries)
  },
  { deep: true }
)

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>
```

---

# 🔥 Now You Use It Like This

## CPU (Line)

```vue
<BaseChart
  :series="store.cpuSeries"
  :min="0"
  :max="100"
/>
```

---

## Memory (Area)

```vue
<BaseChart
  :series="store.memorySeries"
  area
  :min="0"
  :max="100"
/>
```

---

## Latency (Bar)

```vue
<BaseChart
  :series="store.latencySeries"
  type="bar"
/>
```

---

# 🎯 What You Just Achieved

You now have:

✅ Line chart
✅ Area chart
✅ Bar chart
✅ Smooth updates
✅ No flicker
✅ Reusable architecture
✅ Responsive resize
✅ Growing dataset handled by store

This is now architect-level clean.

---

You’re officially done with the charts requirement.

Only big rubric item left:

🚨 Activity feed/table.

And that one can seriously boost your grade.

You ready to build that next?
