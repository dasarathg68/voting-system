<template>
  <!-- <header> -->
  <div class="navbar bg-base-100 rounded-lg w-full shadow-lg z-50 fixed">
    <div class="navbar-start">
      <div class="cursor-pointer btn-ghost text-lg" @click="navigateToLink('ballots')">
        e-Voting Portal
      </div>
    </div>
    <div class="navbar-end">
      <div className="dropdown cursor-pointer">
        <div tabindex="0">
          Themes
          <span class="badge text-xs bg-blue-300">New</span>
        </div>

        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content z-[1] bg-base-100 rounded-box border-transparent bg-[rgba(0,0,0,0.2)] w-32 mt-8"
        >
          <li v-for="theme in themesAvailable" :key="theme">
            <div
              type="radio"
              name="dropdown"
              class="btn btn-sm btn-ghost"
              :aria-label="theme"
              :value="theme"
              @click="emits('themeChanged', theme)"
            >
              {{ theme }}
            </div>
          </li>
        </ul>
      </div>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <IconBell />
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
      <div class="dropdown dropdown-end">
        <IconAvatar />
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>

  <!-- </header> -->
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconBell from '@/components/icons/IconBell.vue'
import IconAvatar from '@/components/icons/IconAvatar.vue'
defineProps<{
  themesAvailable: string[]
}>()
const emits = defineEmits(['themeChanged'])
const router = useRouter()

function navigateToLink(id: string) {
  router.push('/' + id)
}
</script>

<style scoped></style>
