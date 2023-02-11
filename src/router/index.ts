import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/locales'
import type { IconList } from '@/types'

declare module 'vue-router' {
	interface RouteMeta {
		title: string
		rightIcon?: IconList
		showPreviousButton?: boolean
	}
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: { name: 'books' },
		},
		{
			path: '/books',
			name: 'books',
			component: () => import('@/views/BookList.vue'),
			meta: {
				title: i18n.global.t('views.book_list'),
				rightIcon: 'plus',
			},
		},
		{
			path: '/addBook',
			name: 'add-book',
			component: () => import('@/views/AddBook.vue'),
			meta: {
				title: i18n.global.t('views.add_book'),
				showPreviousButton: true,
			},
		},
	],
})

export default router
