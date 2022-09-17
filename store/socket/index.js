import {
	defineStore
} from 'pinia';
import appConfig from '@/app.config'
export const useSocket = defineStore('Socket', {
	state: () => {
		return {
			Socket: null,
			OPEN: 0
		};
	},
	getters: {
		getSocket() {
			return this.Socket
		}
	},
	// 也可以这样定义
	actions: {
		// 连接Socket
		connect() {
			console.log('Socket，正在连接 ----');
			this.Socket = wx.connectSocket({
				url: appConfig.CHAT_SOCKET_URL,
				header: {
					'content-type': 'application/json'
				},
			})
			console.log(this.Socket);
			this.open()
		},
		open() {
			this.Socket.onOpen((res) => {
				this.OPEN = 1
			})
		},
		// 重连
		reconnection() {
			this.Socket = null
			this.connect()
		},
		// 发送数据
		emitMsg(type, Value) {
			console.log(this.Socket);
			// return
			let data = {
				userId: uni.getStorageSync('userInfo').id,
				Value
			}
			let obj = JSON.stringify({
				type,
				data
			})
			this.Socket.send({
				data: obj,
				success() {
					console.log('Socket' + type + '发送成功');
				},
				fail(err) {
					console.log(err);
					console.log('Socket' + type + '发送失败');
				}
			})
		},
		// 关闭
		close() {
			this.Socket.close()
			this.Socket = null
		}
	},
});
