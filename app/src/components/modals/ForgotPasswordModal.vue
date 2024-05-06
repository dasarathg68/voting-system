<template>
  <dialog
    id="my_modal_20"
    v-if="show"
    class="modal sm:modal-middle"
    :class="{ 'modal-open': show }"
  >
    <div class="modal-box">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="emits('toggleForgotPasswordModal')"
      >
        <span>x</span>
      </button>
      <h1 class="font-bold text-2xl">Forgot Password</h1>
      <label class="input input-bordered flex">
        <input type="email" class="grow" v-model="resetPasswordEmail" />
      </label>
      <div class="flex mt-2 justify-center" @click="emits('sendResetEmail', resetPasswordEmail)">
        <button class="btn btn-primary size-sm">Send Reset Email</button>
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{
  show: boolean
}>()
const show = ref(props.show)
const resetPasswordEmail = ref('')
const emits = defineEmits(['toggleForgotPasswordModal', 'sendResetEmail'])
watch(
  () => props.show,
  (value) => {
    show.value = value
  }
)
</script>
