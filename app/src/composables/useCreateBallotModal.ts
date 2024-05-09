import { ref } from 'vue'

export const useCreateBallotModal = () => {
  const isOpen = ref(false)

  const toggleModal = () => {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    toggleModal
  }
}
