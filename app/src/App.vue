<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { useThemeStore } from '@/stores/themes'
import { storeToRefs } from 'pinia'
import { useAuth } from '@/composables/useAuth'
import { useToastStore } from '@/stores/toast'
import NotificationToast from '@/components/NotificationToast.vue'
import { ToastType } from '@/types/toast-type'
const toastStore = useToastStore()
const { showToast, type: toastType, message: toastMessage } = storeToRefs(toastStore)
const { currentTheme } = storeToRefs(useThemeStore())
const { show } = useToastStore()
const logout = () => {
  show(ToastType.Success, 'User Logged out successfully')
  useAuth().logout()
}
</script>

<template>
  <div class="flex flex-col min-h-svh justify-between" :data-theme="currentTheme">
    <NavBar
      :themesAvailable="useThemeStore().themes"
      @theme-changed="(newTheme) => useThemeStore().setTheme(newTheme)"
      @logout="logout"
    />
    <RouterView />
    <TheFooter />
    <NotificationToast v-if="showToast" :type="toastType" :message="toastMessage" />
  </div>
</template>
