<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { fetchBookList } from '@/api/fetchers'

export interface IBookData {
	id: string
	title: string
	author: string
	image?: string
	description: string
}
const { isLoading, isError, isSuccess, data, error } = useQuery({
	queryKey: ['books'],
	queryFn: fetchBookList,
	retry: 2,
})
</script>

<template>
	<TopNav>
		<template #rightIcon>
			<IconBase
				@click="$router.push({ name: 'add-book' })"
				:class="{ 'opacity-0': !$route.meta.rightIcon }"
				:icon="$route.meta.rightIcon"
			/>
		</template>
	</TopNav>
	<PageWrapper>
		<span v-if="isLoading">Loading...</span>
		<span v-else-if="isError">{{ error }}</span>
		<ul
			v-else-if="isSuccess"
			class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4"
		>
			<BookCard
				v-for="book in (data as IBookData[])"
				:key="book.id"
				:title="book.title"
				:author="book.author"
				:image-url="book.image"
			/>
		</ul>
	</PageWrapper>
</template>
