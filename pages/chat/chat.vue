<template>
	<view class="chat">
		<view class="chattingRecords">
			<template v-for="item in chattingRecords">
				<template v-if="item.sender_id !== userId">
					<view class="msg l">
						<view class="msgBox">
							<text class="txt">{{ exchangeEmoji(item.content) }}</text>
						</view>
					</view>
				</template>

				<template v-else>
					<view class="msg r">
						<view class="msgBox">
							<text class="txt">{{ exchangeEmoji(item.content) }}</text>
						</view>
					</view>
				</template>
			</template>
		</view>
		{{ emojiFlag }}
		<view class="sendMsg">
			<view class="ipt">
				<input type="text" :confirm-type="'12212'" v-model="msg">
			</view>
			<view class="selectEmoji">
				<span @click.stop.prevent="openEmojiSelect">😃</span>
				<view class="emojiS" v-show="emojiFlag">
					<use-emoji @emoji-click="emojiEmit" :emoji-style="{backgroundColor:'rgba(241,241,241,.7)'}">
					</use-emoji>
				</view>
			</view>
			<view class="sendBtn" :class="{ 'noTheFocus':msg=='','focusBox':msg !='' }" @click="sendMsg">
				发送
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		exchangeEmoji,
		exchangeCode
	} from '@/utils/emoji.js'
	import {
		ref,
		watch,
		toRefs,
		nextTick,
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
		console.log(msg.value);
		chattingRecords.value.push({
			sender_id: userId,
			receiver_id: firendData.value.id,
			content: exchangeCode(msg.value),
		})
		emitMsg('buttObjMsg', {
			sender_id: userId,
			receiver_id: firendData.value.id,
			content: exchangeCode(msg.value),
		})
		msg.value = ''
	}

	const scr = () => {
		nextTick(() => {
			uni.pageScrollTo({
				scrollTop: 99999999999,
				selector: '.chat',
			})
		})
	}

	watch(() => chattingRecords.value, (n, o) => {
		scr()
	}, {
		deep: true,
		immediate: true
	})

	uni.$on('SocketButtObjMsg', (data) => {
		chattingRecords.value.push(data)
	})
	// 表情处理部分
	let emojiFlag = ref(false)

	const openEmojiSelect = () => {
		emojiFlag.value = !emojiFlag.value
	}
	const emojiEmit = (e) => {
		msg.value = msg.value + e.ct
		emojiFlag.value = false
	}
	watch(() => msg.value, (n, o) => {
		console.log(n);
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
		min-height: 100vh;
		overflow-y: auto;
	}

	.chattingRecords {
		max-width: 100%;
		padding: 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		padding-bottom: 120rpx;
		// overflow-anchor: auto; // position: relative;
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

	.selectEmoji {
		width: 60rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		position: relative;

		.emojiS {
			position: absolute;
			bottom: 108rpx;
			right: -40rpx;
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
