<template>
	<view class="userPage">
		<view class="userInfo">
			<image class="header" src="/static/yao (10).jpg" mode=""></image>
			<view class="userInfo-content">
				<text class="usename">Hello,深情小狗4号</text>
				<text class="hello">欢迎来到树洞~</text>
			</view>
			<view>
				2333
			</view>
		</view>
	</view>
</template>

<script setup lang="ts"></script>

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
