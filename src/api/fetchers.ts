import { http } from './http'

export const fetchBookList = async () => {
	const res = await http.get('/books')
	return res.data
}
