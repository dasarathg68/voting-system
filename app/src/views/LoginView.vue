<template>
  <div class="flex flex-col items-center justify-center mt-40 rounded-box w-auto">
    <h1 class="text-4xl">e-Voting Portal</h1>
    <form class="flex flex-col items-center mt-10">
      <input
        type="text"
        class="input input-primary input-bordered w-full sm:w-96 input-disabled"
        placeholder="Username"
      />
      <input
        type="password"
        class="input input-primary input-bordered w-full sm:w-96 mt-4 input-disabled"
        placeholder="Password"
      />
      <button class="btn btn-primary w-full sm:w-96 mt-4">Login</button>
    </form>
    Or
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth'
</script>
