<template>
	<view class="release">
		<text class="alongWith">一起拉</text>
		<text class="second">不同的时空，同样的事情</text>
		<view class="connect">
			<image :src="userInfo?.cloudHeader" class="avatar" mode="aspectFit"></image>
			<image src="https://wimg.588ku.com/gif620/21/08/09/c8440e99553a0444e12c843fd0ada213.gif" class="ecg"
				mode=""></image>
			<image src="../../../static/avatr.png" class="avatar" mode=""></image>
		</view>
		<view class="btn hollowOut">
			跟我一起拉屎
		</view>
		<view class="btn solid">
			随缘跟人拉屎
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		$userInfo
	} from '@/utils/tips.js'

	import {
		onShow,
	} from "@dcloudio/uni-app";
	onShow(() => {
		userInfo.value = $userInfo()
	})
	const userInfo = ref($userInfo())
</script>

<style lang="less" scoped>
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 88rpx;
		border-radius: 48rpx;
	}

	.solid {
		color: white;
		background-image: linear-gradient(to right, rgb(71, 160, 242), rgb(96, 198, 239), );
	}

	.hollowOut {
		margin-bottom: 60rpx;
		border: 1rpx solid rgb(71, 160, 242);
		color: rgb(71, 160, 242);
	}

	.connect {
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.ecg {
			width: 200rpx;
			height: 100rpx;
		}

		.avatar {
			width: 128rpx;
			height: 128rpx;
			overflow: hidden;
			border-radius: 50%;
		}
	}

	#canvas {
		width: 300px;
		height: 90px;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		position: absolute;
	}

	.release {
		height: 100vh;
		background-color: rgb(32, 32, 32);
		display: flex;
		flex-direction: column;
		// justify-content: center;
		align-items: center;
		padding: 40rpx 80rpx;

		.alongWith {
			font-size: 32rpx;
			color: white;
		}

		.second {
			color: rgb(92, 92, 92);
			font-size: 26rpx;
		}
	}
</style>
