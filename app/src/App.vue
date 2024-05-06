<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'
import TheFooter from '@/components/TheFooter.vue'
import { themes } from '@/utils/themes'

const themesAvailable = ref(themes.themes)
const currentTheme = ref('cyberpunk')
</script>

<template>
  <div class="flex flex-col min-h-svh justify-between" :data-theme="currentTheme">
    <NavBar
      :themesAvailable="themesAvailable"
      @theme-changed="(newTheme) => (currentTheme = newTheme)"
    />
    <RouterView />
    <TheFooter />
  </div>
</template>
