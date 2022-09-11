// import { defineStore } from "pinia";
import { defineStore } from 'pinia'
import { menuStyleTypeConfig, userInfoConfig } from "./storeTypeConfig/index";
import { getUserInfoReq } from '@/utils/api.js'
export const pageInfoStore = defineStore("counter", {
	state: () => {
		return {
			menuStyle: {} as menuStyleTypeConfig,
		};
	},
	actions: {
		setMenuStyleFn(value: menuStyleTypeConfig): void {
			this.menuStyle = value;
		},
	},
});
export const infoStore = defineStore("info", {
	state: () => {
		return {
			userInfo: {} as userInfoConfig,
			token: ''
		};
	},
	actions: {
		setUserInfoFn(value: userInfoConfig): void {
			this.userInfo = value
			uni.setStorageSync('userInfo', value)
		},
		setToken(value: string): void {
			this.token = value;
			uni.setStorageSync('token', value);
		},
		async userInfoReq() {
			const result = await getUserInfoReq()
			if (result.status) return
			this.setUserInfoFn(result.data)
			return result.data
		}
	},
});
