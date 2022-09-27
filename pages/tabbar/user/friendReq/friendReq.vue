<template>
	<view class="">
		<template v-show="data.length">
			<use-friendItem :data="data">
				<template #right="{scope}">
					<view class="box">
						<view class="btn" @click="changStatus(scope,1)">同意</view>
						<view class="btn" @click="changStatus(scope,2)" style="background-color: #F56C6C;">
							拒绝
						</view>
					</view>
				</template>
			</use-friendItem>
		</template>
		<template v-show="!data.length">
			<use-empty text="暂时没有好友申请"></use-empty>
		</template>
	</view>
</template>

<script setup>
	import {
		onLoad,
	} from "@dcloudio/uni-app";
	import {
		ref
	} from 'vue'
	import {
		getUserFriendReq,
		changFriendsStatusReq
	} from '@/utils/api.js'
	import {
		$msg
	} from '@/utils/tips.js'
	onLoad(() => {
		getUserFriend()
	})
	const data = ref([])
	// 获取好友申请
	const getUserFriend = async () => {
		try {
			const result = await getUserFriendReq()
			data.value = result.data.rows
		} catch (err) {
			$msg(err)
		}
	}
	// 同意or拒绝
	const changStatus = async (item, status) => {
		try {
			const result = await changFriendsStatusReq({
				sourceId: item.id,
				status: status * 1
			})
			getUserFriend()
		} catch (err) {
			$msg(err)
		}
	}
</script>

<style lang="less" scoped>
	.box {
		width: 256rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.btn {
		width: 118rpx;
		height: 68rpx;
		color: #ffffff;
		background-color: rgb(123, 191, 251);
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 68rpx;
		font-size: 28rpx;
	}
</style>
