<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { fetchBookList } from '@/api/queries'
import { useLoadingStore } from '@/stores/loadingStore'

export interface IBookData {
	id: number
	title: string
	author: string
	image?: string
	description?: string
}
const loadingStore = useLoadingStore()
const { fetchStatus, isError, isSuccess, data, error } = useQuery({
	queryKey: ['books'],
	queryFn: fetchBookList,
	retry: 2,
})
watchEffect(() => {
	fetchStatus.value === 'fetching'
		? loadingStore.setIsLoading(true)
		: loadingStore.setIsLoading(false)
})
</script>

<template>
	<main>
		<TopNav>
			<template #rightIcon>
				<IconBase
					@click="$router.push({ name: 'add_book' })"
					:class="{ 'opacity-0': !$route.meta.rightIcon }"
					:icon="$route.meta.rightIcon"
				/>
			</template>
		</TopNav>
		<PageWrapper>
			<div v-if="isError">{{ error }}</div>
			<ul
				v-else-if="isSuccess"
				class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4 2xl:gap-6"
			>
				<BookCard
					v-for="book in (data as IBookData[])"
					:key="book.id"
					:data="book"
				/>
			</ul>
		</PageWrapper>
	</main>
</template>
