const iconList = {
	plus: 'fa-solid fa-plus',
	edit: 'fa-solid fa-pen-to-square',
} as const

export type IconList = keyof typeof iconList

export enum LocalList {
	en,
	zh_tw,
}

export interface IBookData {
	id: number
	title: string
	author: string
	description?: string
	image?: string
	created_at?: string
	updated_at?: string
}
export interface IAddBookRequest {
	title: string
	author: string
	description?: string
}

export interface IEditBookRequest extends IAddBookRequest {}
