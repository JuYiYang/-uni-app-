<template>
	<view class="register">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item label="邮箱" name="email">
				<uni-easyinput class="input" v-model="formData.email" type="text" placeholder="请输入用户名"
					@input="binddata('email',$event.detail.value)" />
			</uni-forms-item>
			<uni-forms-item label="验证码" name="code">
				<view class="flex">
					<uni-easyinput :clearable="false" type="text" v-model="formData.code" placeholder="请输入获取到的验证码" />
					<view class="tag" @click.stop="submitVerifyCode">
						获取验证码{{ codeTime ==0?'':`(${codeTime})` }}
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item label="密码码" name="password">
				<uni-easyinput :clearable="false" type="password" v-model="formData.password"
					placeholder="你想要输入什么密码呢？" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submit">Submit</button>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		getVerifyCode,
		registerReq,
	} from '@/utils/api.js'
	const form = ref(null)
	const formData = reactive({
		name: '',
		email: 'dcloud@email.com',
		code: null,
		password: null,
	})
	const rules = ref({
		// 对name字段进行必填验证
		name: {
			rules: [{
				required: true,
				errorMessage: '请输入姓名',
			}, ]
		},
		code: {
			rules: [{
				required: true,
				errorMessage: '请输入验证码',
			}, {
				minLength: 4,
				maxLength: 4,
				errorMessage: '验证码长度错误',
			}],
		},
		password: {
			rules: [{
				required: true,
				errorMessage: '请输入密码',
			}, {
				minLength: 4,
				maxLength: 8,
				errorMessage: '验证码长度错误,最小4，最大8',
			}]
		},
		// 对email字段进行必填验证
		email: {
			rules: [{
				format: 'email',
				errorMessage: '请输入正确的邮箱地址',
			}]
		}
	})
	const codeTimer = ref(null)
	const codeTime = ref(0)
	const submitVerifyCode = async () => {
		console.log(codeTime.value);
		// if (codeTime.value != 0) return
		// codeTime.value = 60
		// codeTimer.value = setInterval(() => {
		// 	codeTime.value = codeTime.value - 1
		// 	if (codeTime.value == 0) codeTimer.value = null
		// }, 1000)
		if (formData.email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) == -
			1) {
			uni.showToast({
				icon: 'error',
				title: '错误的邮箱'
			})
		}
		const result = await getVerifyCode(formData)
		if (result.status) return
		uni.showToast({
			icon: 'none',
			title: '发送成功，请注意查看邮箱~',
		});
	}
	const submit = () => {
		form.value.validate().then(async (res) => {
			const result = await registerReq({
				...res,
				username: "咸鱼12138~",
				verifyCode: res.code,
			})
			if (result.status) {
				return uni.showToast({
					icon: 'none',
					title: result.message,
					duration: 2000
				});
			}
			uni.showToast({
				icon: 'none',
				title: result.message,
				duration: 2000,
			});
		}).catch(err => {
			console.log('表单错误信息：', err);
		})
	}
</script>

<style lang="less">
	.register {
		padding: 30rpx;
	}

	/deep/ .uni-forms-item__content {
		.flex {
			position: relative;

			.tag {
				z-index: 999;
				background-color: aquamarine;
				width: 216rpx;
				height: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: white;
				position: absolute;
				right: 0rpx;
				bottom: 6rpx;
				font-size: 28rpx;
				border-radius: 10rpx;
			}
		}

		.uni-easyinput {
			.uni-easyinput__content {
				border: 0rpx;
				border-bottom: 1px solid #DCDFE6;
			}
		}
	}
</style>
