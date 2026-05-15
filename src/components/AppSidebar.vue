<script setup lang="ts">
import SidebarTabs, { type Tab } from './SidebarTabs.vue'
import Profile from '../assets/profile.png'
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Home,
  BarChart3,
  Terminal,
  PanelLeftClose,
  PanelLeftOpen,
  MoonIcon,
  SunIcon,
} from 'lucide-vue-next'
import { useUIStore } from '@/stores/ui.store'

const generalTabs = ref<Tab[]>([
  { id: 'dashboard', label: 'Dashboard', icon: Home, to: '/dashboard' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, to: '/analytics' },
  { id: 'logs', label: 'Logs', icon: Terminal, to: '/logs' },
])

const currentActiveId = ref('dashboard')
const isOpen = ref(true)
const isMobileOpen = ref(false)
const isMobile = ref(false)
const ui = useUIStore()

function selectTab(id: string) {
  currentActiveId.value = id
}

function toggleSidebar() {
  isOpen.value = !isOpen.value
}

function checkScreen() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>

<template>
  <div
    v-if="isMobile && isMobileOpen"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
    @click="isMobileOpen = false"
  />
  <Transition name="sidebar">
    <aside
      v-show="!isMobile || isMobileOpen"
      :class="[
        'fixed md:static z-50 h-screen flex flex-col justify-between p-3 transition-all duration-300 shrink-0 shadow-xl dark:shadow-none',
        isOpen ? 'w-44' : 'w-16',
        'bg-white dark:bg-[#111113] border-r border-slate-200 dark:border-[#232526] text-slate-900 dark:text-white',
      ]"
    >
      <div class="">
        <div class="flex justify-between items-center">
          <h3 v-if="isOpen" class="font-bold text-base tracking-tight">Pulse</h3>
          <button @click="isMobile ? (isMobileOpen = false) : toggleSidebar()" class="bg-white dark:bg-[#111113]
         border border-slate-200 dark:border-[#232526]
         text-slate-900 dark:text-white
         p-2 rounded-md
         shadow-sm hover:shadow-md
         transition-all duration-200
         hover:bg-slate-100 dark:hover:bg-neutral-800">
            <PanelLeftClose :size="20" :stroke-width="1.5" />
          </button>
        </div>
        <nav class="flex-1 my-6">
          <SidebarTabs :tabs="generalTabs" :active-tab-id="currentActiveId" @select="selectTab" />
        </nav>
      </div>
      <div class="flex flex-col justify-center items-center gap-2">
        <button
          @click="ui.toggleDarkMode()"
          class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs border border-slate-200 dark:border-[#232526] text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 hover:text-slate-900 dark:hover:text-white transition"
        >
          <MoonIcon v-if="ui.darkMode" />
          <SunIcon v-else />
          <span>{{ ui.darkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
        <div class="flex items-center gap-2 border-t border-[#232526] pt-3">
          <div class="w-7 h-7 rounded-full bg-neutral-700 overflow-hidden shrink-0">
            <img :src="Profile" alt="Profile" class="w-full h-full object-cover" />
          </div>

          <div v-if="isOpen" class="flex flex-col min-w-0">
            <h3 class="text-xs font-bold truncate leading-tight text-slate-900 dark:text-white">Timileyin Afolayan</h3>
            <p class="text-[10px] opacity-70 truncate leading-none mt-0.5 text-slate-500 dark:text-neutral-400">
              afolayant537@gmail.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  </Transition>
  <button
    v-if="isMobile && !isMobileOpen"
    @click="isMobileOpen = true"
    class="fixed top-4 left-1 z-50 bg-white dark:bg-[#111113]
         border border-slate-200 dark:border-[#232526]
         text-slate-900 dark:text-white
         p-2 rounded-md
         shadow-sm hover:shadow-md
         transition-all duration-200
         hover:bg-slate-100 dark:hover:bg-neutral-800"
  >
    <PanelLeftOpen :size="18" :stroke-width="1.5" />
  </button>
</template>

<style scoped></style>
