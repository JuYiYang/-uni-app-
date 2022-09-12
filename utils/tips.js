export const $msg = (title, duration = 1500, icon = 'none', mask = "false") => {
	uni.showToast({
		title,
		duration,
		icon,
		mask
	})
}
