import { ref } from 'vue'

export function useCreateBallotModal() {
  const isOpen = ref(false)

  function toggleModal() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    toggleModal
  }
}
