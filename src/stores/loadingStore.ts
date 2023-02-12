export const useLoadingStore = defineStore('loading', () => {
	const isLoading = ref(false)

	const setIsLoading = (value: boolean) => {
		isLoading.value = value
	}

	return { isLoading, setIsLoading }
})
