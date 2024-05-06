<template>
  <div class="mt-24 ml-10">
    <div class="text-xl">Ballots</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
      <CreateBallotCard
        :showCreateBallotModal="isCreateBallotModal"
        @toggleCreateBallotModal="toggleCreateBallotModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateBallotCard from '@/components/CreateBallotCard.vue'
import { useCreateBallotModal } from '@/composables/useCreateBallotModal'

const { isOpen: isCreateBallotModal, toggleModal: toggleCreateBallotModal } = useCreateBallotModal()
</script>
