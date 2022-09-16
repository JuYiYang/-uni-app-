import appConfig from '@/app.config'


let Socket = null

export const init = () => {
	console.log(123123);
	if (Socket) return Socket
	Socket = wx.connectSocket({
		url: appConfig.CHAT_SOCKET_URL,
		header: {
			'content-type': 'application/json'
		},
	})
	return Socket
}
export const close = () => {
	if (!Socket) return
	Socket.close()
	Socket = null
}
export const emitMsg = (type, v) => {
	if (!Socket) init()
	let data = {
		userId: uni.getStorageSync('userInfo').id,
		v
	}
	let obj = JSON.stringify({
		type,
		data
	})
	Socket.send({
		data: obj
	})
}
