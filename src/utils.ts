export const sliceText = (title: string, maxLength: number): string => {
	if (title.length > maxLength) {
		return title.slice(0, maxLength) + '...'
	}
	return title
}
