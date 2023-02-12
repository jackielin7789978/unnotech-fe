import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/tailwind.css'
import i18n from '@/locales'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faPlus,
	faChevronLeft,
	faLanguage,
	faPenToSquare,
} from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faChevronLeft, faLanguage, faPenToSquare)

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
