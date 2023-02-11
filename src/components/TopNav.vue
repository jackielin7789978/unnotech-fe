<template>
	<header
		class="fixed w-screen px-6 flex items-center justify-center h-[60px] bg-white md:h-[80px]"
	>
		<IconBase
			@click="$router.back()"
			class="absolute left-6"
			:class="{
				'opacity-0 pointer-events-none': !$route.meta.showPreviousButton,
			}"
			icon="fa-solid fa-chevron-left"
		/>
		<h1 class="text-3xl md:text-4xl">
			{{ $route.meta.title }}
		</h1>
		<div class="absolute right-6">
			<slot name="rightIcon" />
		</div>
	</header>
</template>
