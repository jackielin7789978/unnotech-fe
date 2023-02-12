<script setup lang="ts">
import { fetchBook } from '@/api/queries'
import { useQuery } from '@tanstack/vue-query'
import { useLoadingStore } from '@/stores/loadingStore'

const route = useRoute()
const loadingStore = useLoadingStore()

const { fetchStatus, isSuccess, isError, error, data } = useQuery({
	queryKey: ['book'],
	queryFn: () => fetchBook(route.params.bookId as string),
	retry: 1,
})

watchEffect(() => {
	fetchStatus.value === 'fetching'
		? loadingStore.setIsLoading(true)
		: loadingStore.setIsLoading(false)
})
</script>

<template>
	<main>
		<div v-if="isError">{{ error }}</div>
		<div v-else-if="isSuccess">
			<TopNav :title="data.title" />
			<PageWrapper>
				<BookForm formType="edit" :formData="data" />
			</PageWrapper>
		</div>
	</main>
</template>
