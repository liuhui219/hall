import { mapFace } from '~~/apis/types'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
import { defineStore } from 'pinia'
import StorageKey from '~~/apis/tool/StorageKey'
import Global from '~~/core/Global'
import Md5Util from '~~/core/utils/Md5Util'
export const useAccountStore = defineStore({
	id: 'account-store',
	state: () => {
		return {
			verifyData: {
				email: '',
				phone: '',
				acode: '',
				nickname: '',
				account: '',
				phone_copy: '',
				email_copy: '',
				fullName: '',
				birth: '',
				is_set_password: 0, //0没有设置 1有设置
				real_name: '',
				email_bind: false,
				phone_bind: false,
			},
			personalInfo: <mapFace>{
				postal_code: '',
				city: '',
				fname: '',
				lname: '',
				street_address: '',
				fullName: '',
				birth: '',
			},
			password: '******',
			birth: <mapFace>{
				year: '',
				month: '',
				date: '',
			},
			countryIndex: -1,
			stateIndex: -1,
			isInit: false,
			editAcode: '',
			currentValue: '',
			currentValue2: '',
			currentPage: 'lobby',
			currentType: '',
			pageOpenType: 0,
			pageTypes: { verify: 'verify', lobby: 'lobby', edit: 'edit', kyc: 'kyc' },
			editTypes: {
				nickname: 'nickname',
				fullName: 'nickname',
				real_name: 'real_name',
				tel: 'tel',
				telCode: 'telCode',
				email: 'email',
				emailCode: 'emailCode',
				password: 'password',
				newPassword: 'newPassword',
				account: 'account',
				birth: 'birth',
			},
			emailTime: vueStorage(StorageKey.VerifyResetEmailCodeTime, 0),
			phoneTime: vueStorage(StorageKey.VerifyResetPhoneCodeTime, 0),
			currentTime: new Date().getTime(),
			duration: <mapFace>{
				0: 0,
				1: 0,
			},
			code: '',
			phoneRetry: 0,
			emailRetry: 0,
			addNewPassword: '',
			editCurrentPassword: '',
			editNewPassword: '',
			editConfirmPassword: '',
			timerKey: 'account_verify',
			disabled: false,
			showPcTitle: <boolean>true,
			avatarIndex: <number>0,
			hasEmail: <boolean>false,
			hasTel: <boolean>false,
			isUpdateProfile: <boolean>false,
			validError: {
				phoneError: false,
				emailError: false,
				nicknameError: false,
				realnameError: false,
				cpfAccountError: false,
				accountError: false,
				birthError: false,
				addNewPasswordError: false,
				newPasswordError: false,
				confirmPasswordError: false,
				verify: false,
			},
		}
	},
	actions: {
		validCpfAccount() {
			this.validError.cpfAccountError = false
			let account = this.currentValue2 || ''
			account = account.replace(/[^0-9]/gi, '')
			if (account.length < 11 || (account.length == 11 && !Helper.validCpf(account))) {
				this.validError.cpfAccountError = true
			}

			if ((account.length > 11 && account.length < 14) || (account.length == 14 && !Helper.validCnpj(account))) {
				this.validError.cpfAccountError = true
			}
			return this.validError.cpfAccountError
		},
		verifyCpfAccount() {
			if (useUserStore().data.kyc?.status == 3) {
				//to do 失败，去高级验证
				return
			}

			if (this.myProfileValid('real_name')) {
				return
			}
			if (this.validCpfAccount()) {
				return
			}
			//to do
		},
		myProfileValid(type: string) {
			const configStore = useSysConfigStore()
			// return  true为错误格式  false通过
			if (type == 'tel') {
				this.validError.phoneError = !Helper.validPhone(this.editAcode, this.currentValue)
				return this.validError.phoneError
			} else if (type == 'email') {
				this.validError.emailError = !Helper.validEmail(this.currentValue)
				return this.validError.emailError
			} else if (type == 'real_name') {
				this.validError.realnameError = this.currentValue == '' || configStore.realnameError(this.currentValue)
				return this.validError.realnameError
			} else if (type == 'account') {
				this.validError.accountError = this.currentValue == '' || configStore.accountError(this.currentValue)
				return this.validError.accountError
			} else if (type == 'addNewPassword') {
				this.validError.addNewPasswordError = this.addNewPassword == '' || configStore.passwordError(this.addNewPassword)
				return this.validError.addNewPasswordError
			} else if (type == 'newPassword') {
				this.validError.newPasswordError = this.editNewPassword == '' || configStore.passwordError(this.editNewPassword)
				return this.validError.newPasswordError
			} else if (type == 'confirmPassword') {
				this.validError.confirmPasswordError = this.editConfirmPasswordValid
				return this.validError.confirmPasswordError
			} else if (type == 'birth') {
				this.validError.birthError = this.birth.year == '' || this.birth.month == '' || this.birth.date == ''
				return this.validError.birthError
			} else if (type == 'nickname') {
				this.validError.nicknameError = this.currentValue == '' || configStore.nicknameError(this.currentValue)
				return this.validError.nicknameError
			}
		},
		selectAvatar(index: number) {
			this.avatarIndex = index
		},
		updateBirth(item: any) {
			Object.assign(this.birth, item)
			if (this.birth.year && this.birth.month && this.birth.date) {
				this.disabled = false
			}
		},
		changeDisabled() {
			const configStore = useSysConfigStore()
			if (this.currentType == this.editTypes.password) {
				this.disabled =
					configStore.passwordError(this.editCurrentPassword) ||
					configStore.passwordError(this.editNewPassword) ||
					configStore.passwordError(this.editConfirmPassword)
			} else if (this.currentType == this.editTypes.newPassword) {
				this.disabled = configStore.passwordError(this.addNewPassword)
			} else if (this.currentType == this.editTypes.nickname) {
				this.disabled = configStore.nicknameError(this.currentValue)
			} else if (this.currentType == this.editTypes.real_name) {
				this.disabled = configStore.realnameError(this.currentValue)
			} else if (this.currentType == this.editTypes.email) {
				this.disabled = !Helper.validEmail(this.currentValue)
			} else if (this.currentType == this.editTypes.emailCode) {
			} else if (this.currentType == this.editTypes.account) {
				this.disabled = configStore.accountError(this.currentValue)
			} else {
				this.disabled = !Helper.validPhone(this.editAcode, this.currentValue)
			}
		},
		edit(type: string, value?: any) {
			const userStore = useUserStore()
			if (type === this.editTypes.account && this.verifyData.account) {
				return
			}

			if (type === this.editTypes.email) {
				if (userStore.data.email_bind) {
					return
				} else if (this.hasEmail) {
					this.showPcTitle = false
					this.assignVerifyData({ email_copy: value })
					this.toVerify(this.editTypes.email, value)
					this.sendCode()
					return
				}
			}
			if (type === this.editTypes.tel) {
				if (userStore.data.phone_bind) {
					return
				} else if (this.hasTel) {
					this.showPcTitle = false
					this.assignVerifyData({ phone_copy: value })
					this.toVerify(this.editTypes.tel, value)
					this.sendCode()
					return
				}
			}
			this.showPcTitle = false
			this.changePageType(this.pageTypes.edit)
			this.currentType = type
			if (type == this.editTypes.tel) {
				this.editAcode = this.verifyData.acode
			} else {
				this.editAcode = ''
				this.editCurrentPassword = this.editNewPassword = this.editConfirmPassword = ''
			}
			this.assignVerifyData({ acode_copy: '', email_copy: '', phone_copy: '' })
			this.currentValue = value
		},

		toKycVerify(pageOpenType = 0) {
			this.pageOpenType = pageOpenType
			this.showPcTitle = false
			this.currentValue = useUserStore().data.kyc?.full_name || ''
			this.currentValue2 = useUserStore().data.kyc?.cpf_account || ''
			this.changePageType(this.pageTypes.kyc)
		},

		toVerify(type: string, value?: any) {
			const userStore = useUserStore()
			if (type === this.editTypes.tel && userStore.data.phone_bind) return
			if (type === this.editTypes.email && userStore.data.email_bind) return

			this.changePageType(this.pageTypes.verify, !(this.verifyData.email_copy || this.verifyData.phone_copy))
			this.currentType = type
			if (type == this.editTypes.tel) {
				this.editAcode = this.verifyData.acode
			} else {
				this.editAcode = ''
			}
			this.code = ''
			this.currentValue = value
		},
		editTel(value: any) {
			this.edit(this.editTypes.tel, value)
		},
		editEmail(value: any) {
			this.edit(this.editTypes.email, value)
		},
		back() {
			this.showPcTitle = true
			if (this.currentPage === this.pageTypes.verify) {
				this.changePageType(this.pageTypes.lobby)
			} else if (this.currentPage === this.pageTypes.edit) {
				this.changePageType(this.pageTypes.lobby)
			} else if (this.currentPage === this.pageTypes.kyc && this.pageOpenType == 0) {
				this.changePageType(this.pageTypes.lobby)
			} else {
				closePopup()
			}
		},
		save() {
			let body: any = { ...this.personalInfo }
			// body.real_name = body.fname + '#&' + body.lname
			// delete body.fname
			// delete body.lname
			const countrys = useSysConfigStore().countrys
			body.birth = this.birth.year + '/' + this.birth.month + '/' + this.birth.date
			if (this.countryIndex != -1) {
				body.country = countrys[this.countryIndex].key
				if (this.stateIndex != -1) {
					body.state = countrys[this.countryIndex].state_list[this.stateIndex]
				} else {
					body.state = ''
				}
			} else {
				body.country = ''
				body.state = ''
			}
			this.updateUserInfo(body)
		},
		assignVerifyData(params = {}) {
			Object.assign(this.verifyData, params)
		},
		saveUserPhone(body: any, savePhone: string) {
			useEditUserPhone(
				{ body },
				(res: any) => {
					const { addErrorMessage } = useSysConfigStore()
					useUserStore().setUserInfo({ phone_bind: true, acode: '+' + body.acode, phone: savePhone })
					this.mounted()
					addErrorMessage({ id: 'success_bind_phone', msg: useNuxtApp().$t('AC0001'), type: 'success' })
					this.changePageType(this.pageTypes.lobby)
					googleEvent({ event: 'phone_verified', sendType: 1 })
				},
				(err: any) => {
					// HallLog.error('useBindPhone error', err)
				}
			)
		},
		saveUserEmail(body: any) {
			useEditUserEmail(
				{ body },
				(res: any) => {
					const { addErrorMessage } = useSysConfigStore()
					useUserStore().setUserInfo({ email_bind: true, email: body.email })
					this.mounted()
					addErrorMessage({ id: 'success_bind_email', msg: useNuxtApp().$t('AC0001'), type: 'success' })
					this.changePageType(this.pageTypes.lobby)
					googleEvent({ event: 'email_verified', sendType: 1 })
				},
				(err: any) => {
					HallLog.error('useBindEmail error', err)
				}
			)
		},
		async saveEdit() {
			if (this.myProfileValid(this.currentType)) {
				return
			}
			const configStore = useSysConfigStore()

			if (this.currentType == this.editTypes.email) {
				// let validEmail = Helper.validEmail(this.currentValue)
				// if (!validEmail) {
				// 	return configStore.addErrorMessage({ id: 'invalid_edit_email', msg: useNuxtApp().$t('E0008') })
				// }
				// this.assignVerifyData({ email_copy: this.currentValue })
				// this.toVerify(this.editTypes.email, this.currentValue)
				// this.sendCode()

				// if (configStore.config.account_verify_config.email) {
				this.assignVerifyData({ email_copy: this.currentValue })
				this.toVerify(this.editTypes.email, this.currentValue)
				this.sendCode()
				return

				// let validEmail = Helper.validEmail(this.currentValue)
				// if (!validEmail) {
				// 	return configStore.addErrorMessage({ id: 'invalid_edit_email', msg: useNuxtApp().$t('E0008') })
				// }
				// if (configStore.config.account_verify_config.email) {
				// 	this.assignVerifyData({ email_copy: this.currentValue })
				// 	this.toVerify(this.editTypes.email, this.currentValue)
				// 	this.sendCode()
				// 	return
				// }
				// let body = { email: this.currentValue }
				// useBindEmail(
				// 	{ body },
				// 	(res: any) => {
				// 		this.verifyData.email = body.email
				// 		this.mounted()
				// 		this.changePageType(this.pageTypes.lobby)
				// 		googleEvent({ event: 'edit_email', mobile: this.verifyData.email })
				// 	},
				// 	(err: any) => {
				// 		HallLog.error('useBindEmail error', err)
				// 	}
				// )
			} else if (this.currentType == this.editTypes.emailCode) {
			} else if (this.currentType == this.editTypes.tel) {
				let validPhone = Helper.validPhone(this.editAcode, this.currentValue)
				// if (!validPhone) {
				// 	return configStore.addErrorMessage({ id: 'invalid_edit_phone', msg: useNuxtApp().$t('E0009') })
				// }
				// if (configStore.config.account_verify_config.phone) {
				this.assignVerifyData({ acode_copy: this.editAcode, phone_copy: this.currentValue })

				this.toVerify(this.editTypes.tel, this.currentValue)
				this.sendCode()
				return
				// }
				// let phone = await Global.AESUtil.rsaEncryptPhone(this.currentValue)
				// const savePhone = this.currentValue
				// let body = { acode: Helper.getAcodeFormat(this.editAcode), phone: phone }
				// useBindPhone(
				// 	{ body },
				// 	(res: any) => {
				// 		this.verifyData.acode = '+' + body.acode
				// 		this.verifyData.phone = savePhone
				// 		this.mounted()
				// 		this.changePageType(this.pageTypes.lobby)
				// 		googleEvent({ event: 'edit_mobile', mobile: this.verifyData.phone })
				// 	},
				// 	(err: any) => {
				// 		// HallLog.error('useBindPhone error', err)
				// 	}
				// )
			} else if (this.currentType == this.editTypes.newPassword) {
				let body = {
					pwd: Md5Util.encode(this.addNewPassword),
				}
				useAddPassword(
					{ body },
					(res: any) => {
						useSysConfigStore().addErrorMessage({ id: 'change_password_success', msg: useNuxtApp().$t('U0031'), type: 'success' })
						this.changePageType(this.pageTypes.lobby)
					},
					(err: any) => {
						// HallLog.error('useEditPassword error', err)
					}
				)
			} else if (this.currentType == this.editTypes.password) {
				if (this.validError.newPasswordError || this.validError.confirmPasswordError || this.editNewPassword != this.editConfirmPassword) {
					return
				}

				let body = {
					pwd: Md5Util.encode(this.editCurrentPassword),
					new_pwd: Md5Util.encode(this.editNewPassword),
				}
				useEditPassword(
					{ body },
					(res: any) => {
						useSysConfigStore().addErrorMessage({ id: 'change_password_success', msg: useNuxtApp().$t('U0031'), type: 'success' })
						this.changePageType(this.pageTypes.lobby)
					},
					(err: any) => {
						// HallLog.error('useEditPassword error', err)
					}
				)
			} else if (this.currentType == this.editTypes.account) {
				let body = { account: this.currentValue }
				useSaveLoginAccount(
					{ body },
					(res: any) => {
						useUserStore().setUserInfo(body)
						this.mounted()
						useSysConfigStore().addErrorMessage({ id: 'save_login_success', msg: useNuxtApp().$t('U0024'), type: 'success' })
						this.changePageType(this.pageTypes.lobby)
					},
					(err: any) => {
						// HallLog.error('useEditPassword error', err)
					}
				)
			} else if (this.currentType == this.editTypes.birth) {
				let body = { birth: this.birth.year + '/' + this.birth.month + '/' + this.birth.date }
				this.updateUserInfo(body)
			} else if (this.currentType == this.editTypes.real_name) {
				let body = { real_name: this.currentValue }
				this.updateUserInfo(body)
			} else {
				let body = { nickname: this.currentValue }
				this.updateUserInfo(body)
			}
		},
		// 个人简历 保存
		updateProfile() {
			let body = {
				headimg: String(this.avatarIndex),
				nickname: this.currentValue,
			}
			this.isUpdateProfile = true
			this.updateUserInfo(body)
		},
		async updateUserInfo(body: any) {
			useEditUserInfo(
				{ body },
				(res: any) => {
					if (this.isUpdateProfile) {
						this.back()
						this.isUpdateProfile = false
					}
					useUserStore().setUserInfo(body)
					let id = Object.keys(body)
						.map((el) => el)
						.join('_')
					this.mounted()
					useSysConfigStore().addErrorMessage({
						id: `bind_success_${id}`,
						msg: useNuxtApp().$t('U0024'),
						type: 'success',
					})
					if (this.currentPage != this.pageTypes.lobby) {
						this.changePageType(this.pageTypes.lobby)
					}
				},
				(err: any) => {
					this.isUpdateProfile = false
					// HallLog.error('useEditUserInfo error', err)
				}
			)
		},
		async sendPhoneCode() {
			if (timerIsPlay(this.timerKey)) {
				return
			}
			let retry = this.phoneRetry > 0 ? 1 : 0
			let phone = this.verifyData.phone_copy || this.currentValue
			let result = await Global.AESUtil.rsaEncryptPhone(phone)
			let body = {
				phone: result,
				acode: Helper.getAcodeFormat(this.editAcode),
				code_type: 4,
				verify_type: 0,
				retry: retry,
			}
			// 如果用户之前没有邮箱手机 code_type传1
			if (this.hasTel == false) {
				body.code_type = 1
			}
			useGetVerifyCode(
				{ body },
				(res: any) => {
					const { addErrorMessage } = useSysConfigStore()
					this.phoneRetry++
					startTimer(this.timerKey)
					this.phoneTime = Date.now()
					addErrorMessage({ id: 'bind_phone_verify_success', msg: useNuxtApp().$t('E0006'), type: 'success' })
				},
				(err: any) => {
					pauseTimer(this.timerKey)
					// HallLog.error('useGetVerifyCode error', err)
				}
			)
		},
		sendEmailCode() {
			if (timerIsPlay(this.timerKey)) {
				return
			}
			let retry = this.emailRetry > 0 ? 1 : 0
			let body = {
				verify_type: 1,
				email: this.currentValue,
				code_type: 4,
				retry,
			}
			// 如果用户之前没有邮箱手机 code_type传1
			if (this.hasEmail == false) {
				body.code_type = 1
			}
			useGetVerifyCode(
				{ body },
				(res: any) => {
					const { addErrorMessage } = useSysConfigStore()
					this.emailRetry++
					this.emailTime = Date.now()
					startTimer(this.timerKey)
					addErrorMessage({ id: 'bind_phone_verify_success', msg: useNuxtApp().$t('E0006'), type: 'success' })
				},
				(err: any) => {
					pauseTimer(this.timerKey)
					// HallLog.error('useGetVerifyCode error', err)
				}
			)
		},
		sendCode() {
			if (this.currentType == this.editTypes.tel) {
				this.sendPhoneCode()
			} else {
				this.sendEmailCode()
			}
		},
		async saveVerify() {
			const { addErrorMessage } = useSysConfigStore()
			const app = useNuxtApp()
			if (this.code == '' || this.code.length != 6) {
				this.validError.verify = true
				return
			} else {
				this.validError.verify = false
			}
			if (this.currentType == this.editTypes.tel) {
				let savePhone = this.verifyData.phone_copy || this.verifyData.phone
				let phone = await Global.AESUtil.rsaEncryptPhone(savePhone)
				let body = { code: this.code, acode: Helper.getAcodeFormat(this.editAcode), phone: phone }
				this.saveUserPhone(body, savePhone)
			} else {
				let email = this.verifyData.email_copy || this.verifyData.email
				if (!Helper.validEmail(email)) {
					addErrorMessage({ id: 'error_bind_email_none', msg: app.$t('E0008') })
					return
				}
				let body = { code: this.code, email: email }
				this.saveUserEmail(body)
			}
		},
		changePageType(page: string, create = true) {
			let oldPage = this.currentPage
			this.code = ''
			if (oldPage != page) {
				this.currentPage = page
				if (oldPage == this.pageTypes.verify) {
					pauseTimer(this.timerKey)
				} else if (this.currentPage == this.pageTypes.verify) {
					if (create) {
						this.createTimer()
					}
				}
			}
		},
		refreshData() {
			this.isInit = true
			const userStore = useUserStore()
			// let { phone, real_name, fname, lname, birth, country, city, account, postal_code, state, street_address, nickname, email } =
			let { phone, phone_bind, real_name, birth, account, state, nickname, email, email_bind, is_set_password } = userStore.data
			if (phone) this.hasTel = true
			if (email) this.hasEmail = true
			// 判断real_name是否包含#& 有则删除
			if (real_name && real_name.indexOf('#&') != -1) {
				real_name = real_name.replace('#&', '')
			}
			// let arr: any = []
			// if (real_name) {
			// 	arr = real_name.split('#&')
			// }
			// if (country) {
			// 	const countrys = useSysConfigStore().countrys
			// 	const list = countrys.state_list || []
			// 	this.countryIndex = countrys.findIndex((el: any) => el.key == country)
			// 	if (this.countryIndex != -1) {
			// 		if (state) {
			// 			this.stateIndex = countrys[this.countryIndex].state_list.findIndex((el: any) => el == state)
			// 		}
			// 	} else {
			// 		this.stateIndex = -1
			// 	}
			// }
			let birthArr = (birth || '').split('/')
			let phoneArr = (phone || '').split(' ').filter((el) => el)
			let acode = phoneArr[0] || useAcode().value
			if (acode.indexOf('+') == -1) {
				acode = '+' + acode
			}
			this.assignVerifyData({ acode: phoneArr[0] || useAcode().value })
			this.assignVerifyData({ phone: phoneArr[1] || '' })
			this.assignVerifyData({ email: email || '' })
			this.assignVerifyData({ account: account || '' })
			this.assignVerifyData({ nickname: nickname || '' })
			this.assignVerifyData({ real_name: real_name || '' })
			this.assignVerifyData({ phone_bind: phone_bind || '' })
			this.assignVerifyData({ email_bind: email_bind || '' })
			this.assignVerifyData({ is_set_password: is_set_password || '' })
			this.birth.year = birthArr[0] || ''
			this.birth.month = birthArr[1] || ''
			this.birth.date = birthArr[2] || ''
			// this.personalInfo.fname = fname || arr[0] || ''
			// this.personalInfo.lname = lname || arr[1] || ''
			// this.personalInfo.city = city
			// this.personalInfo.postal_code = postal_code
			// this.personalInfo.street_address = street_address
		},
		setCurrentTime() {
			this.currentTime = Date.now()
			HallLog.log('update reset page current time:', this.currentTime)
		},
		createTimer() {
			registerTimer(this.timerKey, this.setCurrentTime)
		},
		mounted() {
			this.duration = useSysConfigStore().getCodeDuration
			this.refreshData()
			useUserStore()
				.getUserInfo()
				.finally(() => {
					this.refreshData()
				})
		},
		unmounted() {
			this.showPcTitle = true
			this.changePageType(this.pageTypes.lobby)
			removeTimer(this.timerKey)
		},
	},
	getters: {
		// pageTitile: (state) => {
		// 	if (state.currentPage == state.pageTypes.lobby) return 'U0001'
		// 	if (state.currentType == state.editTypes.email) return 'U0026'
		// 	if (state.currentType == state.editTypes.nickname) return 'U0025'
		// 	if (state.currentType == state.editTypes.password) return 'U0028'
		// 	if (state.currentType == state.editTypes.tel) return 'U0027'
		// 	if (state.currentType == state.editTypes.birth) return 'ST0003'
		// 	if (state.currentType == state.editTypes.account) return 'U0001'
		// 	return 'U0001'
		// },
		//所选国家地区列表
		stateList: (state) => useSysConfigStore().countrys[state.countryIndex]?.state_list || [],
		inLobbyPage: (state) => state.currentPage === state.pageTypes.lobby,
		//手机邮件验证信息
		sendText: (state) => {
			let result = 0
			const way = state.currentType == state.editTypes.tel ? 1 : 0
			const sendTime = way == LoginWayEnum.email ? state.emailTime : state.phoneTime
			const retry = way == LoginWayEnum.email ? state.emailRetry : state.phoneRetry
			const duration = state.duration[way]
			if (sendTime) {
				result = getTimestamp(duration - (state.currentTime - sendTime) / 1000)
			}
			if (result <= 0) {
				pauseTimer(state.timerKey)
				if (retry) {
					return {
						text: useNuxtApp().$t('L1021'),
						disabled: 0,
					}
				} else {
					return {
						text: useNuxtApp().$t('U0019'),
						disabled: 0,
					}
				}
			} else {
				if (!isTimerExist(state.timerKey)) {
					state.createTimer()
				} else {
					startTimer(state.timerKey)
				}

				if (way == LoginWayEnum.email) {
					state.emailRetry = 1
				} else {
					state.phoneRetry = 1
				}
				return {
					// text: useNuxtApp().$t('U0020', { second: result }),
					text: useNuxtApp().$t('REW0011') + ' ' + result + 's',
					disabled: 1,
				}
			}
		},
		isEditPassword: (state) => state.currentType === state.editTypes.password,
		isNewPassword: (state) => state.currentType === state.editTypes.newPassword,
		editConfirmPasswordValid: (state) => state.editNewPassword !== state.editConfirmPassword,
		editPlaceholder: (state) => {
			switch (state.currentType) {
				case 'email':
					return 'L1006'
				case 'tel':
					return 'U0011'
				default:
					return 'U0011'
			}
		},
	},
})
