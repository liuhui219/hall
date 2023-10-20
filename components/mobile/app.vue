<template>
	<nuxtLayout>
		<ClientOnly>
			<MobileAppDownTip v-if="!useUrlcApp().value" v-show="userStore.bDownTip && !homeStore.showSearchResult" />
			<SkinHeader v-if="!useUrlcApp().value" v-show="pagePadding.top && !homeStore.showSearchResult" />
			<SkinMenu v-if="!useUrlcApp().value" />
			<MobileAppNavbar v-if="!useUrlcApp().value" v-show="pagePadding.bottom && !homeStore.showSearchResult" />
			<NuxtPage
				id="page-container"
				class="page-container flex flex-col overflow-auto"
				:class="{
					'hide-top': !pagePadding.top || useUrlcApp().value,
					'hide-bottom': !pagePadding.bottom || useUrlcApp().value,
					sport: pagePadding.sport,
				}"
			/>
			<BasePageLoading v-show="loading || userLoading" :http="true" />
			<MobilePopupWallet v-if="!useUrlcApp().value && homeStore.showWallet" />
			<MobilePopupInfoMenu v-if="!useUrlcApp().value && homeStore.showInfoMenu" />
		</ClientOnly>
	</nuxtLayout>
</template>
<script setup lang="ts">
	import Helper from '~~/apis/tool/Helper'

	//弹窗配置
	const loading = useHttpLoading()
	const userLoading = useUserLoading()
	const pagePadding = usePagePadding() //页头页脚是否显示
	const userStore = useUserStore()
	const homeStore = useHomeStore()
	const configStore = useSysConfigStore()
	const updateDownTip = () => {
		if (userStore.bDownTip) {
			Helper.setStyleProperty('--app-download-height', '34px')
		} else {
			Helper.setStyleProperty('--app-download-height', '0px')
		}
	}
	watchEffect(updateDownTip)
</script>
<style lang="scss">
	@import '~~/assets/stylesheets/mobile/app.scss';
</style>
