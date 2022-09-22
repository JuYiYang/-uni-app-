import request from './request/request'

export const getVerifyCode = data => {
	return request({
		url: 'api/verifyCode',
		method: 'POST',
		data,
	}, false)
}
export const registerReq = data => {
	return request({
		url: 'api/userRegister',
		method: 'POST',
		data,
	}, false)
}
export const loginReq = data => {
	return request({
		url: "api/login",
		method: "POST",
		data
	}, false)
}
export const getUserInfoReq = params => {
	return request({
		url: "user/getMyInfo",
		method: "GET",
		params
	})
}
export const getFriendInfoReq = params => {
	return request({
		url: "firend/getMyFriends",
		methods: "POST",
	})
}
export const editUserInfoReq = data => {
	return request({
		url: "user/editMyInfo",
		method: "PUT",
		data
	})
}
export const getUserChats = data => {
	return request({
		url: "firend/getMyFriendsChats",
		method: "POST",
		data
	})
}
export const getAssignUser = data => {
	return request({
		url: "firend/getAssignUser",
		method: "POST",
		data
	})
}
