const uploadFile = (file, path, onCall = () => {}) => {
	return new Promise((resolve, reject) => {
		const task = wx.cloud.uploadFile({
			cloudPath: path,
			filePath: file,
			config: {
				env: 'prod-2gu6i5oga6c1929f' // 云ID
			},
			success: res => resolve(res.fileID),
			fail: e => {
				console.log(e);
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

export const uploadImg = async () => {
	wx.cloud.init()
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 1,
			async success(res) {
				let fileName = res.tempFiles[0].path.split('.')[0].substring(11)
				let cacheUrl = res.tempFilePaths[0]
				resolve(await uploadFile(cacheUrl, fileName))
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
