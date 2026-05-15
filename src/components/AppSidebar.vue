<script setup lang="ts">
import SidebarTabs, { type Tab } from './SidebarTabs.vue'
import Profile from "../assets/profile.png"
import { ref, onMounted, onUnmounted } from 'vue'
import { Home, BarChart3, Terminal, PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'

const generalTabs = ref<Tab[]>([
  { id: 'dashboard', label: 'Dashboard', icon: Home, to: '/dashboard' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, to: '/analytics' },
  { id: 'logs', label: 'Logs', icon: Terminal, to: '/logs' },
])

const currentActiveId = ref('dashboard')
const isOpen = ref(true)
const isMobileOpen = ref(false)
const isMobile = ref(false)

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
    class="fixed inset-0 bg-black/60 z-40"
    @click="isMobileOpen = false"
  />
  <Transition name="sidebar">
  <aside v-show="!isMobile || isMobileOpen"  :class="[
        'fixed md:static z-50 h-screen bg-[#111113] border-r border-[#232526] text-white flex flex-col justify-between p-3 transition-all duration-300 shrink-0',
        isOpen ? 'w-44' : 'w-16'
      ]">
    <div
      class=""
    >
      <div class="flex justify-between items-center">
        <h3 v-if="isOpen" class="font-bold text-sm tracking-tight">Timmy</h3>
        <button  @click="isMobile ? (isMobileOpen = false) : toggleSidebar()" class="text-white"><PanelLeftClose :size="20" :stroke-width="1.5"/></button>
      </div>
      <nav class="flex-1 my-6">
        <SidebarTabs :tabs="generalTabs" :active-tab-id="currentActiveId" @select="selectTab" />
      </nav>
          </div>
      <div class="flex items-center gap-2 border-t border-[#232526] pt-3">
        <div class="w-7 h-7 rounded-full bg-neutral-700 overflow-hidden shrink-0">
          <img :src="Profile" alt="Profile" class="w-full h-full object-cover" />
        </div>

        <div v-if="isOpen" class="flex flex-col min-w-0">
          <h3 class="text-xs font-bold truncate leading-tight">Timileyin Afolayan</h3>
          <p class="text-[10px] opacity-70 truncate leading-none mt-0.5">afolayant537@gmail.com</p>
        </div>
      </div>

  </aside>
  </Transition>
  <button
  v-if="isMobile && !isMobileOpen"
  @click="isMobileOpen = true"
  class="fixed top-4 left-1 z-50 bg-[#111113] border border-[#232526] text-white p-2 rounded-md"
>
  <PanelLeftOpen :size="18" :stroke-width="1.5"/>
</button>
</template>

<style scoped></style>
