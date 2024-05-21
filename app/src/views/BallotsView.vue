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
import { useVotingStore } from '@/stores/votes'
import { wallet } from '@/utils/wallet'
import { onMounted } from 'vue'

const { isOpen: isCreateBallotModal, toggleModal: toggleCreateBallotModal } = useCreateBallotModal()
onMounted(async () => {
  await wallet.connectWallet()
  console.log(await useVotingStore().getBallots())
  console.log('BallotsView mounted')
})
</script>
