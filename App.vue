<script lang="ts">
	import {
		pageInfoStore
	} from '@/store/index'
	export default {
		onLaunch: function() {
			const pageInfonewStore = pageInfoStore()
			pageInfonewStore.setMenuStyleFn(uni.getMenuButtonBoundingClientRect());
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
