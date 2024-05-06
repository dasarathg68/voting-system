<template>
  <div class="flex flex-col items-center justify-center mt-40 rounded-box pb-5">
    <div class="justify-center shadow-xl">
      <!-- <h1 class="text-4xl justify-center">e-Voting Portal</h1> -->

      <div role="tablist" className="tabs tabs-lifted tabs-lg p-4">
        <a
          role="tab"
          class="tab"
          :class="{ active: activeTab === 'login', 'tab-active': activeTab === 'login' }"
          @click="activeTab = 'login'"
          >Login</a
        >
        <a
          role="tab"
          class="tab"
          :class="{ active: activeTab === 'register', 'tab-active': activeTab === 'register' }"
          @click="activeTab = 'register'"
          >Register</a
        >
      </div>
      <div role="tablist" class="tabs"></div>

      <template v-if="activeTab === 'login'">
        <form class="flex flex-col items-center mt-10 m-3" @submit.prevent="login">
          <input
            type="email"
            v-model="email"
            class="input input-primary input-bordered w-full sm:w-96 mt-4"
            placeholder="Email"
            required
          />
          <input
            type="password"
            v-model="password"
            class="input input-primary input-bordered w-full sm:w-96 mt-4"
            placeholder="Password"
            required
          />
          <div class="flex justify-center pb-3">
            <button class="btn btn-primary w-auto mt-4" type="submit">Login</button>
          </div>
        </form>
      </template>
      <template v-else>
        <form class="flex flex-col items-center mt-10 m-3" @submit.prevent="register">
          <input
            type="text"
            v-model="registerEmail"
            class="input input-primary input-bordered w-full sm:w-96 mt-4"
            placeholder="Email"
            required
          />
          <input
            type="password"
            v-model="registerPassword"
            class="input input-primary input-bordered w-full sm:w-96 mt-4"
            placeholder="Password"
            required
          />
          <div class="flex justify-center pb-3">
            <button class="btn btn-primary w-auto mt-4" type="submit">Register</button>
          </div>
        </form>
      </template>
      <div class="flex mt-2 justify-center w-full">or</div>
      <div class="flex justify-center pb-3" @click="googleLogin">
        <button class="btn btn-primary justify-center mt-2">
          <IconGoogle />
          <div>Sign in With Google</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { ref } from 'vue'
const authStore = useAuthStore()

const activeTab = ref('login') // Set initial tab to login
const email = ref('')
const password = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

const login = async () => {
  await authStore.loginWithEmail(email.value, password.value)
}

const register = async () => {
  await authStore.signup(registerEmail.value, registerPassword.value)
}
const googleLogin = async () => {
  await authStore.loginWithGoogle()
}
</script>
