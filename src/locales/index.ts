import { createI18n } from 'vue-i18n'
import en from './en.json'
import zh_tw from './zh_tw.json'

const i18n = createI18n({
	locale: 'zh_tw',
	legacy: false,
	globalInjection: true,
	messages: {
		en,
		zh_tw,
	},
})

export default i18n
