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
          <div
            class="flex mt-2 text-sm cursor-pointer align-center justify-end w-full"
            @click="toggleForgotPasswordModal"
          >
            Forgot Password?
          </div>
          <div class="flex justify-center pb-3 w-full">
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
      <div class="flex justify-center gap-6 pb-3">
        <button class="btn btn-primary justify-center mt-2" @click="googleLogin">
          <IconGoogle />
        </button>
        <button class="btn btn-primary justify-center mt-2" @click="signInWithEthereum">
          <IconMetaMask />
        </button>
      </div>
    </div>
  </div>
  <ForgotPasswordModal
    :show="showForgotPasswordModal"
    @toggleForgotPasswordModal="toggleForgotPasswordModal"
    @sendResetEmail="(email) => sendResetEmail(email)"
  />
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { ref } from 'vue'
import IconMetaMask from '@/components/icons/IconMetaMask.vue'
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal.vue'

const auth = useAuth()

const {
  // isConnected, userAddress, connectWallet,
  signInWithEthereum
} = useAuth()
const showForgotPasswordModal = ref(false)
const activeTab = ref('login') // Set initial tab to login
const email = ref('')
const password = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

const toggleForgotPasswordModal = () => {
  showForgotPasswordModal.value = !showForgotPasswordModal.value
}
const login = async () => {
  await auth.loginWithEmail(email.value, password.value)
}

const register = async () => {
  await auth.signup(registerEmail.value, registerPassword.value)
}
const googleLogin = async () => {
  await auth.loginWithGoogle()
}
const sendResetEmail = async (email: string) => {
  await auth.forgotPassword(email)
  toggleForgotPasswordModal()
}
</script>
