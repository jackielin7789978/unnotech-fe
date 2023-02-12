import axios from 'axios'

export const http = axios.create({
	baseURL: 'https://fe-interview-api.unnotech.com',
})
