export const $msg = (title, duration = 1500, icon = 'none', mask = "false") => {
	uni.showToast({
		title,
		duration,
		icon,
		mask
	})
}
export const $previewImg = (urls, current, longPressActions = true) => {
	uni.previewImage({
		urls,
		current,
		longPressActions,
	})
}
