<template>
  <dialog
    id="my_modal_10"
    class="modal modal-bottom sm:modal-middle"
    :class="{ 'modal-open': showCreateBallotModal }"
  >
    <div class="modal-box">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="emits('toggleCreateBallotModal')"
      >
        ✕
      </button>
      <h1 class="font-bold text-2xl">Create New Ballot</h1>
      <hr class="" />

      <div class="flex justify-center">
        <button class="btn btn-primary justify-center">Add</button>
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const emits = defineEmits(['toggleCreateBallotModal'])
const props = defineProps<{
  showCreateBallotModal: boolean
}>()
const showCreateBallotModal = ref<boolean>(props.showCreateBallotModal)
watch(
  [() => props.showCreateBallotModal],
  ([newShowCreateBallotModal]) => {
    showCreateBallotModal.value = newShowCreateBallotModal
  },
  { deep: true }
)
</script>
