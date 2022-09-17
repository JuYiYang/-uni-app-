<template>
	<view class="">
		<input type="text" v-model="msg"><button @click="sendMsg">发送消息</button>
		<button @click="close">退出连接</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
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
	})
	let firendData = ref(null)
	const Socket = useSocket()
	const msg = ref(null)
	const sendMsg = () => {
		Socket.emitMsg('buttObjMsg', {
			targetId: firendData.value.id,
			msg: msg.value,
		})
	}
</script>

<style lang="less" scoped>
</style>
