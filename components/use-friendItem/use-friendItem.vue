<template>
	<template v-for="item in  data">
		<view class="box">
			<view class="left">
				<image :src="item.header" mode=""></image>
				<view class="user">
					<text>{{ item.username }}</text>
				</view>
			</view>
			<view class="right">
				<slot name="right" :scope="item">
					<view class="btn">查看</view>
				</slot>
			</view>
		</view>
	</template>
</template>

<script setup>
	const props = defineProps({
		data: Array
	})
</script>

<style lang="less" scoped>
	.box {
		border-radius: 20rpx;
		padding: 10rpx 20rpx;
		max-width: 100%;
		height: 128rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.left {
		display: flex;
		align-items: center;

		image {
			border-radius: 50%;
			width: 88rpx;
			height: 88rpx;
			overflow: hidden;
		}

		.user {
			color: #3a3a3a;
			margin-left: 40rpx;
		}
	}

	.right {
		.btn {
			width: 128rpx;
			height: 68rpx;
			color: #ffffff;
			background-color: rgb(35, 149, 205);
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
