// import { defineStore } from "pinia";
import { defineStore } from 'pinia'
import { menuStyleTypeConfig } from "./storeTypeConfig/index";
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
