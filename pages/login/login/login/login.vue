<template>
	<view class="login">
		<view class="logo">
			<h1>登录233</h1>
		</view>
		<view class="form">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item name="email">
					<uni-easyinput class="input" v-model="formData.email" type="text" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<uni-easyinput :focus="email ?true:false" :clearable="false" type="password"
						v-model="formData.password" placeholder="请输入您的密码~" />
				</uni-forms-item>
			</uni-forms>
			<view class="btn-submit" @click="loginFn">
				<uni-icons type="arrowthinright" color="#FFFFFF" size="22"></uni-icons>
			</view>
		</view>
		<navigator class="spanLogin" url="/pages/login/register/register">没有账户，我要注册?</navigator>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		loginReq
	} from '@/utils/api.js'
	import {
		infoStore
	} from '@/store/index'
	const {
		setToken,
		userInfoReq
	} = infoStore()
	const form = ref(null)
	const props = defineProps({
		email: String
	})
	const formData = ref({
		email: props.email || null,
		password: null
	})
	const rules = ref({
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
	const loginFn = () => {
		form.value.validate().then(async (res) => {
			const result = await loginReq(formData.value)
			uni.showToast({
				icon: 'none',
				title: result.message
			})
			if (result.status) return
			setToken(result.data['token'])
			userInfoReq()
			uni.switchTab({
				url: '/pages/index/index'
			})
		})
	}
</script>

<style lang="less" scoped>
	.spanLogin {
		margin: 20rpx;
		display: block;
		color: red;
		font-size: 26rpx;
	}

	.login {
		width: 100%;

		.logo {
			width: 150rpx;
			margin: 100rpx auto;
		}

		.form {
			max-width: 100%;
			padding: 0rpx 30rpx;

			.btn-submit {
				margin: 0rpx auto;
				width: 108rpx;
				height: 108rpx;
				line-height: 108rpx;
				border-radius: 50%;
				background-color: #01cafa;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		/deep/.uni-easyinput__content {
			width: 100%;
			height: 100rpx;
			border-radius: 45rpx;
		}
	}
</style>
