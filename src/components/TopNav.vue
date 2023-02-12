<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

const props = defineProps<{ title?: string }>()

const title = computed(() =>
	props.title ? props.title : t(`views.${route.meta.title}`)
)
</script>

<template>
	<header
		class="fixed w-screen top-0 z-50 flex items-center justify-center h-[60px] bg-white md:h-[80px]"
	>
		<IconBase
			@click="$router.push({ name: $route.meta.previousPage })"
			class="absolute left-6 md:left-8 lg:left-10 xl:left-12"
			:class="{
				'opacity-0 pointer-events-none': !$route.meta.showPreviousButton,
			}"
			icon="fa-solid fa-chevron-left"
		/>
		<h1
			class="max-w-[270px] truncate mx-auto text-lg md:text-xl md:max-w-[620px] lg:text-2xl lg:max-w-[900px] xl:max-w-[1080px] xl:text-3xl xl:leading-[3rem]"
		>
			{{ title }}
		</h1>
		<div class="absolute right-6 md:right-8 lg:right-10 xl:right-12">
			<slot name="rightIcon" />
		</div>
	</header>
</template>
