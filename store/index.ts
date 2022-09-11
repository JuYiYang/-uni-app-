// import { defineStore } from "pinia";
import { defineStore } from 'pinia'
import { menuStyleTypeConfig, userInfoConfig } from "./storeTypeConfig/index";
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
			this.setToken(value.token as string)
			delete value.token
			uni.setStorageSync('userInfo', value)
		},
		setToken(value: string): void {
			console.log(value);
			this.token = value;
			uni.setStorageSync('token', value);
		}
	},
});
