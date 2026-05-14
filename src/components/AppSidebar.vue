<script setup lang="ts">
import SidebarTabs, { type Tab } from './SidebarTabs.vue'
import { ref } from 'vue'
import { Home, BarChart3, Terminal } from 'lucide-vue-next'

const generalTabs = ref<Tab[]>([
  { id: 'dashboard', label: 'Dashboard', icon: Home, to: '/dashboard' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, to: '/analytics' },
  { id: 'logs', label: 'Logs', icon: Terminal, to: '/logs' },
])

const currentActiveId = ref('dashboard')

function selectTab(id: string) {
  currentActiveId.value = id
}
</script>

<template>
  <aside class="w-44 shrink-0">
    <div
      class="fixed flex h-screen w-44 flex-col justify-between bg-[#111113] p-3 text-white border-r border-[#232526]"
    >
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-sm tracking-tight">Timmy</h3>
        <button class="text-xs opacity-60 hover:opacity-100 transition-opacity">Close</button>
      </div>
      <nav class="flex-1 my-6">
        <SidebarTabs :tabs="generalTabs" :active-tab-id="currentActiveId" @select="selectTab" />
      </nav>
      <div class="flex items-center gap-2 border-t border-[#232526] pt-3">
        <div class="w-7 h-7 rounded-full bg-neutral-700 overflow-hidden shrink-0">
          <img src="" alt="Profile" class="w-full h-full object-cover" />
        </div>

        <div class="flex flex-col min-w-0">
          <h3 class="text-xs font-bold truncate leading-tight">Timileyin Afolayan</h3>
          <p class="text-[10px] opacity-70 truncate leading-none mt-0.5">afolayant537@gmail.com</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped></style>
