<template>
	<view class="">
		<view class="search">
			<uni-search-bar v-model="query" placeholder="根据邮箱或者用户名查找"></uni-search-bar>
		</view>
		<template v-if="friends.length != 0">
			<view class="friendList" v-for="item in friends">
				<view class="left">
					<view class="header">
						<image :src="item.header" mode=""></image>
					</view>
					<view class="userCt">
						<text class="nickname">{{ item.username }}</text>
						<text class="msg"> 快去聊聊吧~ </text>
					</view>
				</view>
				<view class="sendMsg" @click="addUser(item.id)">
					添加
				</view>
			</view>
		</template>
		<template v-else>
			<use-empty text="这个星球找不到这个人"></use-empty>
		</template>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue'
	import {
		onLoad,
		onPullDownRefresh
	} from "@dcloudio/uni-app";
	import {
		getAssignUser
	} from '@/utils/api.js'
	onLoad(() => {
		serachReq('')
	})
	let query = ref('')
	let friends = ref([])
	onPullDownRefresh(async () => {
		await serachReq(query.value)
		uni.stopPullDownRefresh()
	})
	watch(query, (n) => {
		serachReq(n)
	})
	const clear = () => {
		query.value = ''
	}
	const serachReq = async (query) => {
		const result = await getAssignUser({
			query
		});
		friends.value = result.data
	}
	const addUser = async (id) => {
		console.log(id);
	}
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
			width: 148rpx;
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
