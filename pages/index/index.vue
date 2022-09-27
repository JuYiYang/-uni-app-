<template>
	<view class="index">
		<view class="searchBar" :style="{
			'height':styleRsult.searchBarHeight,
			'top':styleRsult.searchBarTop
		}">
			<!-- 			<nut-searchbar v-model="searchValue" placeholder="快来搜索关于你的留言吧！">
				<template v-slot:leftin>
					<nut-icon size="14" name="search2"></nut-icon>
				</template>
			</nut-searchbar> -->
			<uni-search-bar :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<view class="swiper" :style="{'marginTop':styleRsult.swiperMarginTop}">
			<!-- 			<nut-swiper :init-page="list.length" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
				<nut-swiper-item v-for="(item, index) in list" :key="item" @click="showPreview(index)">
					<image :src="item" />
				</nut-swiper-item>
			</nut-swiper> -->
		</view>
	</view>
	<view class="boxTitle">
		<view>精选留言</view>
	</view>
	<view class="main">
		<template v-for="(item, index) in articleList" :key="index">
			<view class="main_box" :class="{ dark: bgcCom(index) }">
				<view class="userInfo">
					<!-- <nut-avatar size="small"
						icon="https://ts1.cn.mm.bing.net/th?id=OIP-C.kRklM9DmpC8zqSI4_Bq9mAHaHa&w=204&h=204&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2">
					</nut-avatar> -->
					<text>userInfo</text>
				</view>
				<view class="articleContent">

					<span v-html="item.ct"></span>
					<!-- 新型农民工进京打工！新型农民工进京打工！ -->
					<!-- {{ styleRsult }} -->
					123 新型农民工进京打工！新型农民工进京打工！
				</view>
				<view class="articleFooter">
					<i class="iconfont iconfont icon-clearfnicon"></i>
					<i class="iconfont icon-clearfnpinglun"></i>
					<i class="iconfont icon-clearfnfenxiang"></i>
				</view>
			</view>
		</template>
	</view>
	<view class="notLogin" v-if="!token">
		<view class="box">
			<text>你还未登陆</text>
			<navigator url="/pages/login/login/login/login" class="gotologin">
				去登陆
			</navigator>
		</view>
	</view>
</template>

<script setup>
	import a from '@/utils/emoji.js'
	import {
		reactive,
		toRefs,
		computed,
		ref
	} from "vue";
	import {
		pageInfoStore
	} from '@/store/index';
	import {
		onShow,
	} from "@dcloudio/uni-app";
	onShow(() => {
		token.value = uni.getStorageSync('token')
	})
	const token = ref('')
	// 拿到页面胶囊信息
	const {
		menuStyle
	} = pageInfoStore();
	// 设置css变量
	const styleRsult = computed(() => {
		const searchBarTop = menuStyle.top * 2;
		const searchBarHeight = menuStyle.height * 2;
		const swiperMarginTop = searchBarTop + searchBarHeight + 10;
		return {
			searchBarTop: searchBarTop + "rpx",
			searchBarHeight: searchBarHeight + "rpx",
			swiperMarginTop: swiperMarginTop + "rpx",
		};
	});
	// 设置 背景色
	const bgcCom = (index) => {
		let stepOne = index % 4 % 3; // 藏龙给我写的高级算法 (index % 4 ^ 3) % 3
		return stepOne;
	};
	// 搜索值
	const searchValue = reactive("");
	// 图片列表
	const list = reactive([
		"https://www.dootask.com/uploads/chat/202208/3170/4a92562e85facce5cf622f3c04c4795d.jpg_thumb.jpg",
	]);
	// 假文章
	const articleList = reactive(
		new Array(5).fill().map((v, i) => {
			return {
				name: "XXX" + i,
				ct: a[i],
				price: i,
				category: Math.random() > 0.5 ? "蔬菜" : "水果",
			};
		})
	);
	// 页面滚动事件
	const onPageScrol = (e) => {
		console.log(e);
	}
	const red = reactive('red')
</script>

<style lang="scss">
	.notLogin {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 88rpx;
		background-color: #586e92;
		line-height: 88rpx;
		color: antiquewhite;

		.box {
			padding: 0rpx 40rpx;
			max-width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.gotologin {
				border-radius: 25rpx;
				width: 140rpx;
				height: 80rpx;
				// background-color: red;
			}
		}
	}

	.dark {
		background-color: #6e8bb9 !important;
	}

	.line {
		background-color: #c3d9f8;
	}

	.index {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	.searchBar {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		z-index: 999;
		width: 100%;
		height: 300px;
		// background-color: v-bind(red);
		// height: v-bind("styleRsult.searchBarHeight");
		height: 0rpx;
		position: fixed;
		// top: v-bind("styleRsult.searchBarTop");
		top: 0rpx;
		left: 0rpx;

		.nut-searchbar {
			background-color: transparent;
			padding-left: 20rpx;

			.nut-searchbar__search-input {
				background-color: rgb(240, 239, 244);
			}
		}
	}

	.swiper {
		padding: 0rpx 20rpx;
		// margin-top: v-bind("styleRsult.swiperMarginTop");
		margin-top: 0rpx;
		margin-bottom: 20rpx;
	}

	.nut-swiper {
		border-radius: 35rpx;
	}

	.nut-swiper-item {
		image {
			min-width: 100%;
			min-height: 100%;
		}
	}

	.boxTitle {
		padding: 0rpx 45rpx;
		// width: 100%;
		height: 80rpx;

		view {
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 80rpx;
			border-radius: 50rpx;
			background-color: #586e92;
			font-weight: 800;
			font-size: 32rpx;
			color: #ffffff;
		}
	}

	.nut-imagepreview {
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0px;
	}

	.main {
		max-width: 100%;
		padding: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		.main_box {
			margin: 10rpx 0rpx;
			width: 48%;
			border-radius: 25rpx;
			padding: 20rpx 0rpx;
			box-sizing: border-box;
			background-color: #c3d9f8;

			.userInfo {
				width: 100%;
				height: 64rpx;
				padding-left: 10rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				text {
					font-weight: 600;
					margin-left: 10rpx;
					color: #ffffff;
				}
			}

			.articleContent {
				max-width: 100%;
				padding: 10rpx;
				color: #ffffff;
				font-size: 26rpx;
			}
		}
	}

	.articleFooter {
		// height: 64rpx;
		padding: 10rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		i {
			margin-right: 20rpx;
		}

		.nut-icon {
			margin-left: 20rpx;
		}
	}
</style>
