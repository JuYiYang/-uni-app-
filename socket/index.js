import appConfig from '@/app.config'

// Socket
let Socket = null
// 重连
let time = null

//  当前userId
let userId = uni.getStorageSync('userInfo').id

export const Connect = () => {
	Socket = null
	console.log('Socket，正在连接中 ----');
	Socket = wx.connectSocket({
		url: appConfig.CHAT_SOCKET_URL,
		header: {
			'content-type': 'application/json'
		},
		fail() {
			Socket = null
		}
	})
	open()
}

function open() {
	Socket.onOpen((res) => {
		emitMsg('connect', {})
		console.log('连接成功');
	})
	// jia
	monitor()
}

function reconnection() {
	if (Socket) {
		clearInterval(time)
		return
	}
	time = setInterval(() => {
		console.log('Socket，正在重连 ----');
		connect()
	}, 7000)
}
// 发送数据
export function emitMsg(type, Value) {
	let data = {
		sender_id: userId,
		Value,
	}
	let obj = JSON.stringify({
		type,
		data
	})
	Socket.send({
		data: obj,
		success() {
			console.log('Socket---' + type + '--发送成功');
		},
		fail(err) {
			console.log(err);
			console.log('Socket--' + type + '--发送失败');
		}
	})
}
// 关闭
function close() {
	Socket.close()
	Socket = null
}

function monitor() {
	Socket.onMessage(({
		data
	}) => {
		try {
			const val = JSON.parse(data)
			console.log(val.type);
			switch (val.type) {
				case 'buttObjMsgServe':
					uni.$emit('SocketButtObjMsg', val.data)
					break;
				default:
					console.log(val.type)

			}
		} catch (err) {
			console.log('try 捕获到错误', err);
		}
	})
	Socket.onClose(() => {
		console.log('Socket已关闭 --');
	})
	Socket.onError(() => {
		console.log('Socket发生错误 --');
	})
}
