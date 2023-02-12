<script setup lang="ts">
const props = defineProps<{
	btnType: 'cancel' | 'ok'
}>()

const btnClass = computed(() =>
	props.btnType === 'ok'
		? 'bg-cyan-600 hover:bg-cyan-700'
		: 'bg-gray-300 hover:bg-gray-400'
)
</script>

<template>
	<button
		class="rounded-[18px] h-[40px] min-w-[80px] text-white font-semibold transition-all duration-200 ease select-none lg:h-[48px] lg:rounded-[22px] lg:text-lg"
		:class="btnClass"
	>
		<slot />
	</button>
</template>
