<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { useThemeStore } from '@/stores/themes'
import { storeToRefs } from 'pinia'

const { currentTheme } = storeToRefs(useThemeStore())
</script>

<template>
  <div class="flex flex-col min-h-svh justify-between" :data-theme="currentTheme">
    <NavBar
      :themesAvailable="useThemeStore().themes"
      @theme-changed="
        (newTheme) => {
          useThemeStore().setTheme(newTheme)
        }
      "
    />
    <RouterView />
    <TheFooter />
  </div>
</template>
