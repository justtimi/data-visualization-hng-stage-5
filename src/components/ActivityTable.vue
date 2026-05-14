<script setup lang="ts">
import { computed } from 'vue'
import { useVueTable, getCoreRowModel, createColumnHelper } from '@tanstack/vue-table'
import { useMetricsStore } from '@/stores/metrics.store'
import type { LogEvent } from '@/types/types'

const store = useMetricsStore()

const data = computed(() => [...store.logs])

const columnHelper = createColumnHelper<LogEvent>()

const columns = [
  columnHelper.accessor('timestamp', {
    header: 'Time',
    cell: (info) => new Date(info.getValue()).toLocaleTimeString(),
  }),

  columnHelper.accessor('severity', {
    header: 'Severity',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('trigger', {
    header: 'Event',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('message', {
    header: 'Message',
    cell: (info) => info.getValue(),
  }),
]

const table = useVueTable({
  get data() {
    return data.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="bg-[#111113] border border-[#232526] rounded-lg p-4">
    <h2 class="text-xs uppercase text-neutral-400 mb-3">Activity Logs (Analytics)</h2>

    <table class="w-full text-xs">
      <thead>
        <tr class="text-left text-neutral-400">
          <th>Time</th>
          <th>Severity</th>
          <th>Event</th>
          <th>Message</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id" class="border-t border-[#232526]">
          <td class="py-2">
            {{ new Date(row.original.timestamp).toLocaleTimeString() }}
          </td>

          <td>
            <span
              :class="{
                'text-green-400': row.original.severity === 'info',
                'text-yellow-400': row.original.severity === 'warning',
                'text-red-400': row.original.severity === 'critical',
              }"
            >
              {{ row.original.severity }}
            </span>
          </td>

          <td class="text-white">{{ row.original.trigger }}</td>
          <td class="text-neutral-300">{{ row.original.message }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
