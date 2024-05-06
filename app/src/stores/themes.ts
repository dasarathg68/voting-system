import { defineStore } from 'pinia'
import { themes } from '@/utils/themes'

export const useThemeStore = defineStore({
  id: 'themeData',
  state: () => ({
    currentTheme: localStorage.getItem('name') || 'lofi',
    themes: themes.themes
  }),
  actions: {
    setTheme(theme: string) {
      if (this.themes.includes(theme)) {
        this.currentTheme = theme
        localStorage.setItem('name', theme) // Save name to localStorage
      }
    }
  }
})
