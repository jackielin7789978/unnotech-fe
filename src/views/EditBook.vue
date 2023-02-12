<script setup lang="ts">
import { fetchBook } from '@/api/queries'
import { useQuery } from '@tanstack/vue-query'
import { useLoadingStore } from '@/stores/loadingStore'
import { AxiosError } from 'axios'

const route = useRoute()
const loadingStore = useLoadingStore()
const { t } = useI18n()
const { fetchStatus, isLoading, isSuccess, isError, error, data } = useQuery({
	queryKey: ['book'],
	queryFn: () => fetchBook(route.params.bookId as string),
	retry: 1,
})

watchEffect(() => {
	fetchStatus.value === 'fetching'
		? loadingStore.setIsLoading(true)
		: loadingStore.setIsLoading(false)
})

const errorMessage = computed(() => {
	if (error.value instanceof AxiosError) {
		switch (error.value.response?.status) {
			case 404:
				return t('error.404')
		}
	}
})
</script>

<template>
	<main>
		<span v-if="isLoading"></span>
		<span v-else-if="isError">
			<ErrorMsg :msg="errorMessage" />
		</span>
		<div v-else-if="isSuccess">
			<TopNav :title="data.title" />
			<PageWrapper>
				<BookForm formType="edit" :formData="data" />
			</PageWrapper>
		</div>
	</main>
</template>
