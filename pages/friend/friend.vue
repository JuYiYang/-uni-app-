<template>
	<view class="">
		<view class="friendList" v-for="item in userList">
			<view class="left">
				<view class="header">
					<image :src="item?.header" mode=""></image>
				</view>
				<view class="userCt">
					<text class="nickname">{{ item?.username }}</text>
					<text class="msg"> 快去聊聊吧~ </text>
				</view>
			</view>
			<view class="sendMsg" @click="sendUser(item)">
				发送消息
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue'
	import {
		getFriendInfoReq
	} from '@/utils/api.js'
	import {
		onLoad,
	} from "@dcloudio/uni-app";
	import {
		useSocket
	} from '@/store/socket/index';
	import {
		Connect
	} from '@/socket/index.js'
	const userList = ref([])
	onLoad(async () => {
		let result = await getFriendInfoReq()
		userList.value = result.data
	})
	const sendUser = (item) => {
		uni.navigateTo({
			url: "/pages/chat/chat?data=" + encodeURIComponent(JSON.stringify(item)),
		})
	}
	// 建立连接
	const Socket = Connect()
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
