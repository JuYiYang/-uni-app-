<template>
	<view class="release">
		<view class="imgs">
			<template v-for="item in imgs">
				<view class="cacheImg">
					<image :src="item.cacheUrl" mode=""></image>
				</view>
			</template>
			<view class="uploadImg">
				<uni-icons type="upload" @click="submit" size="30" color="#6e8bb9"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue'
	wx.cloud.init()
	let imgs = ref([])
	const submit = async () => {
		await uni.chooseImage({
			count: 1,
			async success(res) {
				console.log(res);
				let fileName = res.tempFiles[0].path.split('.')[0].substring(11)
				imgs.value.push({
					cacheUrl: res.tempFilePaths[0],
					fileName,
				})
				uploadFile(res.tempFilePaths[0], fileName, () => {})
			}
		})
	}
	watch(imgs.value, (n, o) => {
		console.log(...imgs.value);
	})
	const uploadFile = (file, path, onCall = () => {}) => {
		console.log(123);
		return new Promise((resolve, reject) => {
			const task = wx.cloud.uploadFile({
				cloudPath: path,
				filePath: file,
				config: {
					env: 'prod-2gu6i5oga6c1929f' // 需要替换成自己的微信云托管环境ID
				},
				success: res => resolve(res.fileID),
				fail: e => {
					const info = e.toString()
					if (info.indexOf('abort') != -1) {
						reject(new Error('【文件上传失败】中断上传'))
					} else {
						reject(new Error('【文件上传失败】网络或其他错误'))
					}
				}
			})
			task.onProgressUpdate((res) => {
				if (onCall(res) == false) {
					task.abort()
				}
			})
		})
	}
</script>

<style lang="less" scoped>
	.release {
		padding: 40rpx 20rpx;

		.imgs {
			display: flex;
			flex-wrap: wrap;
		}

		.cacheImg,
		.uploadImg {
			margin: 10rpx;
			width: 200rpx;
			height: 200rpx;
		}

		.cacheImg {
			image {
				width: 100%;
				height: 100%;
			}
		}

		.uploadImg {
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1rpx solid #c3d9f8;
		}
	}
</style>
