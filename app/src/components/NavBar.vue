<template>
  <!-- <header> -->
  <div class="navbar bg-base-100 rounded-lg w-full shadow-lg z-50 fixed">
    <div class="navbar-start">
      <div class="cursor-pointer btn-ghost text-lg" @click="navigateToLink('ballots')">
        e-Voting Portal
      </div>
    </div>
    <div class="navbar-end">
      <!-- <div>
        <button class="btn btn-primary" @click="siwe">SIWE</button>
      </div> -->
      <div className="dropdown cursor-pointer">
        <div tabindex="0">
          Themes
          <span class="badge text-xs bg-blue-300">Try!</span>
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
      <button class="btn btn-ghost btn-circle" v-if="$route.path != '/login'">
        <div class="indicator">
          <IconBell />
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
      <div class="dropdown dropdown-end" v-if="$route.path != '/login'">
        <IconAvatar :imgsrc="user && user.photoURL ? user.photoURL : null" />
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
          <li>
            <a @click="() => emits('logout')">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- </header> -->
</template>
<script async setup lang="ts">
import { useRouter } from 'vue-router'
import IconBell from '@/components/icons/IconBell.vue'
import IconAvatar from '@/components/icons/IconAvatar.vue'
import { useAuthStore } from '@/stores/auth'
import { ref, watch } from 'vue'
import { useWallet } from '@/composables/useWallet'
import { onMounted, onBeforeUnmount } from 'vue'

// const { isConnected, userAddress, connectWallet, signInWithEthereum } = useWallet()

const user = ref(useAuthStore().user)
watch(
  () => useAuthStore().user,
  (newValue) => {
    user.value = newValue
  },
  { deep: true }
)
defineProps<{
  themesAvailable: string[]
}>()
console.log(user.value)

const emits = defineEmits(['themeChanged', 'logout'])
const router = useRouter()

const navigateToLink = (id: string) => {
  router.push('/' + id)
}

onMounted(async () => {
  useWallet().connectWallet()
})

onBeforeUnmount(async () => {})
</script>

<style scoped></style>
