const requestUrl = 'http://192.168.31.247:3000/'
export default (req, tokenFlag = true) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: requestUrl + req.url, 
			data: req.data,
			method: req.method || 'GET',
			header: {
				'Authorization': tokenFlag ? token : '',
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			},
			success: (res) => {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		});
	})
}
