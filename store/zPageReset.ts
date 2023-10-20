import { NewForgetCodeCheckReq } from '~/types/appserverComponents'
import StorageKey from '~~/apis/tool/StorageKey'
import HallLog from '~~/apis/debug/HallLog'
import { defineStore } from 'pinia'
import Helper from '~~/apis/tool/Helper'
import Global from '~~/core/Global'
import Md5Util from '~~/core/utils/Md5Util'
export const useResetStore = defineStore({
	id: 'reset-store',
	state: () => {
		return {
			account: '',
			way: 0,
			status: 0,
			modal: 0,
			acode: useAcode(),
			password: '',
			code: '',
			newPassword: '',
			confrimPassword: '',
			passwordKey: '',
			check: vueStorage('remeber-r', 0),
			resetCodeTime: vueStorage(StorageKey.VerifyResetEmailCodeTime, 0),
			emailRetry: 0,
			phoneRetry: 0,
			currentTime: Date.now(),
			duration: <any>{ 0: 0, 1: 0 },
			timerKey: 'reset',
			verifyText: { disabled: true, text: '', send: false },
			disabledSubmit: false,
			list: [],
			accountError: false,
			accountErrorMessage: '',
			code_error: false,
		}
	},
	actions: {
		validAccountA() {
			let way = this.account.indexOf('@') == -1 ? LoginWayEnum.phone : LoginWayEnum.email

			if (way == LoginWayEnum.email) {
				this.accountError = !Helper.validEmail(this.account)
				this.accountErrorMessage = useNuxtApp().$t('L1039')
			} else if (way == LoginWayEnum.phone) {
				this.accountError = !Helper.validPhone(this.acode, this.account)
				this.accountErrorMessage = useNuxtApp().$t('E0009')
			}
		},
		validCodeA() {
			this.code_error = !this.code
		},
		updateWay(index: number) {
			this.way = index
			this.changeVerifyText()
		},
		changeVerifyText() {
			let result = 0
			const sendTime = this.resetCodeTime
			const retry = this.way == LoginWayEnum.email ? this.emailRetry : this.phoneRetry
			const duration = this.duration[this.way]
			if (sendTime) {
				result = getTimestamp(duration - (this.currentTime - sendTime) / 1000)
			}
			const app = useNuxtApp()
			if (result <= 0) {
				pauseTimer(this.timerKey)
				let disabled = true
				if (this.way == LoginWayEnum.email) {
					disabled = !Helper.validEmail(this.account)
				} else {
					disabled = !Helper.validPhone(this.acode, this.account)
				}
				if (retry) {
					this.verifyText = { disabled: disabled, text: app.$t('L1021'), send: false }
				} else {
					this.verifyText = { disabled: disabled, text: app.$t('U0019'), send: false }
				}
			} else {
				startTimer(this.timerKey)
				if (this.way == LoginWayEnum.phone) {
					this.emailRetry = 1
				} else {
					this.phoneRetry = 1
				}
				this.verifyText = { disabled: true, text: app.$t('L1021') + `(${result}s)`, send: true }
			}
		},
		validAccount(way: number) {
			const { addErrorMessage } = useSysConfigStore()
			if (way == LoginWayEnum.email) {
				if (!Helper.validEmail(this.account)) {
					addErrorMessage({ id: 'reset_email_address_error', msg: useNuxtApp().$t('E0008') })
					return false
				}
			} else if (way == LoginWayEnum.phone) {
				const phoneValid = Helper.validPhone(this.acode, this.account)
				if (!phoneValid) {
					addErrorMessage({ id: 'reset_phone_number_error', msg: useNuxtApp().$t('E0009') })
					return false
				}
			}
			return true
		},
		async sendCode() {
			//定时器暂停时表示读秒结束
			if (!timerIsPlay(this.timerKey)) {
				HallLog.log('send code: ' + new Date().getTime())
				const body: any = {}
				let way = this.account.indexOf('@') == -1 ? LoginWayEnum.phone : LoginWayEnum.email

				if (way == LoginWayEnum.email) {
					if (!this.validAccount(LoginWayEnum.email)) return
				} else {
					if (!this.validAccount(LoginWayEnum.phone)) return
				}
				body.code_type = 2
				if (way == LoginWayEnum.email) {
					body.email = this.account
					body.verify_type = 1
					body.retry = this.emailRetry && 1
				} else {
					body.phone = await Global.AESUtil.rsaEncryptPhone(this.account)
					body.verify_type = 0
					body.acode = Helper.getAcodeFormat(this.acode)
					body.retry = this.phoneRetry && 1
				}
				useGetVerifyCode(
					{ loading: 0, body: body },
					(res: any) => {
						HallLog.log('code result: ', res)
						this.updateWay(way)
						if (way == LoginWayEnum.email) {
							this.emailRetry++
						} else {
							this.phoneRetry++
						}
						this.resetCodeTime = Date.now()
						const { addErrorMessage } = useSysConfigStore()
						addErrorMessage({ id: 'send_reset_code', type: 'success', msg: useNuxtApp().$t('E0006') })
						this.setCurrentTime()
						startTimer(this.timerKey)
					},
					(err: any) => {
						pauseTimer(this.timerKey)
						// HallLog.error('useGetVerifyCode error', err)
					}
				)
			}
		},
		mounted() {
			this.list = useSysConfigStore().modelConfig.reset_list
			this.duration = useSysConfigStore().getCodeDuration
			this.regTimer()
			this.changeVerifyText()
			nextTick(() => {
				setTimeout(() => {
					this.modal = 1
					this.updateWay(0)
				}, 20)
			})
		},
		unmounted() {
			this.modal = 0
			this.status = 0
			this.way = 0
			this.code = ''
			this.password = ''
			this.account = ''
			removeTimer(this.timerKey)
		},
		handleClickSubmitA() {
			this.validAccountA()
			if (!this.accountError) {
				this.validCodeA()
				if (!this.code_error) {
					this.handleClickSubmit()
				}
			}
		},
		async handleClickSubmit() {
			if (!this.account) {
				const { addErrorMessage } = useSysConfigStore()
				addErrorMessage({ id: 'error_code_format', msg: useNuxtApp().$t('L1036') })
				return
			}
			if (!this.code) {
				const { addErrorMessage } = useSysConfigStore()
				addErrorMessage({ id: 'error_code_format', msg: useNuxtApp().$t('U0019') })
				return
			}
			let way = this.account.indexOf('@') == -1 ? LoginWayEnum.phone : LoginWayEnum.email
			let body: NewForgetCodeCheckReq = { code: this.code }
			if (way == LoginWayEnum.email) {
				if (!this.validAccount(LoginWayEnum.email)) {
					return
				}
				body.email = this.account
			} else {
				if (!this.validAccount(LoginWayEnum.phone)) {
					return
				}
				body.phone = await Global.AESUtil.rsaEncryptPhone(this.account)
				body.acode = Helper.getAcodeFormat(this.acode)
			}
			useForgetCodeCheck(
				{ body: body },
				(res: any) => {
					pauseTimer(this.timerKey)
					this.status = 1
					this.way = way
					this.passwordKey = res.data
					this.newPassword = ''
					this.confrimPassword = ''
				},
				(err: any) => {
					// HallLog.error('forgetCodeCheck error', err)
				}
			)
		},
		handleClickReset() {
			const { addErrorMessage } = useSysConfigStore()
			let body = { new_pwd: Md5Util.encode(this.confrimPassword), key: this.passwordKey }
			useForgetAccountPwd(
				{ body },
				(res: any) => {
					addErrorMessage({ id: 'success_newpwd_bind', msg: useNuxtApp().$t('U0024'), type: 'success' })
					setTimeout(() => {
						closePopup()
					})
				},
				(err: any) => {
					HallLog.error('forgetAccountPwd error', err)
				}
			)
		},
		setCurrentTime() {
			this.currentTime = new Date().getTime()
			this.changeVerifyText()
			HallLog.log('update reset page current time:', this.currentTime)
		},
		regTimer() {
			registerTimer(this.timerKey, this.setCurrentTime, true)
		},
	},
	getters: {
		newPasswrodError: (state) => useSysConfigStore().passwordError(state.newPassword),
		confrimPasswordError: (state) => state.newPassword != state.confrimPassword,
		changeSubmitDisabled: (state) => useSysConfigStore().passwordError(state.newPassword) || state.newPassword != state.confrimPassword,
	},
})
