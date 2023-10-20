import { useSysConfigStore } from './config'
import { defineStore } from 'pinia'
import { mapFace } from '~~/apis/types'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
export const useWithdrawStore = defineStore({
	id: 'withdraw-store',
	state: () => {
		return {
			typeIndex: 0,
			currentPay: <mapFace>{ data: [] },
			amount: null,
			usdtAmount: null,
			pay_list: <Array<any>>[],
			pay_map: <any>{},
			cpfPayResult: <mapFace>{},
			usdtPayResult: <mapFace>{},
			config: <mapFace>{ usdt_status: 0, usdt_rate: 100 },
			copy_list: <any[]>[], //服务端数据
			currentChannel: 0,
			inputAmountError: false,
			pixNameError: false,
			pixAccountError: false,
			pixAccountErroeMessage: '',
			inputAmountMessage: '',
			usdtAddressError: false,
			speiFNameError: false,
			speiLNameError: false,
			speiAccountError: false,
		}
	},
	actions: {
		validTrc(address: string) {
			return new Promise((resolve, reject) => {
				const options: any = {
					method: 'POST',
					headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
					body: JSON.stringify({ address }),
				}
				useFetch('https://api.trongrid.io/wallet/validateaddress', options)
					.then((response: any) => {
						resolve(response.data.value.result)
					})
					.catch((err) => {
						HallLog.error('withdraw validTrc error', err)
						reject(false)
					})
			})
		},
		goWithdraw(item: mapFace) {
			this.currentPay = item
			this.changeCurrentChannel(0)
		},
		mobileBack() {
			if (this.currentPayInfo.put_type) {
				this.initPayInfo()
			} else {
				closePopup()
			}
		},
		getIconKeyByGroupId(group_id: any) {
			return group_id == PutGroupEnum.pix ? 'pix' : group_id == PutGroupEnum.usdt ? 'usdt' : group_id == PutGroupEnum.spei ? 'spei' : ''
		},
		initPayInfo() {
			this.currentPay = { data: [] }
			this.changeCurrentChannel(0)
		},
		changeCurrentChannel(currentChannel: number) {
			this.currentChannel = currentChannel
			this.initError()
		},
		initError() {
			this.inputAmountError = false
			this.pixNameError = false
			this.pixAccountError = false
			this.pixAccountErroeMessage = ''
			this.inputAmountMessage = ''
			this.usdtAddressError = false
			this.speiFNameError = false
			this.speiLNameError = false
			this.speiAccountError = false
		},
		back() {
			if (!this.currentPay.group_id) {
				this.initPayInfo()
				closePopup()
			} else {
				this.initPayInfo()
			}
		},
		async getWithdrawInfo() {
			if (window.web_promise) {
				await window.web_promise
				window.web_promise = null
			}

			const method = useSysConfigStore().checkVersionConfig.put_version ? useGetPutList : useGetWithdrawChannel
			method(
				{},
				(res: any) => {
					HallLog.logObj('useGetPutList: ', res)
					this.config = { usdt_rate: res.usdt_rate || 100 }
					let list = res.data || []
					let maps: any = {}

					list.forEach((el: any) => {
						if (el.group_id) {
							el.put_type_name_lang = el.put_type_name_lang || el.put_type_name || {}
							el.put_server_charge_set = el.put_server_charge_set || el.fee_setting || []
							el.bind_info = el.bind_info || {}
							if (!el.bind_info.entrus_bank_account) {
								el.bind_info.status = true
							}
							if (el.put_type == PutTypeEnum.pixCpf) {
								if (el.bind_info.entrus_bank_account) {
									let list = el.bind_info.entrus_bank_account.split('')
									list.splice(9, 0, '-')
									list.splice(6, 0, '.')
									list.splice(3, 0, '.')
									el.bind_info.entrus_bank_account = list.join('')
								}
							}
							if (el.put_type == PutTypeEnum.pixCnpj) {
								if (el.bind_info.entrus_bank_account) {
									let list = el.bind_info.entrus_bank_account.split('')
									list.splice(12, 0, '-')
									list.splice(8, 0, '/')
									list.splice(5, 0, '.')
									list.splice(2, 0, '.')
									el.bind_info.entrus_bank_account = list.join('')
								}
							}
							if (el.put_type == PutTypeEnum.pixPhone) {
								if (el.bind_info.entrus_bank_account) {
									let list = el.bind_info.entrus_bank_account.split('#')
									el.bind_info.acode = list[0] || useAcode().value
									el.bind_info.entrus_bank_account = list[1]
								} else {
									el.bind_info.acode = useAcode().value
									el.bind_info.entrus_bank_account = ''
								}
							}
							let list = el.bind_info.entrus_bank_user.split('#')
							el.bind_info.full_name = el.bind_info.entrus_bank_user.replaceAll('#', ' ')
							el.bind_info.first_name = list[0] || ''
							el.bind_info.last_name = list[1] || ''
							delete el.bind_info.entrus_bank_user
							if (maps[el.group_id]) {
								maps[el.group_id].data.push(el)
								if (maps[el.group_id].min_put_point > el.min_put_point) {
									maps[el.group_id].min_put_point = el.min_put_point
								}
								if (maps[el.group_id].max_put_point < el.max_put_point) {
									maps[el.group_id].max_put_point = el.max_put_point
								}
							} else {
								maps[el.group_id] = {
									group_id: el.group_id,
									group_name: el.group_name,
									min_put_point: el.min_put_point,
									max_put_point: el.max_put_point,
									data: [el],
								}
							}
						}
					})
					for (let key in maps) {
						if (maps[key].data.length > 1) {
							maps[key].data.sort((a: any, b: any) => {
								if (a.sort == b.sort) {
									return a.put_type > b.put_type ? 1 : -1
								} else {
									return a.sort > b.sort ? 1 : -1
								}
							})
						}
					}
					let pay_list = Object.values(maps) || []
					pay_list.sort((a: any, b: any) => {
						let ad = a.data[0]
						let bd = b.data[0]
						if (ad.sort == bd.sort) {
							return ad.put_type > bd.put_type ? 1 : -1
						} else {
							return ad.sort > bd.sort ? 1 : -1
						}
					})
					this.pay_list = pay_list
					this.copy_list = JSON.parse(JSON.stringify(pay_list))
					this.pay_map = maps
					HallLog.logObj('list==========================>', pay_list)
				},
				(err: any) => {
					// HallLog.error('useGetBankInfo error', err)
				}
			)
		},
		doUsdtWithdraw() {
			// 5411ed0f8e30af997fd85159dcb919fe88dae23a8ab976453e3025f66773a1f9
			const { addErrorMessage } = useSysConfigStore()
			if (this.amountError) {
				addErrorMessage({ id: 'error_usdt_point', msg: this.withdrawTips })
				return
			}
			let address = this.currentPayInfo.bind_info.entrus_bank_account
			if (address == '') {
				addErrorMessage({ id: 'error_adderess_empty', msg: 'address empty' })
				return
			}

			this.validTrc(address)
				.then((res) => {
					if (!res) {
						addErrorMessage({ id: 'invalid_address', msg: useNuxtApp().$t('W0022') })
					} else {
						const configStore = useSysConfigStore()
						let point = Number(this.usdtAmount)
						let params = {
							point: point,
							put_type: this.currentPayInfo.put_type,
							account: address,
							usdt_rate: this.config.usdt_rate,
							usdt_point: parseInt(
								(parseFloat(((point / this.config.usdt_rate) * 100).toFixed(3)) * configStore.config.point_ratio).toFixed(0)
							),
						}
						let find
						for (let key in this.copy_list) {
							let list = this.copy_list[key].data || []
							find = list.find((el: any) => el.put_type == this.currentPayInfo.put_type)
							if (find) {
								break
							}
						}
						if (
							find &&
							find.bind_info.status &&
							find.bind_info.entrus_bank_account != this.currentPayInfo.bind_info.entrus_bank_account
						) {
							let body = {
								body: {
									account: this.currentPayInfo.bind_info.entrus_bank_account,
									name: '',
									put_type: this.currentPayInfo.put_type,
									errname: useNuxtApp().$pt(this.currentPayInfo.put_type_name_lang),
								},
								loading: 2,
							}
							this.bindInfo(body, params)
						} else {
							this.toWithdraw(params)
						}
					}
				})
				.catch((err) => {
					HallLog.error('doUsdtWithdraw validTrc error', err)
					addErrorMessage({ id: 'invalid_address', msg: useNuxtApp().$t('W0022') })
				})
		},
		doPixWithdraw() {
			const { addErrorMessage } = useSysConfigStore()
			let account: any = this.currentPayInfo.bind_info.entrus_bank_account
			if (this.currentPayInfo.put_type == PutTypeEnum.pixPhone) {
				account = this.currentPayInfo.bind_info.acode.replace('+', '') + '#' + account
			}

			if (this.currentPayInfo.put_type == PutTypeEnum.pixCpf) {
				account = account.replace(/[^0-9]/gi, '')
				if (!account || account.length < 11 || !Helper.validCpf(account)) {
					addErrorMessage({ id: 'erorr_pix_cpf_error', msg: useNuxtApp().$t('D0013') })
					return
				}
			}

			if (this.currentPayInfo.put_type == PutTypeEnum.pixCnpj) {
				account = account.replace(/[^0-9]/gi, '')
				if (!account || account.length < 14 || !Helper.validCnpj(account)) {
					addErrorMessage({ id: 'erorr_pix_cnpj_error', msg: useNuxtApp().$t('D0041') })
					return
				}
			}
			let params = {
				point: Number(this.amount),
				put_type: this.currentPayInfo.put_type, //pix
			}
			if (this.currentPayInfo.bind_info.status) {
				let body = {
					body: {
						account: account,
						name: this.currentPayInfo.bind_info.full_name,
						put_type: this.currentPayInfo.put_type,

						errname: useNuxtApp().$pt(this.currentPayInfo.put_type_name_lang),
					},
					loading: 2,
				}
				this.bindInfo(body, params)
			} else {
				this.toWithdraw(params)
			}
		},
		validSpeiLeng(account: string) {
			let result = account.length == 10
			if (!result) {
				result = account.length == 16
			}
			if (!result) {
				result = account.length == 18
			}
			return result
		},
		doSpeiWithdraw() {
			const { addErrorMessage } = useSysConfigStore()
			let account: any = this.currentPayInfo.bind_info.entrus_bank_account || ''
			let lenValid = this.validSpeiLeng(account)

			if (!account || !lenValid) {
				addErrorMessage({ id: 'erorr_spei_error', msg: useNuxtApp().$t('W0032') })
				return
			}
			let params = {
				point: Number(this.amount),
				put_type: this.currentPayInfo.put_type, //pix
			}

			if (this.currentPayInfo.bind_info.status) {
				let body = {
					body: {
						account: account,
						name: `${this.currentPayInfo.bind_info.first_name}#${this.currentPayInfo.bind_info.last_name}`,
						put_type: this.currentPayInfo.put_type,
						errname: useNuxtApp().$pt(this.currentPayInfo.put_type_name_lang),
					},
					loading: 2,
				}
				this.bindInfo(body, params)
			} else {
				this.toWithdraw(params)
			}
		},
		validAmount() {
			this.inputAmountError = !!this.amountError
			return this.inputAmountError
		},
		validPixName() {
			let put_type = this.currentPayInfo.put_type
			if (resConfig.withdrawPixConfig.emailPhoneNeedName || put_type == PutTypeEnum.pixCpf || put_type == PutTypeEnum.pixCnpj) {
				this.pixNameError = this.fullnameError
			} else {
				this.pixNameError = false
			}

			return this.pixNameError
		},
		validPixAccount() {
			let account = this.currentPayInfo.bind_info.entrus_bank_account

			if (this.currentPayInfo.put_type == PutTypeEnum.pixCpf) {
				account = account.replace(/[^0-9]/gi, '')
				if (!account || account.length < 11 || !Helper.validCpf(account)) {
					this.pixAccountError = true
					this.pixAccountErroeMessage = useNuxtApp().$t('D0013')
				}
			} else if (this.currentPayInfo.put_type == PutTypeEnum.pixCnpj) {
				account = account.replace(/[^0-9]/gi, '')
				if (!account || account.length < 14 || !Helper.validCnpj(account)) {
					this.pixAccountError = true
					this.pixAccountErroeMessage = useNuxtApp().$t('D0041')
				}
			} else if (this.currentPayInfo.put_type == PutTypeEnum.pixEmail) {
				this.pixAccountError = !account
				// todo update lang
				this.pixAccountErroeMessage = ''
			} else if (this.currentPayInfo.put_type == PutTypeEnum.pixPhone) {
				this.pixAccountError = !account
				// todo update lang
				this.pixAccountErroeMessage = ''
			} else {
				this.pixAccountError = false
			}
			return this.pixAccountError
		},
		async validUsdtAddress() {
			this.usdtAddressError = !this.currentPayInfo.bind_info.entrus_bank_account
			if (!this.usdtAddressError) {
				let res = await this.validTrc(this.currentPayInfo.bind_info.entrus_bank_account)
				this.usdtAddressError = !res
			}
			return this.usdtAddressError
		},
		validSpeiFName() {
			this.speiFNameError = this.fnameError
			return this.speiFNameError
		},
		validSpeiLName() {
			this.speiLNameError = this.lnameError
			return this.speiLNameError
		},
		validSpeiAccount() {
			this.speiAccountError = !this.validSpeiLeng(this.currentPayInfo.bind_info.entrus_bank_account || '')
			return this.speiAccountError
		},
		changeSpeiType() {
			this.initError()
		},
		async clickWithdraw(type?: number) {
			if (type == PutGroupEnum.usdt) {
				let res = await this.validUsdtAddress()
				if (res) return
				if (this.validAmount()) return
			} else if (type == PutGroupEnum.pix) {
				if (this.validPixName()) return
				if (this.validPixAccount()) return
				if (this.validAmount()) return
			} else if (type == PutGroupEnum.spei) {
				if (this.validSpeiFName()) return
				if (this.validSpeiLName()) return
				if (this.validSpeiAccount()) return
				if (this.validAmount()) return
			}
			if (useSysConfigStore().wallet_type == 1 && useUserStore().data.user_point.bonusCode > 0) {
				const $t = useNuxtApp().$t
				let dialog = {
					title: $t('D0029'),
					text: $t('W0034'),
					ok_text: $t('D0028'),
					cancel_text: $t('L1023'),
					ok: () => {
						if (type == PutGroupEnum.usdt) {
							this.doUsdtWithdraw()
						} else if (type == PutGroupEnum.pix) {
							this.doPixWithdraw()
						} else if (type == PutGroupEnum.spei) {
							this.doSpeiWithdraw()
						}
					},
				}
				useDialogStore().open(dialog)
			} else {
				if (type == PutGroupEnum.usdt) {
					this.doUsdtWithdraw()
				} else if (type == PutGroupEnum.pix) {
					this.doPixWithdraw()
				} else if (type == PutGroupEnum.spei) {
					this.doSpeiWithdraw()
				}
			}
		},
		bindInfo(body: any, params: any) {
			useBindPutAccountInfo(body, (res: any) => {
				HallLog.logObj('useBindPutAccountInfo===========================>', res)
				this.currentPayInfo.bind_info.status = false
				this.toWithdraw(params)
			})
		},
		toWithdraw(params: any) {
			let method = useApplyCashv2
			if (!useSysConfigStore().checkVersionConfig.put_version) {
				method = useUserWithdraw
			}

			method(
				{ body: params, loading: 2 },
				(res: any) => {
					HallLog.logObj('useApplyCashv2===========================>', res)
					// let from = Global.Setting.storage.getObject("WDDATA") || {};
					// let aesUid = Global.AESUtil.aesEncryptWithCommonKey(`${this.userInfo.uid}`);
					// from[aesUid] = { attach: Global.AESUtil.aesEncryptWithCommonKey(JSON.stringify(attach)) };
					// Global.Setting.storage.setObject("WDDATA", from);
					// this.$store.dispatch("User/updateUserPoint");
					this.amount = null
					this.usdtAmount = null
					useSysConfigStore().addErrorMessage({ id: 'withdraw_success', msg: useNuxtApp().$t('W0023'), type: 'success' })
				},
				(err: any) => {
					// HallLog.error('useApplycash error', err)
				}
			)
			// .catch((err) => {
			// 	if (err.clear) {
			// 		err.clear();
			// 	}

			// 	if (err._errno != 1185) {
			// 		useSysConfigStore().addErrorMessage({ id: "withdraw-system-failed", msg: Helper.getErrnoStr(err) });
			// 	} else {
			// 		// this.globalDialog({
			// 		// 	content: this.$Helper.getErrnoStr(err),
			// 		// 	showCancel: true,
			// 		// 	confirmText: 1205,
			// 		// 	confirmFunc: () => {
			// 		// 		this.$router.push('/live-chat');
			// 		// 	},
			// 		// });
			// 	}
			// });
			googleEvent({ event: 'withdraw', event_type: 'af_withdraw', moneyValue: params.point })
		},
		getTips(min: any, max: any) {
			let list = []
			let app = useNuxtApp()
			let configStore = useSysConfigStore()
			list.push(app.$t('D0012', { symbol: configStore.currency_symbol, point: app.$fp(min) }))
			if (max) {
				list.push(app.$t('D0023', { symbol: configStore.currency_symbol, point: app.$fp(max) }))
			}
			return list
		},
		cpfInputFormat(newValue: string, oldValue: string) {
			let initValue = newValue
			let value = newValue.replace(/[^0-9]/g, '')
			let list = value.split('')
			if (oldValue.length < initValue.length) {
				if (list.length >= 9) {
					list.splice(9, 0, '-')
				}
				if (list.length >= 6) {
					list.splice(6, 0, '.')
				}
				if (list.length >= 3) {
					list.splice(3, 0, '.')
				}
			} else {
				if (list.length > 9) {
					list.splice(9, 0, '-')
				}
				if (list.length > 6) {
					list.splice(6, 0, '.')
				}
				if (list.length > 3) {
					list.splice(3, 0, '.')
				}
			}
			return list.join('')
		},
		cnpjInputFormat(newValue: string, oldValue: string) {
			let initValue = newValue
			let value = initValue.replace(/[^0-9]/g, '')
			let list = value.split('')
			if (oldValue.length < initValue.length) {
				if (list.length >= 12) {
					list.splice(12, 0, '-')
				}
				if (list.length >= 8) {
					list.splice(8, 0, '/')
				}
				if (list.length >= 5) {
					list.splice(5, 0, '.')
				}
				if (list.length >= 2) {
					list.splice(2, 0, '.')
				}
			} else {
				if (list.length > 12) {
					list.splice(12, 0, '-')
				}
				if (list.length > 8) {
					list.splice(8, 0, '/')
				}
				if (list.length > 5) {
					list.splice(5, 0, '.')
				}
				if (list.length > 2) {
					list.splice(2, 0, '.')
				}
			}
			return list.join('')
		},
		cpfPasteFormat(event: any) {
			event?.preventDefault()
			let value = (event.clipboardData.getData('text') || '').replace(/[^0-9]/g, '')
			if (!value) return ''
			let list = value.split('')
			if (list.length > 9) {
				list.splice(9, 0, '-')
			}
			if (list.length > 6) {
				list.splice(6, 0, '.')
			}
			if (list.length > 3) {
				list.splice(3, 0, '.')
			}
			value = list.join('')
			event.target.value = value
			if (this.currentPayInfo.bind_info) {
				this.currentPayInfo.bind_info.entrus_bank_account = value
			}
			useAccountStore().currentValue2 = value
		},
		cnpjPasteFormat(event: any) {
			event?.preventDefault()
			let value = (event.clipboardData.getData('text') || '').replace(/[^0-9]/g, '')
			if (!value) return ''
			let list = value.split('')
			if (list.length > 12) {
				list.splice(12, 0, '-')
			}
			if (list.length > 8) {
				list.splice(8, 0, '/')
			}
			if (list.length > 5) {
				list.splice(5, 0, '.')
			}
			if (list.length > 2) {
				list.splice(2, 0, '.')
			}
			value = list.join('')
			event.target.value = value
			if (this.currentPayInfo.bind_info) {
				this.currentPayInfo.bind_info.entrus_bank_account = value
			}
			useAccountStore().currentValue2 = value
		},
		mounted() {
			this.initPayInfo()
			this.getWithdrawInfo()
			const userStore = useUserStore()
			userStore.getUserInfo()
		},
	},
	getters: {
		currentPayInfo: (state): any => {
			let result = { name: '', put_server_charge_set: [], max_put_point: 0, min_put_point: 0, bind_info: { status: true } }
			if (state.currentPay && state.currentPay.data && state.currentPay.data[state.currentChannel]) {
				result = state.currentPay.data[state.currentChannel]
			}
			return result
		},
		withdrawPoint: (state): any => {
			let result: any = 0
			const userStore = useUserStore()
			if (userStore.data.user_point.code <= 0) {
				result = userStore.data.point
			}
			return result
		},
		fullnameError: (state: any) => useSysConfigStore().realnameError(state.currentPayInfo.bind_info.full_name),
		fnameError: (state: any) => useSysConfigStore().nameError(state.currentPayInfo.bind_info.first_name),
		lnameError: (state: any) => useSysConfigStore().nameError(state.currentPayInfo.bind_info.last_name),
		inLobbyPage: (state) => !state.currentPay.group_id,
		isInPixPage: (state) => state.currentPay.group_id == PutGroupEnum.pix,
		isInSqeiPage: (state) => state.currentPay.group_id == PutGroupEnum.spei,
		usdtDisabled: (state: any) => state.amountError || !state.currentPayInfo.bind_info.entrus_bank_account,
		pixWithdrawDisabled: (state: any) => {
			let base = !!(state.amountError || !state.currentPayInfo.bind_info.entrus_bank_account)
			if (base) {
				return base
			}
			let put_type = state.currentPayInfo.put_type
			if (resConfig.withdrawPixConfig.emailPhoneNeedName || put_type == PutTypeEnum.pixCpf || put_type == PutTypeEnum.pixCnpj) {
				return state.fullnameError
			}
			// if (put_type == PutTypeEnum.pixCpf) {
			// 	return !Helper.validCpf(state.currentPayInfo.bind_info.entrus_bank_account)
			// } else if (put_type == PutTypeEnum.pixPhone) {
			// 	return !Helper.validPhone(state.currentPayInfo.bind_info.acode, state.currentPayInfo.bind_info.entrus_bank_account)
			// } else if (put_type == PutTypeEnum.pixEmail) {
			// 	return !Helper.validEmail(state.currentPayInfo.bind_info.entrus_bank_account)
			// } else if (put_type == PutTypeEnum.pixCnpj) {
			// 	return !Helper.validCnpj(state.currentPayInfo.bind_info.entrus_bank_account)
			// }
			return base
		},
		speiWithdrawDisabled: (state: any) => {
			let base = !!(state.amountError || state.fnameError || state.lnameError)
			if (base) return base
			base = !state.validSpeiLeng(state.currentPayInfo.bind_info.entrus_bank_account || '')
			return base
		},
		amountError: (state: any) => {
			let amount = Number(state.usdtAmount)
			if (state.isInPixPage || state.isInSqeiPage) {
				amount = Number(state.amount)
			}
			if (!amount) return true
			let min = state.currentPayInfo.min_put_point || 0
			let result = amount < min
			let max = state.currentPayInfo.max_put_point
			if (!result) {
				if (max) {
					result = amount > max
				}
			}
			return result
		},
		withdrawTips: (state: any) => {
			let min = state.currentPayInfo.min_put_point || 0
			let max = state.currentPayInfo.max_put_point || 0
			let list = state.getTips(min, max)
			let str = list.join(' ')
			return str
		},
		//渲染金额兑换
		getRateHtml: (state: any) => {
			let val: any = state.amount
			val = Number(val)
			let className = ''
			if (Boolean(val)) {
				val -= state.getCurrentFee
				val = Number(val).toFixed(2)
				className = 'warning'
			} else {
				val = '0.00'
			}
			return useNuxtApp().$t('W0012', {
				symbol: useSysConfigStore().currency_symbol,
				point: `<span class="${className}">${useNuxtApp().$fp(val)}</span>`,
			})
		},
		getRateUsdtHtml: (state: any) => {
			let val: any = state.usdtAmount
			val = Number(val)
			let className = ''
			let usdt_rate = Number(state.config.usdt_rate || 100) / 100
			if (Boolean(val)) {
				val -= state.getCurrentFee
				val = (val / usdt_rate).toFixed(2)
				className = 'warning'
			} else {
				val = '0.00'
			}
			return useNuxtApp().$t('W0018', { usdt: `<span class="${className} text-number">${useNuxtApp().$fp(val)}</span>` })
		},
		fee: (state: any) => {
			if (state.currentPayInfo.put_server_charge_set && state.currentPayInfo.put_server_charge_set.length) {
				let value = Number(state.amount) || 0
				if (state.currentPayInfo.group_id == PutGroupEnum.usdt) {
					value = Number(state.usdtAmount) || 0
				}
				let find: any = state.currentPayInfo.put_server_charge_set.find(
					(el: any) => el.min_point <= value && (el.max_point <= 0 || el.max_point > value)
				)

				let fee = find ? find.fee : 0
				return fee
			} else {
				return 0
			}
		},

		getCurrentFee: (state: any) => {
			let value = Number(state.amount) || 0
			if (state.currentPayInfo.group_id == PutGroupEnum.usdt) {
				value = Number(state.usdtAmount) || 0
			}
			return Math.floor((state.fee * value) / 100)
		},

		unableWithdraw: (state) => {
			let { ready_put_code, all_put_code } = useUserStore().data
			ready_put_code = ready_put_code || 0
			return all_put_code && all_put_code > ready_put_code
		},
		accountReadonly: (state) => !state.currentPayInfo.bind_info.status,
		usdtTypeList: (state) => {
			return state.currentPay.group_id == PutGroupEnum.usdt ? state.currentPay.data.map((el: any) => el.put_type_name_lang) : []
		},
		speiTypeList: (state) => {
			return state.currentPay.group_id == PutGroupEnum.spei ? state.currentPay.data.map((el: any) => el.put_type_name_lang) : []
		},
	},
})
