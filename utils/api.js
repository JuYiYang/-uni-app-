import request from './request/request'
// 请求验证码
export const getVerifyCode = data => {
	return request({
		url: 'api/verifyCode',
		method: 'POST',
		data,
	}, false)
}
// 账号注册
export const registerReq = data => {
	return request({
		url: 'api/userRegister',
		method: 'POST',
		data,
	}, false)
}
// 登陆
export const loginReq = data => {
	return request({
		url: "api/login",
		method: "POST",
		data
	}, false)
}
// 获取用户信息
export const getUserInfoReq = params => {
	return request({
		url: "user/getMyInfo",
		method: "GET",
		params
	})
}
// 获取用户好友
export const getFriendInfoReq = params => {
	return request({
		url: "firend/getMyFriends",
		methods: "POST",
	})
}
// 修改用户信息
export const editUserInfoReq = data => {
	return request({
		url: "user/editMyInfo",
		method: "PUT",
		data
	})
}
// 获取用户聊天记录
export const getUserChats = data => {
	return request({
		url: "firend/getMyFriendsChats",
		method: "POST",
		data
	})
}
// 模糊查询指定用户
export const getAssignUser = data => {
	return request({
		url: "firend/getAssignUser",
		method: "POST",
		data
	})
}
// 获取用户好友申请
export const getUserFriendReq = params => {
	return request({
		url: "firend/queryFriend",
		method: "get",
		params
	})
}
// 同意or拒绝好友申请
export const changFriendsStatusReq = data => {
	return request({
		url: "firend/refusedAgree",
		method: "PUT",
		data
	})
}
