const iconList = {
	plus: 'fa-solid fa-plus',
} as const

export type IconList = keyof typeof iconList

export enum LocalList {
	en,
	zh_tw,
}
