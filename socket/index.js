import appConfig from '@/app.config'
// class Socket {
// 	private living;

// 	private constructor(params) {
// 		this.init()
// 	}
// 	// 连接 判断已有连接 
// 	static whetherSocket() {
// 		if (!Socket.living) {
// 			Socket.living = new Socket()
// 		}
// 		return Socket.living
// 	}

// 	static whetherFn(fnStr) {
// 		switch (fnStr) {
// 			case 'connect':
// 				break;
// 		}
// 	}
// 	private createSocket() {
// 		const socket = wx.connectSocket({
// 			url: 'ws://192.168.31.247:3000',
// 			header: {
// 				'content-type': 'application/json'
// 			},
// 		})
// 	}
// 	private emitFn(type, data) {
// 		let obj = {
// 			type,
// 			data
// 		}
// 	}
// 	private init() {
// 		this.createSocket()
// 	}
// }
let Socket = null
console.log(appConfig.CHAT_SOCKET_URL);
export const init = () => {
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
}
export const emitMsg = (type, data) => {
	if (!Socket) init()
	let obj = JSON.stringify({
		type,
		data
	})
	Socket.send({
		data: obj
	})
}
