<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue'
import { useUIStore } from '@/stores/ui.store.ts'

const ui = useUIStore()
</script>

<template>
  <div
    :class="[' flex h-screen overflow-hidden transition-colors', ui.darkMode ? 'dark bg-[#06050A] text-white' : 'bg-[#F8FAFC] text-[#0F172A]']"
  >
    <AppSidebar />

    <main class="flex-1 pl-12 pr-6 py-6 overflow-x-hidden relative scrollbar-hide">
      <router-view />
    </main>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
