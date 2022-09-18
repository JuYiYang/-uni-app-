<template>
	<view class="">
		<view class="chattingRecords">
			<view class="left" v-for="item in chattingRecords">
				{{ item }}
			</view>
		</view>
		<input type="text" v-model="msg"><button @click="sendMsg">发送消息</button>
		<button @click="close">退出连接</button>
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
	onLoad((options) => {
		firendData.value = JSON.parse(decodeURIComponent(options.data))
		uni.setNavigationBarTitle({
			title: firendData.value.username
		})
		Socket.emitMsg('buttObj', {
			target: firendData.value.id
		})
		// wx.onSocketMessage(res => {
		// 	chatting.value = JSON.parse(res.data)
		// 	chattingRecords.value.push(chatting.value)
		// })
	})
	onReady(() => {
		Socket.Socket.onMessage(res => {
			const data = JSON.parse(res.data)
			if (data.type == 'buttTakeObjMsg') {
				chatting.value = data
				chattingRecords.value.push(chatting.value)
				console.log(chatting.value.type);
			}
		})
	})
	let firendData = ref(null)
	// 聊天记录
	let chattingRecords = ref([])
	// 当前接收的消息
	let chatting = ref({})

	const Socket = useSocket()
	let msg = ref(null)
	const sendMsg = () => {
		Socket.emitMsg('buttObjMsg', {
			receiver_id: firendData.value.id,
			content: msg.value,
		})
	}
</script>

<style lang="less" scoped>
</style>
