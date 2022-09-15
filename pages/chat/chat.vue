<template>
	<view class="">
		socket
		<button @click="fn">123123</button>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		init,
		emitMsg
	} from '@/socket/index.js'
	const socket = init()
	socket.onOpen((res) => {
		console.log('open----',res);
	})
	socket.onMessage(res => {
		const data = JSON.parse(res.data)
		console.log(data);
	})

	socket.onError(() => {
		console.log('---连接失败');
	})

	const fn = () => {
		emitMsg('lian', 'dsiojefijasioefjioaeswhjfio')
	}
</script>

<style lang="less" scoped>
</style>
