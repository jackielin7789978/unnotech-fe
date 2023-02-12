<script setup lang="ts">
import noImage from '@/assets/images/no-image.png'

defineProps<{
	title: string
	author: string
	imageUrl?: string
}>()

const sliceText = (title: string, maxLength: number): string => {
	if (title.length > maxLength) {
		return title.slice(0, maxLength) + '...'
	}
	return title
}
</script>

<template>
	<div v-if="title && author" class="bg-white rounded px-2 py-4">
		<img
			:src="imageUrl || noImage"
			class="w-full aspect-square object-contain mb-4"
			alt="book image"
		/>
		<div class="px-4">
			<h1 class="break-words font-semibold">{{ sliceText(title, 30) }}</h1>
			<h3 class="break-words text-gray-700 text-sm">
				{{ sliceText($t('author') + author, 20) }}
			</h3>
		</div>
	</div>
</template>
