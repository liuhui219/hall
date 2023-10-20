import { defineStore } from 'pinia'
import { dialog, mapFace } from '~~/apis/types'
import Global from '~~/core/Global'

export const useDialogStore = defineStore({
	id: 'dialog-store',
	state: () => {
		return <mapFace>{
			title: '',
			img: '',
			show: false,
			text: '',
			ok: null,
			cancel: null,
			ok_text: '',
			cancel_text: '',
		}
	},
	actions: {
		closeConfirm() {
			this.cancel = null
			this.cancel_text = ''
			this.ok_text = ''
			this.ok = null
			this.img = ''
			this.text = ''
			this.title = ''
			this.show = false
		},
		clickOk() {
			if (this.ok) {
				this.ok()
			}
			this.close()
		},
		clickCancel() {
			if (this.cancel) {
				this.cancel()
			}
			this.close()
		},
		close() {
			this.show = false
		},
		open(params: dialog) {
			this.cancel = params.cancel
			const app = useNuxtApp()
			if (params.cancel_text === false) {
				this.cancel_text = ''
			} else {
				this.cancel_text = params.cancel_text || app.$t('T0004')
			}
			this.ok_text = params.ok_text || 'Confirm'
			this.ok = params.ok
			this.img = params.img
			this.text = params.text
			this.title = params.title
			this.show = true
		},
		logOut() {
			//退出登录谷歌上报
			const userStore = useUserStore()
			//记录退出前uid
			googleEvent({ event: 'login_out', event_type: 'af_login_out' })
			this.logOutCallback(true)
		},
		logOutCallback(back?: boolean) {
			Global.HallServer.heartbeatHelper._initHeartBeatData()
			const userStore = useUserStore()
			let empty: mapFace = {}
			Object.entries(userStore.data).forEach((el: any) => (empty[el[0]] = null))
			userStore.setUserInfo(empty)
			userStore.$reset()

			useNoticeAndMessageStore()?.clear()
			useRouletteStore().clear()
			useReferAndEarnStore().init()
			if (back || useUrlcApp().value) {
				//退出登录回到首页
				toHome()
			} else {
				const { path, hash } = useRoute()
				const isNeedLogin = isNeedRedirct({ path, hash })
				if (isNeedLogin) {
					toHome()
					setTimeout(() => {
						openLoginOrRegister()
					}, 200)
				}
			}
		},
		openLogout() {
			const app = useNuxtApp()
			this.open({
				title: app.$t('U0008'),
				img: '',
				text: app.$t('H0054'),
				ok: this.logOut,
				cancel_text: false,
				ok_text: app.$t('U0008'),
			})
		},
	},
	getters: {},
})
