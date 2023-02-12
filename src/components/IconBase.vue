<script setup lang="ts">
withDefaults(
	defineProps<{
		icon: string
	}>(),
	{
		icon: 'fa-solid fa-plus',
	}
)
</script>

<template>
	<font-awesome-icon class="cursor-pointer text-3xl md:text-4xl" :icon="icon" />
</template>
