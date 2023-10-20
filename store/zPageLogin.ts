import HallLog from '~~/apis/debug/HallLog'
import { defineStore } from 'pinia'
import StorageKey from '~~/apis/tool/StorageKey'
import Global from '~~/core/Global'
import Md5Util from '~~/core/utils/Md5Util'
import Helper from '~~/apis/tool/Helper'
export const useLoginStore = defineStore({
	id: 'login-store',
	state: () => {
		return {
			modal: 0,
			account: '',
			password: '',
			acode: useAcode(),
			rememberCheck: vueStorage(StorageKey.RememberLogin, 1), //存储用户登录状态
			rememberHistory: vueStorage(StorageKey.RememberHistory, ''), //存储用户账号
			needForceReg: '',
			passwordError: false,
			accountError: false,
			accountErrorMessage: '',
		}
	},
	actions: {
		initRememberData(obj: any) {
			if (obj.acode) {
				this.acode = obj.acode
			}
			this.account = obj.account
			this.password = obj.pwd
		},
		validAccount() {
			this.accountError = false
			this.accountErrorMessage = ''
			if (!this.account) {
				this.accountError = true
				this.accountErrorMessage = useNuxtApp().$t('L1020')
			} else if (this.account.includes('@')) {
				this.accountError = !Helper.validEmail(this.account)
				if (this.accountError) {
					this.accountErrorMessage = useNuxtApp().$t('L1039')
					return
				}
			} else if (/[^0-9]/g.test(this.account)) {
			} else {
				this.accountError = !Helper.validPhone(this.acode, this.account)
				if (this.accountError) {
					this.accountErrorMessage = useNuxtApp().$t('E0009')
					return
				}
			}
		},
		validPassword() {
			this.passwordError = useSysConfigStore().passwordError(this.password)
		},
		parseHistory() {
			let obj = {}
			try {
				obj = JSON.parse(Global.AESUtil.aesDcryptWithPKC27(this.rememberHistory))
			} catch (error) {}
			return obj
		},
		mounted() {
			if (!useNuxtApp().$device.isDesktop) {
				useNavigationStore().setMobileNavShow(false)
			}
			if (this.rememberCheck && this.rememberHistory) {
				try {
					const obj: any = this.parseHistory()
					if (obj) {
						this.initRememberData(obj)
					}
				} catch (error) {
					HallLog.error('login mounted', error)
				}
			}
			nextTick(() => {
				setTimeout(() => {
					this.modal = 1
					setTimeout(() => {
						let input = document.querySelector('.login-modal-content input') as HTMLElement
						if (input && input.focus) {
							input.focus()
						}
					}, 200)
				}, 20)
			})
		},
		unmounted() {
			this.modal = 0
			this.password = ''
		},
		handleClickSubmitByValid() {
			this.validAccount()
			if (!this.accountError) {
				this.validPassword()
				if (!this.passwordError) {
					this.handleClickSubmit()
				}
			}
		},

		comMounted() {
			setTimeout(() => {
				this.showThird()
			}, 100)
		},
		comUnMounted() {
			this.removeThird()
		},

		showThird() {
			HallLog.log('showThird start')
			let oneAllContainer = document.getElementById('oneall-container')
			if (!oneAllContainer) {
				HallLog.error('this.oneAllContainer error', oneAllContainer)
				return
			}
			if (!window.thirdDom) {
				if (window.thirdInitCount >= 10) {
					HallLog.error('window.thirdInitCount:' + window.thirdInitCount)
					return
				}
				window.thirdInitCount = (window.thirdInitCount || 0) + 1
				setTimeout(() => {
					this.showThird()
				}, 100)
				HallLog.error('no window.thirdDom')
				return
			}
			HallLog.log('showThird appendChild')
			oneAllContainer.appendChild(window.thirdDom)
		},

		removeThird() {
			if (window.thirdDom && window.thirdParent) {
				HallLog.log('removeThird')
				window.thirdParent.appendChild(window.thirdDom)
			}
		},

		async handleClickSubmit() {
			if (this.disabledSubmit) {
				return
			}
			const params = { body: <any>{} }
			const { addErrorMessage, passwordTip } = useSysConfigStore()
			if (this.passwordIsError) {
				addErrorMessage({ id: 'error_password_format', msg: passwordTip })
				return
			}
			params.body = { pwd: Md5Util.encode(this.password), rememberMe: 1 }
			if (this.account.includes('@')) {
				params.body.email = this.account
			} else if (/[^0-9]/g.test(this.account)) {
				params.body.account = this.account
			} else {
				const phone = await Global.AESUtil.rsaEncryptPhone(this.account)
				params.body.phone = phone
				params.body.acode = Helper.getAcodeFormat(this.acode)
			}

			let rememberConfig: any = { ...params.body }
			rememberConfig.account = this.account
			delete rememberConfig.rememberMe
			rememberConfig.pwd = this.password
			if (rememberConfig.acode) {
				rememberConfig.acode = '+' + rememberConfig.acode
			}
			this.doLoginRequest(params, rememberConfig, this.rememberCheck)
		},

		//执行登录请求
		doLoginRequest(params: any, rememberConfig: any, rememberCheck: boolean) {
			useLoginByAccount(
				params,
				(res: any) => {
					const { setUserInfo } = useUserStore()
					setUserInfo(res) //这一句必须要最前，否则没有登录态
					closePopup()

					setTimeout(() => {
						this.rememberAccount(rememberConfig, rememberCheck)
					}, 10)
				},
				(err: any) => {
					// HallLog.error('login useLoginByAccount error', err)
				}
			)
		},

		//登录之后 储存用户数据 请求所需数据
		rememberAccount(rememberConfig: any, isRemeber: number | boolean) {
			useUserStore().getUserInfo()
			useUserStore().afterLogin()

			if (isRemeber) {
				try {
					this.rememberHistory = Global.AESUtil.aesEncryptWithCommonKey(JSON.stringify(rememberConfig))
				} catch (error) {
					HallLog.error('error:', error)
				}
			} else {
				this.rememberHistory = ''
			}

			// 代理模块： 普通用户仅弹窗
			// if (isPageReferAndEarn() && isPC()) {
			// 	if (!useUserStore().isAgencyUser) {
			// 		navigateTo({ name: '_ch' })
			// 		setTimeout(() => {
			// 			openPopup('referEarn')
			// 		}, 1000)
			// 	}
			// }
		},
	},
	getters: {
		passwordIsError: (state) => useSysConfigStore().passwordError(state.password),
		disabledSubmit: (state) => {
			return !state.account || useSysConfigStore().passwordError(state.password)
		},
	},
})
