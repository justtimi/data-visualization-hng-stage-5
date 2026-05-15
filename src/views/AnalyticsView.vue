<script setup lang="ts">
import ActivityTable from '@/components/ActivityTable.vue'
import { onMounted } from 'vue'
import { useEngine } from '@/core/engineInstance'

const engine = useEngine()

onMounted(() => {
  engine.start()
})
</script>

<template>
      <header class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-100">Analytics</h1>
        <p class="text-xs text-slate-500 dark:text-neutral-400 mt-1">Real-time activity logs and system events</p>
      </header>
      <section class="rounded-lg border border-slate-200 dark:border-[#232526] bg-white dark:bg-[#111113] shadow-sm p-4">
        <ActivityTable />
      </section>
</template>
