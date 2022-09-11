<template>
	<view class="userPage">
		<view class="userInfo">
			<image class="header" :src="userInfo?.header || defaultHeader" mode=""></image>
			<view class="userInfo-content">
				<text class="usename">Hello,{{ userInfo?.username }}</text>
				<text class="hello">欢迎来到233</text>
			</view>
			<view @click="editInfo">
				编辑信息
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		infoStore
	} from '@/store/index'
	import {
		onShow
	} from "@dcloudio/uni-app";
	import {
		ref
	} from 'vue'
	import {
		editUserInfo
	} from '@/utils/api.js'
	onShow(() => {
		userInfo.value = uni.getStorageSync('userInfo')
		if (!userInfo.value) {
			uni.navigateTo({
				url: '/pages/login/login/login/login'
			})
		}
	})
	const defaultHeader = ref(
		'https://ts1.cn.mm.bing.net/th?id=OIP-C.TQcBnO20xnfq0rGqNdZdJQAAAA&w=99&h=106&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
	)
	const userInfo = ref(null)
	const editInfo = () => {
		uni.showActionSheet({
			itemList: ['修改用户名'],
			success: async (res) => {
				const result = await editUserInfo({})
				console.log(result);
			},
			fail: function(res) {
				console.log(res.errMsg);
			}
		});
	}
</script>

<style lang="less" scoped>
	.userPage {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		padding: 20rpx;

		.userInfo {
			max-width: 100%;
			height: 112rpx;
			background-color: #6e8bb9;
			padding: 20rpx 30rpx;
			border-radius: 25rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.header {
				width: 118rpx;
				height: 118rpx;
				border-radius: 50%;
			}

			.userInfo-content {
				display: flex;
				align-items: flex-start;
				flex-direction: column;

				.username {
					font-weight: 800;
					font-size: 32rpx;
				}

				.hello {
					font-size: 22rpx;
				}

				// justify-content: flex-start;
			}
		}
	}
</style>
