import { http } from './http'

// 取得所有書本
export const fetchBookList = async () => {
	const res = await http.get('/books')
	return res.data
}

// 取得單一書本
export const fetchBook = async (id: string) => {
	const res = await http.get(`/books/${id}`)
	return res.data
}
