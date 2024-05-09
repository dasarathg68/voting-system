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

      <div class="flex flex-col gap-4 mt-2">
        <input v-model="name" type="text" placeholder="Ballot Name" class="input input-primary" />
        <input
          type="datetime-local"
          v-model="startDateTime"
          placeholder="Start Date and Time"
          class="input input-primary"
        />
        <input
          type="datetime-local"
          v-model="endDateTime"
          placeholder="End Date and Time"
          class="input input-primary"
        />
        <input
          v-model="candidate"
          type="text"
          placeholder="Candidate"
          class="input input-primary"
          @keyup.enter="addCandidate"
        />
        <div v-for="(candidate, index) in candidates" :key="index">
          {{ candidate }}
        </div>
        <input
          v-model="voter"
          type="text"
          placeholder="Voter Address"
          class="input input-primary"
          @keyup.enter="addVoter"
        />
        <div v-for="(voter, index) in voters" :key="index">
          {{ voter }}
        </div>
        <button class="btn btn-primary justify-center" @click="createBallot">Create Ballot</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'

const emits = defineEmits(['toggleCreateBallotModal'])
const props = defineProps<{
  showCreateBallotModal: boolean
}>()

const name = ref<string>('')
const startDateTime = ref<string>('')
const endDateTime = ref<string>('')
const candidates = ref<string[]>([])
const candidate = ref<string>('')
const voters = ref<string[]>([])
const voter = ref<string>('')

const addCandidate = () => {
  if (candidate.value.trim() !== '') {
    candidates.value.push(candidate.value.trim())
    candidate.value = ''
  }
}

const addVoter = () => {
  if (voter.value.trim() !== '') {
    voters.value.push(voter.value.trim())
    voter.value = ''
  }
}

const createBallot = async () => {
  const startTimeUnix = Date.parse(startDateTime.value) / 1000 // Dividing by 1000 to convert milliseconds to seconds
  const endTimeUnix = Date.parse(endDateTime.value) / 1000
  console.log(voters.value)
  // Call your smart contract function here with the provided inputs
  // await yourContractInstance.createBallot(
  //   name.value,
  //   startTime.value,
  //   endTime.value,
  //   candidates.value,
  //   voters.value
  // )
  // Reset input fields or handle success
}
</script>
