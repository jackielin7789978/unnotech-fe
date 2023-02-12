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
	<font-awesome-icon
		class="cursor-pointer text-xl md:text-2xl xl:text-3xl"
		:icon="icon"
	/>
</template>
