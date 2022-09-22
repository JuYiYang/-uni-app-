<template>
	<view class="friend">
		<view class="topBox" @click="addFriend">
			添加新朋友
		</view>
		<template v-if="!flag">
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
		</template>
		<template v-else>
			<use-empty></use-empty>
		</template>
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
		onPullDownRefresh
	} from "@dcloudio/uni-app";
	import {
		useSocket
	} from '@/store/socket/index';
	import {
		Connect
	} from '@/socket/index.js'
	import {
		$msg
	} from '@/utils/tips.js'

	const userList = ref([])

	let flag = ref(false)
	const req = async () => {
		try {
			let result = await getFriendInfoReq()
			userList.value = result.data
		} catch {
			flag.value = true
			$msg('请求发送错误')
		} finally {
			uni.stopPullDownRefresh()
		}
	}
	onLoad(async () => {
		req()
	})
	onPullDownRefresh(async () => {
		req()
	})
	const sendUser = (item) => {
		uni.navigateTo({
			url: "/pages/chat/chat?data=" + encodeURIComponent(JSON.stringify(item)),
		})
	}
	const addFriend = () => {
		uni.navigateTo({
			url: "/pages/friend/addFriends/addFriends",
		})
		$msg('懒，不想做~')
	}
	// 建立连接
	const Socket = Connect()
</script>

<style lang="less" scoped>
	.friend {
		background-color: rgb(244, 244, 244);
		height: 100vh;
	}

	.friendList {
		background-color: rgb(255, 255, 255);
		margin: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 128rpx;
		padding: 2rpx 20rpx;
		// border: 1rpx solid rgb(36, 202, 254);

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

	.topBox {
		max-width: 100%;
		height: 88rpx;
		display: flex;
		margin: 10rpx 0rpx;
		justify-content: flex-start;
		align-items: center;
		padding: 0rpx 40rpx;
		color: rgb(66, 70, 76);
		background-color: rgb(255, 255, 255);
	}
</style>
