import appConfig from '@/app.config'

class SocketC {
	Socket;
	constructor(params) {};
	// 连接
	connect() {
		console.log('Socket，正在连接 ----');
		Socket = wx.connectSocket({
			url: appConfig.CHAT_SOCKET_URL,
			header: {
				'content-type': 'application/json'
			},
			success(res) {
				console.log('socket,连接成功 ---- ');
			}
		})
	}
	// 重连
	reconnection() {
		this.Socket = null
		this.connect()
	}
	// 发送数据
	emitMsg(type, Value) {
		let data = {
			userId: uni.getStorageSync('userInfo').id,
			Value
		}
		let obj = JSON.stringify({
			type,
			data
		})
		this.Socket.send({
			data: obj
		})
	}
	close() {
		this.Socket.close()
		this.Socket = null
	}
}


let Socket = null

// export const init = () => {
// 	console.log(123123);
// 	if (Socket) return Socket

// 	return Socket
// }
// export const close = () => {
// 	if (!Socket) return

// }
// export const emitMsg = (type, v) => {
// 	if (!Socket) init()
// 	let data = {
// 		userId: uni.getStorageSync('userInfo').id,
// 		v
// 	}
// 	let obj = JSON.stringify({
// 		type,
// 		data
// 	})
// 	Socket.send({
// 		data: obj
// 	})
// }
