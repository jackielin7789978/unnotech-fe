import { createRouter, createWebHistory } from 'vue-router'
import type { IconList } from '@/types'

declare module 'vue-router' {
	interface RouteMeta {
		title?: string // 對應 locale key
		rightIcon?: IconList // 指定 Header 右方的 icon
		showPreviousButton?: boolean // 是否顯示返回 icon
		previousPage?: string // 指定上一層的 route name
	}
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior: (_to, _from, savedPosition) => {
		return savedPosition ? savedPosition : { top: 0 }
	},
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
				title: 'book_list',
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
				title: 'add_book',
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
