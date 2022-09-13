import {
	infoStore
} from '@/store/index'

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
export const $userInfo = () => {
	const {
		UserInfo
	} = infoStore()
	const UserInfoStorage = uni.getStorageSync('userInfo')
	if (UserInfo) {
		return UserInfo
	} else if (UserInfoStorage) {
		return UserInfoStorage
	} else {
		return false
	}
}
