<template>
	<view class="userPage">
		<view class="userInfo">
			<image class="header" :src="userInfo?.header || defaultHeader" mode=""></image>
			<view class="userInfo-content">
				<text class="usename">Hello,{{ userInfo?.username }}</text>
				<text class="hello">欢迎来到233</text>
			</view>
			<view @click="editInfoPop">
				编辑信息
			</view>
		</view>
	</view>
	<uni-popup ref="popup" type="dialog" :mask-click="false">
		<uni-popup-dialog title="修改用户名" placeholder="输入用户名" mode="input" @close="close" @confirm="editUserInfo"
			:duration="2000" :before-close="true">
		</uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import {
		infoStore
	} from '@/store/index'
	import {
		onShow,
		onPullDownRefresh
	} from "@dcloudio/uni-app";
	import {
		ref
	} from 'vue'
	import {
		editUserInfoReq,
	} from '@/utils/api.js'
	onShow(() => {
		userInfo.value = uni.getStorageSync('userInfo')
		if (!userInfo.value) {
			uni.navigateTo({
				url: '/pages/login/login/login/login'
			})
		}
	})
	onPullDownRefresh(async () => {
		userInfo.value = await userInfoReq()
		uni.stopPullDownRefresh()
	})
	const defaultHeader = ref(
		'https://7072-prod-2gu6i5oga6c1929f-1308944974.tcb.qcloud.la/QQ%E5%9B%BE%E7%89%8720220721143007.png?sign=d8e6b943349a204a9fc71df597c0bd75&t=1662911010'
	)
	const popup = ref(null)
	const userInfo = ref(null)
	const {
		userInfoReq
	} = infoStore()
	const editInfoPop = () => {
		uni.showActionSheet({
			itemList: ['修改用户名'],
			success: async (res) => {
				popup.value.open()
			},
			fail: function(res) {
				console.log(res.errMsg);
			}
		});
	}
	const editUserInfo = async (e) => {
		let obj = JSON.parse(JSON.stringify(userInfo.value))
		for (let k in obj) {
			if (!obj[k]) delete obj[k]
		}
		const result = await editUserInfoReq({
			...obj,
			username: e
		})
		if (result.status != 0) {
			uni.showToast({
				icon: 'none',
				title: result.message,
				duration: 2000,
			})
		}
		userInfo.value.username = e
		close()
	}
	const close = () => {

		popup.value.close()
	}
</script>

<style lang="less" scoped>
	// .editUserName {
	// 	width: 200rx;
	// 	height: 100rpx;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	padding: 40rpx 20rpx;
	// 	background-color: #FFFFFF;
	// }

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
