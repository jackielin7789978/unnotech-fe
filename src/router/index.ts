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
	scrollBehavior(to, from, savedPosition) {
		// 從 detail 頁回到列表頁時，如果 savedPosition 有值就滾動到那個位置
		// 若無值則取用 sessionStorage 中儲存的 scrollPosition
		if (
			(from.name === 'book_detail' || from.name === 'add_book') &&
			to.name === 'books'
		) {
			return (
				savedPosition || {
					top: Number(sessionStorage.getItem('scrollPosition')),
				}
			)
		}
		return { top: 0 }
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
		{
			path: '/:pathMatch(.*)*',
			name: 'not_found',
			component: () => import('@/views/NotFound.vue'),
		},
	],
})

router.afterEach((to, from) => {
	// 從列表頁跳轉到 detail 頁時，將 scrollY 位置紀錄在 sessionStorage
	if (
		(from.name === 'books' && to.name === 'book_detail') ||
		to.name === 'add_book'
	) {
		sessionStorage.setItem('scrollPosition', String(window.scrollY))
	}
})

export default router
