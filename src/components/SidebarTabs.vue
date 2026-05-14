<script setup lang="ts">
import type { Component } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

export type Tab = {
  id: string
  label: string
  icon?: Component
  to: string
}
withDefaults(
  defineProps<{
    tabs: Tab[]
  }>(),
  {
    tabs: () => [],
  },
)
</script>

<template>
  <nav class="w-full">
    <ul class="flex flex-col gap-1">
      <li v-for="tab in tabs" :key="tab.id">
        <RouterLink
  :to="tab.to"
  class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs border transition-colors"
  :class="[
    route.path === tab.to
      ? 'bg-neutral-600 border-neutral-600 font-semibold text-white'
      : 'border-[#232526] text-neutral-400 hover:bg-neutral-600/50 hover:text-white'
  ]"
>
          <component v-if="tab.icon" :is="tab.icon" class="w-4 h-4 shrink-0" />
          <span class="truncate">{{ tab.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
