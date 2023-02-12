import { createRouter, createWebHistory } from 'vue-router'
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
				title: 'book_list', //locale key
				rightIcon: 'plus',
			},
		},
		{
			path: '/addBook',
			name: 'add-book',
			component: () => import('@/views/AddBook.vue'),
			meta: {
				title: 'add_book', //locale key
				showPreviousButton: true,
			},
		},
	],
})

export default router
