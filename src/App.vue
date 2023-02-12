<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { useLoadingStore } from './stores/loadingStore'

const { locale } = useI18n()
const loadingStore = useLoadingStore()
const toggleLocale = () => {
	if (locale.value === 'zh_tw') {
		locale.value = 'en'
	} else {
		locale.value = 'zh_tw'
	}
}

watchEffect(() => {
	localStorage.setItem('locale', locale.value)
})
</script>

<template>
	<RouterView />

	<LoadingSpinner
		v-if="loadingStore.isLoading"
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
	/>

	<IconBase
		@click="toggleLocale"
		class="fixed bottom-4 right-4"
		icon="fa-solid fa-language"
	/>
</template>

<style>
#app {
	background: #f5f5f5;
	min-height: 100vh;
	position: relative;
}

.debug {
	outline: 1px solid gold;
}
</style>
