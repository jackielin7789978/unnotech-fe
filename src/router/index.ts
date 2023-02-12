import { createRouter, createWebHistory } from 'vue-router'
import type { IconList } from '@/types'

declare module 'vue-router' {
	interface RouteMeta {
		title?: string
		rightIcon?: IconList
		showPreviousButton?: boolean
		previousPage?: string
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
			path: '/books/:bookId',
			name: 'book_detail',
			component: () => import('@/views/BookDetail.vue'),
			meta: {
				showPreviousButton: true,
				previousPage: 'books',
				rightIcon: 'edit',
			},
		},
		{
			path: '/addBook',
			name: 'add_book',
			component: () => import('@/views/AddBook.vue'),
			meta: {
				title: 'add_book', //locale key
				showPreviousButton: true,
				previousPage: 'books',
			},
		},
		{
			path: '/editBook/:bookId',
			name: 'edit_book',
			props: true,
			component: () => import('@/views/EditBook.vue'),
			meta: {
				showPreviousButton: true,
				previousPage: 'book_detail',
			},
		},
	],
})

export default router
