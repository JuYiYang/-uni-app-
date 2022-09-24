<template>
	<view class="emoji" :style="styleObj">
		<template v-for="item in emojis">
			<span class="emojiSpan" @click="clickEmoji(item)">{{ item.ct }}</span>
		</template>
	</view>
</template>

<script setup>
	import emojis from '@/utils/emoji.js'
	import {
		defineEmits,
		ref
	} from 'vue'
	const props = defineProps({
		emojiStyle: {
			type: Object,
			default: () => {
				return {}
			}
		}
	})
	const defaultStyle = ref({
		width: "400rpx",
		maxHeight: "400rpx",
		overflowY: "auto"
	})

	let styleObj = ref({
		...defaultStyle.value,
		...props.emojiStyle
	})
	const emits = defineEmits(['emojiClick'])
	const clickEmoji = (item) => {
		emits('emojiClick', item)
	}
</script>

<style lang="less">
	.emoji {
		display: flex;
		flex-wrap: wrap;

		.emojiSpan {
			font-size: 38rpx;
		}
	}
</style>
