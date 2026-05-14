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
        <h1 class="text-2xl font-bold tracking-tight text-neutral-100">Analytics</h1>
        <p class="text-xs text-neutral-400 mt-1">Real-time activity logs and system events</p>
      </header>
      <section class="bg-[#111113] border border-[#232526] rounded-lg p-4 shadow-xl">
        <ActivityTable />
      </section>
</template>
