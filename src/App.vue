<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
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
