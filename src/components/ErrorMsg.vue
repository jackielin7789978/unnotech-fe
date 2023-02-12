<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
	>
		<div class="text-3xl mb-4">{{ msg }}</div>
		<router-link :to="{ name: 'books' }">
			<ButtonBase btnType="cancel" class="min-w-[120px] px-4">
				{{ $t('error.go_home') }}
			</ButtonBase>
		</router-link>
	</div>
</template>
