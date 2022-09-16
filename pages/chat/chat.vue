<template>
	<view class="">
		<button @click="close">退出连接</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		init,
		emitMsg,
		close
	} from '@/socket/index.js'
	onLoad((options) => {
		objId.value = options.id
		objCnt()
	})
	const objId = ref(null)

	const socket = init()

	const objCnt = () => {
		emitMsg('buttObj', {
			objId: objId.value
		})
	}

</script>

<style lang="less" scoped>
</style>
