import appConfig from '@/app.config'
export default (req, tokenFlag = true) => {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync('token')
		uni.request({
			url: appConfig.REQUEST_URL + req.url,
			data: req.data,
			method: req.method || 'GET',
			header: {
				'Authorization': tokenFlag ? token : '',
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			},
			success: (res) => {
				if (res.data.status === 1000) {
					uni.navigateTo({
						url: '/pages/login/login/login/login'
					})
				}
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		});
	})
}
