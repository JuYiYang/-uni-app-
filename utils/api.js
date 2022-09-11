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
export const editUserInfoReq = data => {
	return request({
		url: "user/editMyInfo",
		method: "PUT",
		data
	})
}
