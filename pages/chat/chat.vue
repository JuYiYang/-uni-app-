<template>
	<view class="chat">
		<view class="chattingRecords">
			<template v-for="item in chattingRecords">
				<template v-if="item.sender_id !== userId">
					<view class="msg l">
						<view class="msgBox">
							<text class="txt">{{ item.content }}</text>
						</view>
					</view>
				</template>

				<template v-else>
					<view class="msg r">
						<view class="msgBox">
							<text class="txt">{{ item.content }}</text>
						</view>
					</view>
				</template>
			</template>
		</view>
		<view class="sendMsg">
			<view class="ipt">
				<input type="text" :confirm-type="'12212'" :adjust-position="false" v-model="msg">
			</view>
			<view class="sendBtn" :class="{ 'noTheFocus':msg=='','focusBox':msg !='' }" @click="sendMsg">
				发送
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch,
		toRefs
	} from 'vue'
	import {
		onLoad,
		onReady
	} from "@dcloudio/uni-app";
	import {
		useSocket
	} from '@/store/socket/index';
	import {
		emitMsg
	} from '@/socket/index.js'
	import {
		getUserChats
	} from '@/utils/api.js'
	onLoad((options) => {
		firendData.value = JSON.parse(decodeURIComponent(options.data))
		uni.setNavigationBarTitle({
			title: firendData.value.username
		})
		emitMsg('buttObj', {
			target: firendData.value.id
		})
		getChats()
	})
	// 发送对象
	let firendData = ref(null)
	// 聊天记录
	let chattingRecords = ref([])
	// 当前发送的消息
	let chatting = ref({})
	// 查询
	const getChats = async () => {
		const result = await getUserChats({
			receiver_id: firendData.value.id
		})
		chattingRecords.value = [...result.data, ...chattingRecords.value]
	}
	const userId = uni.getStorageSync('userInfo').id

	let msg = ref('')

	const sendMsg = () => {
		chattingRecords.value.push({
			sender_id: userId,
			receiver_id: firendData.value.id,
			content: msg.value,
		})
		emitMsg('buttObjMsg', {
			receiver_id: firendData.value.id,
			content: msg.value,
		})
		msg.value = ''
	}
	uni.$on('SocketButtObjMsg', (data) => {
		chattingRecords.value.push(data)
	})
</script>

<style lang="less" scoped>
	.focusBox {
		background-color: rgb(1, 153, 253);
	}

	.noTheFocus {
		background-color: rgb(117, 195, 245);
	}

	.chat {
		background-color: rgb(241, 241, 241);
		height: 100vh;
	}

	.chattingRecords {
		max-width: 100%;
		padding: 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding-bottom: 88rpx;
		overflow-y: auto;
		overflow-anchor: auto; // position: relative;
	}

	.msgBox {
		padding: 10rpx 20rpx;
		border-radius: 25rpx;
		// min-width: 147rpx;
		max-width: 247rpx;
		height: auto;

		.txt {
			word-wrap: break-all;
		}
	}

	.msg {
		margin: 10rpx;
		width: 100%;
		display: flex;
	}

	.r {
		justify-content: flex-end;

		.msgBox {
			background-color: rgb(1, 153, 255);
			color: rgb(245, 245, 245);
		}
	}

	.l {
		justify-content: flex-start;

		.msgBox {
			background-color: rgb(245, 245, 245);
			color: #3a3a3a;
		}
	}

	.sendMsg {
		margin-bottom: 20rpx;
		max-width: 100%;
		min-width: 100%;
		height: 88rpx;
		position: fixed;
		bottom: 10rpx;
		// background-color: white !important; //
		display: flex;
		align-items: center;

		.ipt {
			width: 80%;
			height: 100%;
			background-color: #FFF;
			border-radius: 25rpx;
			display: flex;
			align-items: center;
			padding: 0rpx 30rpx;

			input {
				width: 100%;
				border: 0rpx;
			}
		}

		.sendBtn {
			border-radius: 25rpx;
			width: 20%;
			height: 100%;
			color: white;
			// background-color: antiquewhite;
			font-size: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
