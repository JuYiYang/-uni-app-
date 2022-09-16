<template>
	<view class="">
		<view class="friendList" v-for="item in userList">
			<view class="left">
				<view class="header">
					<image :src="item.cloudHeader" mode=""></image>
				</view>
				<view class="userCt">
					<text class="nickname">{{ item.username }}</text>
					<text class="msg"> 快去聊聊吧~ </text>
				</view>
			</view>
			<view class="sendMsg" @click="sendUser(item.id)">
				发送消息
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		getFriendInfoReq
	} from '@/utils/api.js'
	import {
		onShow,
	} from "@dcloudio/uni-app";
	import {
		init,
		emitMsg,
		close,
	} from '@/socket/index.js'
	const userList = ref([])
	onShow(async () => {
		let result = await getFriendInfoReq('0000000005')
		userList.value.push(result.data)
	})
	const sendUser = (id) => {
		uni.navigateTo({
			url: "/pages/chat/chat?id=" + id
		})
	}
	let socket = init()
	socket.onOpen((res) => {
		emitMsg('connect', '')
	})
	socket.onMessage(res => {
		const data = JSON.parse(res.data)
		console.log(data);
	})
	socket.onClose((e) => {
		close()
		init()
	})
</script>

<style lang="less" scoped>
	.friendList {
		margin: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 128rpx;
		padding: 2rpx 20rpx;
		border: 1rpx solid rgb(36, 202, 254);

		.left {
			display: flex;
			align-items: center;
			// justify-content: ;
		}

		.header {
			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}

			overflow: hidden;
			width: 88rpx;
			height: 88rpx;
		}

		.userCt {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-left: 30rpx;

			.nickname {
				font-size: 28rpx;
				color: #3a3a3a;
				font-weight: 700;
			}

			.msg {
				font-size: 24rpx;
				color: antiquewhite;
			}
		}

		.sendMsg {
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			width: 168rpx;
			height: 68rpx;
			border-radius: 10rpx;
			background-color: rgb(36, 202, 254);
		}
	}
</style>
