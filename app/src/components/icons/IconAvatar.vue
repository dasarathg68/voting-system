<template>
  <div tabindex="0" role="button" class="avatar">
    <div class="w-10 rounded-full flex justify-center">
      <img alt="Tailwind CSS Navbar component" :src="imgsrc" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  imgsrc?: string
}>()
const imgsrc = ref(
  props.imgsrc || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
)
</script>
