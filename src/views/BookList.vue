import PageWrapper from '@/components/PageWrapper.vue';

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
	<PageWrapper>Hello</PageWrapper>
</template>
