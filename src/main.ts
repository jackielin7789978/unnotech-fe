import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/tailwind.css'
import i18n from '@/locales'
import { VueQueryPlugin } from '@tanstack/vue-query'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faPlus,
	faChevronLeft,
	faLanguage,
} from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faChevronLeft, faLanguage)

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
