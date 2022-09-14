<template>
	<view class="">
		socket
	</view>
</template>

<script setup>
const socket = 	wx.connectSocket({
		url: 'ws://192.168.31.247:3001',
		header: {
			'content-type': 'application/json'
		},
	})
	// 监听
	wx.onSocketOpen((result) => {
		wx.sendSocketMessage({
			data: {
				type:'JSON',
				data:{
					a:12134
				}
			}
		})
	})
	// 失败监控
	wx.onSocketError((result) => {
		console.log("websocket连接失败", result);
	})
	// 监听服务器的数据返回
	wx.onSocketMessage((result) => {
		console.log("服务器的数据返回", result);
	})
</script>

<style lang="less" scoped>
</style>
