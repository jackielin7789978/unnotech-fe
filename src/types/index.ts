const iconList = {
	plus: 'fa-solid fa-plus',
	back: 'fa-solid fa-chevron-left',
} as const

export type IconList = keyof typeof iconList
