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
let reconnectionStep = 12
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
			console.log(appConfig.CHAT_SOCKET_URL+'fail');
		}
	})
	open()
}

function open() {
	Socket.onOpen((res) => {
		emitMsg('connect', {})
		acCode = 1
		console.log('连接成功');
	})
	// jia
	monitor()
}

function reconnection() {
	// time = setInterval(() => {
	// 	atpPesentStep += 1
	// 	if (acCode == 1 || (atpPesentStep >= reconnectionStep)) {
	// 		clearInterval(time)
	// 		if (atpPesentStep => reconnectionStep) {
	// 			$msg('心跳已超时，现在处于离线状态' + atpPesentStep)
	// 		}
	// 		atpPesentStep = 0
	// 		return
	// 	}
	// 	console.log('重连中----');
	atpPesentStep += 1
	Connect()
	// }, waitingTime)
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
		if (atpPesentStep == 0) acCode = 0
		if (acCode == 1 || (atpPesentStep >= reconnectionStep)) {

			if (idx => reconnectionStep) {

				$msg('心跳已超时，现在处于离线状态' + atpPesentStep)
				atpPesentStep = 0
				return
			}
		}
		reconnection()
		console.log('Socket已关闭 --');
	})
	Socket.onError(() => {
		acCode = 0
		console.log('Socket发生错误 --');
	})
}
