<template>
  <div class="card bg-base-100 shadow-xl w-64">
    <div class="card-body flex justify-center items-center">
      <h1 class="card-title">Create Ballot</h1>

      <div class="w-6 h-6 cursor-pointer" @click="emits('toggleCreateBallotModal')">
        <IconPlus />
      </div>
    </div>
  </div>
  <CreateBallotModal
    :showCreateBallotModal="showCreateBallotModal"
    @toggleCreateBallotModal="emits('toggleCreateBallotModal')"
  />
</template>
<script setup lang="ts">
import IconPlus from '@/components/icons/IconPlus.vue'
import CreateBallotModal from '@/components/modals/CreateBallotModal.vue'
const emits = defineEmits(['toggleCreateBallotModal'])
const props = defineProps<{
  showCreateBallotModal: boolean
}>()
</script>
