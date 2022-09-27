<template>
	<view class="empty">
		<image src="https://www.cleartfn.top/static/images/emptyPic.png" mode=""></image>
		<text class="txt">{{ text }}</text>
	</view>
</template>

<script setup lang=ts>
	// const Props = defineProps({
	// 	text: {
	// 		type: String,
	// 		dafult: "暂无数据~"
	// 	}
	// })
	interface Props {
		text: string
	}

	const {
		text
	} = withDefaults(defineProps < Props > (), {
		text: '暂无数据~'
	})
	console.log(text);
</script>

<style lang="less">
	.empty {
		width: 100%;
		height: 70vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		image {
			width: 88rpx;
			height: 88rpx;
		}

		.txt {
			margin-top: 40rpx;
			display: inline-block;
			color: gray;
		}
	}
</style>
