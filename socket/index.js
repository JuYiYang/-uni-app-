import appConfig from '@/app.config'
import {
	$msg
} from '@/utils/tips.js'
// Socket
let Socket = null
// 重连
let time = null

//  当前userId
let userId = uni.getStorageSync('userInfo').id

// 重连次数
let reconnectionStep = 5
// 当前重连
let atpPesentStep = 0
// 心跳时间 ms
let waitingTime = 6000

// 当前Socket状态 1 已经链接 0// 未连接
let acCode = 0

export const Connect = () => {
	console.log('Socket，正在连接中 ----');
	Socket = null
	Socket = wx.connectSocket({
		url: appConfig.CHAT_SOCKET_URL,
		header: {
			'content-type': 'application/json'
		},
		fail() {
			console.log(appConfig.CHAT_SOCKET_URL + 'fail');
		}
	})
	open()
}

function open() {
	Socket.onOpen((res) => {
		emitMsg('connect', {})
		acCode = 0
		clearInterval(time)
		console.log('连接成功');
	})

	monitor()
}

export function reconnection() {
	time = setInterval(() => {
		if (acCode == 0 || atpPesentStep >= reconnectionStep) {
			clearInterval(time)
			if (atpPesentStep >= reconnectionStep) {
				console.log('心跳已超时，现在处于离线状态' + atpPesentStep)
			}
			atpPesentStep = 0
			return
		}
		console.log(atpPesentStep);
		atpPesentStep += 1
		Connect()
	}, 5000)
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
					console.log('收到消息')
					uni.$emit('SocketButtObjMsg', val.data)
					break;
				default:
					console.log(val.type)

			}
		} catch (err) {
			console.log('try 捕获到错误', err);
		}
	})
	Socket.onClose((e) => {
		if (acCode != 1) {
			acCode = 1
			reconnection()
		}
		console.log('Socket已关闭 --', e);
	})
	Socket.onError(() => {
		console.log('Socket发生错误 --');
	})
}
