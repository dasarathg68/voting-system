<template>
  <div class="mt-24 ml-10">
    <div class="text-xl">Ballots</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
      <CreateBallotCard
        :showCreateBallotModal="showCreateBallotModal"
        @toggleCreateBallotModal="showCreateBallotModal = !showCreateBallotModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateBallotCard from '@/components/CreateBallotCard.vue'

import { ref } from 'vue'

const showCreateBallotModal = ref<boolean>(false)
</script>
