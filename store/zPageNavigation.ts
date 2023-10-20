import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
export const useNavigationStore = defineStore({
	id: 'navigator-store',
	state: () => {
		return {
			mobileNavShow: false,
			sports: true,
			casino: true,
			brand: false,
		}
	},
	actions: {
		referEarnJump(type: string) {
			// 登录 且不是代理用户 仅弹窗
			// if (useUserStore().isLogin && !useUserStore().isAgencyUser && isPC()) {
			// 	openPopup('referEarn')
			// } else {
			// 	navigateTo('/refer-and-earn')
			// }
			if (type === 'top') {
				openPopup(PopupEnum.referEarn)
			} else {
				navigateTo('/refer-and-earn')
			}
		},
		setMobileNavShow(value?: any) {
			if (value != null) {
				this.mobileNavShow = value
			} else {
				this.mobileNavShow = !this.mobileNavShow
			}
			Helper.setStyleProperty('--current-menu-width', this.mobileNavShow ? '320px' : '64px')
			//body整体滚动的话需要这个，如果是page内滚动则不需要
			// if (useNuxtApp().$device.isMobile) {
			// 	if (this.mobileNavShow) {
			//		document.body.style.overflow = 'visible';
			// 		document.body.setAttribute("style", "overflow: hidden !important");
			// 	} else {
			// 		document.body.style.removeProperty("overflow");
			// 	}
			// }
		},
		goToSport(sport: string, path = '/') {
			const { goToSport } = useGameStore()
			goToSport(sport, path)
		},
		handleClickLogo() {
			toHome()
			this.setMobileNavShow()
		},
		handleClickCasino() {
			this.casino = !this.casino
		},
		handleClickSports() {
			this.sports = !this.sports
		},
		handleClickBrand() {
			this.brand = !this.brand
		},
		openDownload() {
			const configStore = useSysConfigStore()
			if (isAndroid() && configStore.pageConfig.sysConfig['android_download_url']) {
				Helper.toOutLink(configStore.pageConfig.sysConfig['android_download_url'])
			} else if (isIos() && configStore.pageConfig.sysConfig['ios_download_url']) {
				Helper.toOutLink(configStore.pageConfig.sysConfig['ios_download_url'])
			} else if (window.saveToHome) {
				//自动保存到桌面
				HallLog.log('window.saveToHome')
				window.saveToHome()
			} else if (isPC()) {
				if (configStore.pageConfig.sysConfig['android_download_url']) {
					Helper.toOutLink(configStore.pageConfig.sysConfig['android_download_url'])
				}
				return
			} else {
				closePopup('menu', 'download')
			}
		},
	},
	getters: {
		getClass: (state) => {
			return state.mobileNavShow ? 'navigation-text' : 'hover-box'
		},
	},
})
