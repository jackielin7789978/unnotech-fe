<script setup lang="ts">
import noImage from '@/assets/images/no-image.png'
import { sliceText } from '@/utils'
import type { IBookData } from '@/types'

defineProps<{ data: IBookData }>()
</script>

<template>
	<div
		v-if="data.id && data.title && data.author"
		@click="
			$router.push({
				name: 'book_detail',
				params: { bookId: data.id },
			})
		"
		class="bg-white rounded px-2 py-4 cursor-pointer transition-all duration-200 ease hover:shadow-md"
	>
		<img
			:src="data.image || noImage"
			class="w-full aspect-square object-contain mb-4"
			alt="book image"
		/>
		<div class="px-4">
			<h1 class="break-words font-semibold">{{ sliceText(data.title, 30) }}</h1>
			<h3 class="break-words text-gray-700 text-sm">
				{{ sliceText($t('author') + data.author, 20) }}
			</h3>
		</div>
	</div>
</template>
