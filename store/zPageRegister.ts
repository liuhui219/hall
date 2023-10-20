import Helper from '~~/apis/tool/Helper'
import { defineStore } from 'pinia'
import StorageKey from '~~/apis/tool/StorageKey'
import Md5Util from '~~/core/utils/Md5Util'
import HallLog from '~~/apis/debug/HallLog'
import Global from '~~/core/Global'

export const useRegisterStore = defineStore({
	id: 'register-store',
	state: () => {
		return {
			way: vueStorage('z-p-r-w', -1),
			modal: 0,
			email: vueStorage('z-p-r-e', ''),
			phone: vueStorage('z-p-r-p', ''),
			account: '',
			acode: useAcode(),
			password: '',
			confirmPasswrod: '',
			// route: useRoute(),
			showInviteCode: false,
			invite_code: '',
			inviteCodeReadonly: false,
			check: vueStorage(StorageKey.UserAgreement, 0),
			checkEmail: vueStorage(StorageKey.UserEmailPromos, 1),
			emailCode: '',
			phoneCode: '',
			emailError: false,
			phoneError: false,
			passwordError: false,
			inviteCodeError: false,
			codeError: false,
			checkError: false,
			verifyText: {
				text: '',
				disabled: true,
				send: false,
			},
			verifyClickCount: 0,
			timerKey: 'register_timer',
			emailRetry: 0,
			phoneRetry: 0,
			emailTime: vueStorage(StorageKey.RegSendEmailCodeTime, 0),
			phoneTime: vueStorage(StorageKey.RegSendPhoneCodeTime, 0),
			currentTime: Date.now(),
			duration: <any>{ 0: 0, 1: 0 },
			list: [],
			regMountTime: 0,
			regState: 0, //本次打开注册页面的状态 0-默认 1-注册成功
		}
	},
	actions: {
		updateWay(index: number) {
			this.way = index
			this.password = ''
			this.confirmPasswrod = ''
			this.passwordError = this.emailError = this.phoneError = this.inviteCodeError = false
			this.changeVerifyText()
		},
		changeInviteCode() {
			this.showInviteCode = true
		},
		initWay() {
			let maps = useSysConfigStore().modelConfig.login_way
			let list: any = []
			let from = resConfig['reg-cfg'] || {}
			for (let key in from) {
				let webConfig = maps[key]
				if (from[key].state && webConfig) {
					from[key].icon = webConfig.icon
					from[key].way = webConfig.way
					from[key].sort = Number(from[key].sort) || 0
					from[key].key = key
					from[key].class = webConfig.class
					from[key].text = webConfig.text
					list.push(from[key])
				}
			}
			list.sort((a: any, b: any) => {
				return a.sort > b.sort ? 1 : -1
			})
			if (this.way < 0) {
				this.way = list[0]?.way
			}

			this.list = list
		},
		validEmail() {
			this.emailError = !Helper.validEmail(this.email)
			return this.emailError
		},
		validPhone() {
			this.phoneError = !Helper.validPhone(this.acode, this.phone)
			return this.phoneError
		},
		validPassword() {
			this.passwordError = !!useSysConfigStore().passwordError(this.password)
			return this.passwordError
		},
		validInviteCode() {
			this.inviteCodeError = this.inviteCodeIsError
			return this.inviteCodeError
		},
		validCheck() {
			this.checkError = !this.check
			return this.checkError
		},
		validCode() {
			const code = this.way == LoginWayEnum.email ? this.emailCode : this.phoneCode
			const len = this.way == LoginWayEnum.email ? resConfig.lengthConfig.emailCodeLength : resConfig.lengthConfig.phoneCodeLength
			this.codeError = !code || code.length != len
			return this.codeError
		},
		mounted() {
			const configStore = useSysConfigStore()

			this.initWay()
			this.regMountTime = new Date().getTime()
			this.regState = 0
			this.duration = configStore.getCodeDuration
			this.initInviteCode()
			if (configStore.config.account_verify_config.email || configStore.config.account_verify_config.phone) {
				this.regTimer()
			}
			const device: any = useNuxtApp().$device
			if (!device.isDesktop) {
				useNavigationStore().setMobileNavShow(false)
			}
			this.changeVerifyText()
			nextTick(() => {
				setTimeout(() => {
					this.modal = 1
				}, 20)
			})
		},
		regTimer() {
			registerTimer(this.timerKey, this.setCurrentTime, true)
		},
		initInviteCode() {
			let ic = useUrlIc().value
			if (ic) {
				this.invite_code = ic
				if (this.inviteCodeIsError) {
					this.invite_code = ''
				} else {
					this.inviteCodeReadonly = true
				}
			} else {
				this.invite_code = ''
				this.inviteCodeReadonly = false
			}
		},
		unmounted() {
			this.modal = 0
			this.password = ''
			this.confirmPasswrod = ''
			this.email = ''
			this.phone = ''
			this.invite_code = ''
			this.emailCode = ''
			this.phoneCode = ''
			this.verifyClickCount = 0
			removeTimer(this.timerKey)

			if (this.regState == 0) {
				//注册中断
				googleEvent({ event: 'Registration_Process_Interrupted', sendType: 1 })
			}

			let now = new Date().getTime()
			let regPageTime = Math.floor(now - this.regMountTime) / 1000
			googleEvent({ event: 'Registration_Page_Time', sendType: 1, regPageTime: regPageTime + 'second' })
		},
		async sendCode(message = true) {
			//定时器暂停时表示读秒结束
			if (!timerIsPlay(this.timerKey)) {
				HallLog.log('send code: ' + new Date().getTime())
				googleEvent({ event: 'sendVerificationCodeButtonClicked', sendType: 1 })
				const body: any = {}
				let way = this.way
				const { addErrorMessage } = useSysConfigStore()
				if (way == LoginWayEnum.email && !Helper.validEmail(this.email)) {
					return addErrorMessage({ id: 'register_email_address_error', msg: useNuxtApp().$t('E0008') })
				}
				if (way == LoginWayEnum.phone) {
					const phoneValid = Helper.validPhone(this.acode, this.phone)
					if (!phoneValid) {
						return addErrorMessage({ id: 'register_phone_number_error', msg: useNuxtApp().$t('E0009') })
					}
				}
				body.code_type = 1
				if (way == LoginWayEnum.email) {
					body.email = this.email
					body.verify_type = 1
					body.retry = this.emailRetry && 1
				} else if (way == LoginWayEnum.phone) {
					const phone = await Global.AESUtil.rsaEncryptPhone(this.phone)
					body.phone = phone
					body.verify_type = 0
					body.acode = Helper.getAcodeFormat(this.acode)
					body.retry = this.phoneRetry && 1
				}
				this.verifyClickCount++
				if (this.verifyClickCount >= 2) {
					googleEvent({ event: 'Send_Code_Button_Repeat', sendType: 1, verifyClickCount: this.verifyClickCount })
				}
				if (way == LoginWayEnum.email) {
					this.emailRetry++
					this.emailTime = new Date().getTime()
				} else if (way == LoginWayEnum.phone) {
					this.phoneRetry++
					this.phoneTime = new Date().getTime()
				}
				this.setCurrentTime()
				startTimer(this.timerKey)
				useGetVerifyCode(
					{ loading: message ? 2 : 0, body: body },
					(res: any) => {
						HallLog.log('code result: ', res)
						if (message) {
							addErrorMessage({ id: 'send_register_code', type: 'success', msg: useNuxtApp().$t('E0006') })
						}
						googleEvent({ event: 'sendVerificationCodeSuccess', sendType: 1 })
					},
					(err: any) => {
						// HallLog.error('useGetVerifyCode error', err)
						googleEvent({ event: 'Send_Code_Failed', sendType: 1 })
					}
				)
			}
		},
		setCurrentTime() {
			this.currentTime = Date.now()
			this.changeVerifyText()
			HallLog.log('update register page current time:', this.currentTime)
		},
		changeVerifyText() {
			let result = 0
			const sendTime = this.way == LoginWayEnum.email ? this.emailTime : this.phoneTime
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
					disabled = !Helper.validEmail(this.email)
				} else {
					disabled = !Helper.validPhone(this.acode, this.phone)
				}
				if (retry) {
					this.verifyText = { disabled: disabled, text: app.$t('L1021'), send: false }
				} else {
					this.verifyText = { disabled: disabled, text: app.$t('U0019'), send: false }
				}
			} else {
				startTimer(this.timerKey)
				if (this.way == LoginWayEnum.email) {
					this.emailRetry = 1
				} else {
					this.phoneRetry = 1
				}
				this.verifyText = { disabled: true, text: app.$t('L1021') + `(${result}s)`, send: true }
			}
		},
		handleClickRegisterSubmit() {
			googleEvent({ event: 'registerButtonClicked', sendType: 1 })
			const configStore = useSysConfigStore()
			if (this.way == LoginWayEnum.email) {
				if (this.validEmail()) {
					return
				}
				if (this.validPassword()) {
					return
				}
				if (this.validCheck()) {
					return
				}
				if (configStore.config.account_verify_config.email) {
					this.sendCode(false)
					openPopup(PopupEnum.registerCode)
					return
				}
			} else if (this.way == LoginWayEnum.phone) {
				if (this.validPhone()) {
					return
				}

				if (this.validPassword()) {
					return
				}

				if (this.validCheck()) {
					return
				}
				if (configStore.config.account_verify_config.phone) {
					this.sendCode(false)
					openPopup(PopupEnum.registerCode)
					return
				}
			}
			this.handleClickSubmit()
		},
		validCodeSubmit() {
			googleEvent({ event: 'registerButtonClicked', sendType: 1 })
			if (this.validCode()) {
				return
			}
			this.handleClickSubmit()
		},
		async handleClickSubmit() {
			const params: any = {
				body: { pwd: Md5Util.encode(this.password), invite_code: Number(this.invite_code), receive_email: Boolean(this.checkEmail) },
			}
			const { addErrorMessage, passwordTip } = useSysConfigStore()
			if (this.way == LoginWayEnum.email) {
				if (!Helper.validEmail(this.email)) {
					const { addErrorMessage } = useSysConfigStore()
					addErrorMessage({ id: 'error_email_format', msg: useNuxtApp().$t('E0008') })
					return
				}
				params.body.code = this.emailCode
				params.body.email = this.email
			} else if (this.way == LoginWayEnum.phone) {
				const phoneValid = Helper.validPhone(this.acode, this.phone)
				if (!phoneValid) {
					addErrorMessage({ id: 'error_phone_format', msg: useNuxtApp().$t('E0009') })
					return
				}
				const phone = await Global.AESUtil.rsaEncryptPhone(this.phone)
				params.body.acode = Helper.getAcodeFormat(this.acode)
				params.body.phone = phone
				params.body.code = this.phoneCode
			} else {
				params.body.account = this.account
				params.body.code = ''
			}
			if (this.passwordIsError) {
				addErrorMessage({ id: 'error_password_format', msg: passwordTip })
				return
			}
			useUserRegister(
				params,
				(res: any) => {
					this.success(res)
				},
				(err: any) => {
					this.error(err)
				}
			)
		},
		error(err: any) {
			HallLog.error('useUserRegister error', err)
			if (err._errno == 1008) {
				if (this.way == LoginWayEnum.email) {
					googleEvent({ event: 'Email_Verification_Failed', sendType: 1 })
				} else if (this.way == LoginWayEnum.phone) {
					googleEvent({ event: 'Phone_Verification_Failed', sendType: 1 })
				}
			} else if (err._errno == -1) {
				googleEvent({ event: 'Register_Submit_Button_Offline', sendType: 1 })
			}
			googleEvent({ event: 'Register_Callback', sendType: 1 })
		},
		success(res: any) {
			this.regState = 1
			let now = new Date().getTime()
			let regCostTime = Math.floor(now - this.regMountTime) / 1000
			googleEvent({ event: 'Registration_Time', sendType: 1, regCostTime: regCostTime + 'second' })

			const userStore = useUserStore()
			const { rememberAccount } = useLoginStore()
			let obj: any = null
			if (this.way == LoginWayEnum.email) {
				obj = { pwd: this.password, account: this.email }
			} else if (this.way == LoginWayEnum.phone) {
				//本地储存原数据
				obj = { acode: this.acode, pwd: this.password, account: this.phone }
			} else {
				obj = { account: this.account, pwd: this.password }
			}
			userStore.setUserInfo(res)
			closeAllPopup()

			setTimeout(() => {
				rememberAccount(obj, true)
				this.email = ''
				this.phone = ''
				if(sysConfig.kycConfig.status) {
					useAccountStore().toKycVerify(1)
					openPopup('account')
				}
			}, 10)

			Object.keys(userStore.redPoint).forEach((ele: any) => {
				userStore.redPoint[ele] = 9999
			})

			if (resConfig['gankapi']['status']) {
				const urlParams = useUrlParams()
				if (urlParams.value['src'] == 'fbmini') {
					let srcid = urlParams.value['srcid']
					if (srcid) {
						$fetch(resConfig['gankapi']['api_domain'], {
							body: {
								userId: Number(srcid),
								registerTime: new Date().getTime(),
								afunUserId: '' + userStore.data.uid,
							},
							method: 'get',
						})
							.then((res: any) => {
								HallLog.logObj('gankapi suc res', res)
							})
							.catch((err: any) => {
								HallLog.error('gankapi error', err)
							})
					}
				}
			}
		},
		//点击注册界面输入框
		clickRegisterInput(type: string) {
			HallLog.error('clickRegisterInput:' + type)
			googleEvent({ event: type + '_input', sendType: 1 })
		},

		//点击注册界面隐私政策
		clickRegisterPrivacy() {
			HallLog.error('clickRegisterPrivacy')
			let regPrivacyObj = resConfig['reg-privacy']
			if (regPrivacyObj) {
				pageConfigClick(regPrivacyObj.click_id, regPrivacyObj.click_params)
			}
		},
	},
	getters: {
		passwordIsError: (state) => useSysConfigStore().passwordError(state.password),
		inviteCodeIsError: (state) => {
			let code = `${state.invite_code}`
			let config = useSysConfigStore().pageConfig.sysConfig || {}
			if (code) {
				if (code.length < config.promoto_min_len) {
					return true
				}
				if (code.length > config.promoto_max_len) {
					return true
				}
				if (config.promoto_regexp) {
					return !new RegExp(config.promoto_regexp).test(code)
				} else {
					return false
				}
			} else {
				return false
			}
		},
		disabledSubmit: (state: any) => {
			if (state.way === LoginWayEnum.email) {
				return !Helper.validEmail(state.email) || state.passwordIsError || state.inviteCodeIsError || !state.check
			} else if (state.way === LoginWayEnum.phone) {
				return !Helper.validPhone(state.acode, state.phone) || state.passwordIsError || state.inviteCodeIsError || !state.check
			} else {
				return (
					!state.check ||
					state.inviteCodeIsError ||
					state.password != state.confirmPasswrod ||
					state.passwordIsError ||
					useSysConfigStore().accountError(state.account)
				)
			}
		},
		codeTip: (state) => {
			return useNuxtApp().$t('L1044', {
				value: state.way == LoginWayEnum.email ? resConfig.lengthConfig.emailCodeLength : resConfig.lengthConfig.phoneCodeLength,
			})
		},
	},
})
