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

// 解決閃現上一筆資料的問題，應該有更好的做法
const showContent = ref(false)
const waitingForDataUpdate = () => {
	setTimeout(() => {
		showContent.value = true
	}, 200)
}
waitingForDataUpdate()

watchEffect(() => {
	fetchStatus.value === 'fetching'
		? loadingStore.setIsLoading(true)
		: loadingStore.setIsLoading(false)
})
</script>

<template>
	<main>
		<div v-if="isError">{{ error }}</div>
		<div v-else-if="isSuccess" :class="{ 'opacity-0': !showContent }">
			<TopNav :title="data.title" />
			<PageWrapper>
				<BookForm formType="edit" :formData="data" />
			</PageWrapper>
		</div>
	</main>
</template>
