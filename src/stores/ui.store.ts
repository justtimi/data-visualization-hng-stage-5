import { defineStore } from "pinia"

export const useUIStore = defineStore('ui', {
  state: () => ({
    darkMode: true
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    }
  }
})
