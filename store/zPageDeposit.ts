import { mapFace } from './../apis/types/index'
import HallLog from '~~/apis/debug/HallLog'
import { defineStore } from 'pinia'
import Helper from '~~/apis/tool/Helper'

export const useDepositStore = defineStore({
	id: 'deposit-store',
	state: () => {
		return {
			bClickDeposit: false,
			reqCount: 10,
			timeOut: 0,
			bindInfoList: [],
			currentPayInfo: <mapFace>{ pay_num_list: [], pay_key: '', id: '', bind_info: null },
			amount: <Number>(<unknown>null),
			usdtAmount: <Number>(<unknown>null),
			propsList: <Array<any>>[],
			propsMap: <any>{},
			pay_list: <Array<any>>[],
			payResult: <any>null,
			isHttp: false,
			config: <mapFace>{ usdt_rate: 1, new_pay_info: [] },
			timerKey: 'deposit_timer',
			currentTime: parseInt(`${Date.now() / 1000}`),
			checkedId: '',
			cpfNameError: false,
			cpfAccountError: false,
			cpfAccountErrorMessage: '',
			currencyAmountError: false,
			usdtAmountError: false,
			speiAmountError: false,
		}
	},
	actions: {
		initError() {
			this.cpfNameError = false
			this.cpfAccountError = false
			this.cpfAccountErrorMessage = ''
			this.currencyAmountError = false
			this.usdtAmountError = false
			this.speiAmountError = false
		},
		goDeposit(item: mapFace) {
			this.currentPayInfo = item

			if (item.pay_key == DepositKeyTypeEnum.pix) {
				let put_type_list: any = []
				put_type_list.push(PutTypeEnum.pixCpf)
				put_type_list.push(PutTypeEnum.pixCnpj)
				this.currentPayInfo.bind_info = this.bindInfoList.find((el: any) => put_type_list.indexOf(el.put_type) >= 0)
			}
			if (!this.currentPayInfo.bind_info) {
				this.currentPayInfo.bind_info = {
					status: resConfig.depositPixConfig.needCPF,
					entrus_bank_account: '',
					entrus_bank_user: '',
					full_name: '',
				}
			} else {
				this.currentPayInfo.bind_info.status = false //后端现在认证有问题，前端强制为已认证
				this.currentPayInfo.bind_info.full_name = this.currentPayInfo.bind_info.entrus_bank_user.replaceAll('#', ' ')
			}
		},
		mobileBack() {
			if (this.currentPayInfo.pay_key) {
				this.currentPayInfo = {}
				this.payResult = null
			} else {
				closePopup()
			}
			this.initError()
		},
		back() {
			if (this.currentPayInfo.pay_key) {
				this.currentPayInfo = {}
				this.payResult = null
			} else {
				closePopup()
			}
			this.initError()
		},
		createPayParams(price: number) {
			let find: any = this.propsList.find((el: any) => el.checked) || {}
			if (useSysConfigStore().checkVersionConfig.pay_version) {
				return {
					pay_key: this.currentPayInfo.pay_key,
					pay_type_id: this.currentPayInfo.id,
					price: price,
					activity_id: find.id || 0,
					activity_param: find.activity_param || '',
				}
			} else {
				return {
					id: this.currentPayInfo.id,
					price: parseInt(`${price * 10000}`),
					extra_id: find.id || 0,
					extra_param: find.activity_param || '',
				}
			}
		},
		getBindInfo() {
			useGetPutBindInfo(
				{},
				(res: any) => {
					HallLog.log('useGetPutBindInfo suc', res)
					this.bindInfoList = res.data
				},
				(err: any) => {
					// HallLog.error('useGetPutBindInfo error', err)
				}
			)
		},
		async getPayInfo() {
			if (window.web_promise) {
				await window.web_promise
				window.web_promise = null
			}
			if (this.isHttp) return
			this.isHttp = true
			// if(useSysConfigStore().checkVersionConfig.web_fun) {
			// 	await useSysConfigStore().checkVersionConfig.web_fun
			// }
			const payMethods = useSysConfigStore().checkVersionConfig.pay_version ? useGetPayInfo : useGetPayChannel
			payMethods(
				{},
				(res: any) => {
					this.isHttp = false
					if (res.new_pay_info && res.new_pay_info.length) {
						//旧数据处理
						let list: any[] = []
						res.new_pay_info.forEach((el: any) => {
							el.data = el.data || []
							el.data.forEach((item: any) => {
								item.pay_key = el.pay_key
								if (item.pay_num_list) {
									item.pay_num_list = item.pay_num_list.filter((el: any) => !!el && el >= item.pay_num_min)
								}
								if (typeof item.lang_app_pay == 'string') {
									try {
										item.lang_app_pay = JSON.parse(item.lang_app_pay)
									} catch (error) {
										HallLog.error('pay list lang_app_pay parse error')
									}
								} else {
									item.lang_app_pay = item.lang_app_pay || {}
								}
								list.push(item)
							})
						})
						this.pay_list = list
					} else if (res.data && res.data.length) {
						//新数据处理
						res.data.forEach((el: any) => {
							el.pay_key = el.pay_key
							if (el.pay_num_list) {
								el.pay_num_list = el.pay_num_list.filter((item: any) => !!item && item >= el.pay_num_min)
							}
							el.lang_app_pay = el.pay_text || {}
						})
						this.pay_list = res.data
					}
					this.config = { usdt_rate: res.usdt_rate || 100, new_pay_info: res.data || res.new_pay_info || [] }
					this.config.usdt_rate = parseFloat((this.config.usdt_rate / 100).toFixed(3))
				},
				(err: any) => {
					this.isHttp = false
					// HallLog.error('useGetPayInfo error', err)
				}
			)
		},
		async doUsdtValid() {
			googleEvent({
				sendType: 1,
				event: 'deposit_click',
				type: 'personal',
				module: 'deposit',
				prop: { amount: Number(this.usdtAmount), pay_method: 'USDT' },
			})

			if (this.validUsdtAmountError()) {
				return
			}
			this.doUsdtPay()
		},
		doUsdtPay() {
			const { addErrorMessage } = useSysConfigStore()
			let usdt = Number(this.usdtAmount)
			let params = this.createPayParams(parseFloat(usdt.toFixed(2)))
			this.toPay(params)
		},
		validFullName() {
			if (!this.accountReadonly) {
				this.cpfNameError = useSysConfigStore().realnameError(this.currentPayInfo.bind_info.full_name)
				return this.cpfNameError
			} else {
				this.cpfNameError = false
			}
			return this.cpfNameError
		},
		validAccount() {
			this.cpfAccountError = false
			if (!this.accountReadonly) {
				let account = this.currentPayInfo.bind_info.entrus_bank_account || ''
				account = account.replace(/[^0-9]/gi, '')
				if (account.length < 11 || (account.length == 11 && !Helper.validCpf(account))) {
					this.cpfAccountError = true
					this.cpfAccountErrorMessage = useNuxtApp().$t('D0013')
				}

				if ((account.length > 11 && account.length < 14) || (account.length == 14 && !Helper.validCnpj(account))) {
					this.cpfAccountError = true
					this.cpfAccountErrorMessage = useNuxtApp().$t('D0041')
				}
			}
			return this.cpfAccountError
		},
		validAmount() {
			this.currencyAmountError = this.amountError
			return this.currencyAmountError
		},
		validUsdtAmountError() {
			this.usdtAmountError = this.amountError
			return this.usdtAmountError
		},

		doCpfValid() {
			googleEvent({
				sendType: 1,
				event: 'deposit_click',
				type: 'personal',
				module: 'deposit',
				prop: { amount: Number(this.amount), pay_method: 'PIX' },
			})
			if (this.validFullName()) return
			if (this.validAccount()) return
			if (this.validAmount()) return
			this.doCpfPay()
		},
		doSpeiValid() {
			if (this.validAmount()) return
			this.doSpeiPay()
		},
		doCpfPay() {
			const { addErrorMessage } = useSysConfigStore()
			if (this.amountError) {
				addErrorMessage({ id: 'basepay_amount_error', msg: this.currencyTip })
				return
			}
			if (this.accountReadonly) {
				let params = this.createPayParams(parseFloat(this.amount.toFixed(2)))
				this.toPay(params)
			} else {
				let account: string = this.currentPayInfo.bind_info.entrus_bank_account.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '')
				if (account.length < 11 || (account.length == 11 && !Helper.validCpf(account))) {
					addErrorMessage({ id: 'erorr_pix_cpf_error', msg: useNuxtApp().$t('D0013') })
					return
				}

				if ((account.length > 11 && account.length < 14) || (account.length == 14 && !Helper.validCnpj(account))) {
					addErrorMessage({ id: 'erorr_pix_cnpj_error', msg: useNuxtApp().$t('D0041') })
					return
				}
				let params = {
					body: {
						account: account,
						name: this.currentPayInfo.bind_info.full_name,
						put_type: account.length == 11 ? 7 : 8,
						errname: useNuxtApp().$pt(this.currentPayInfo.put_type_name_lang),
					},
					loading: 2,
				}
				useBindPutAccountInfo(params, (res: any) => {
					HallLog.logObj('doCpfPay useBindPutAccountInfo===========================>', res)
					this.currentPayInfo.bind_info.status = false
					this.doCpfPay()
				})
			}
		},
		doSpeiPay() {
			const { addErrorMessage } = useSysConfigStore()
			if (this.amountError) {
				addErrorMessage({ id: 'basepay_amount_error', msg: this.currencyTip })
				return
			}
			let params = this.createPayParams(parseFloat(this.amount.toFixed(2)))
			this.toPay(params)
		},
		toPay(params: any) {
			if (this.propsList && this.propsList.length && !this.propsList.some((el: any) => el.checked)) {
				const { $t } = useNuxtApp()
				useDialogStore().open({
					title: $t('D0029'),
					text: $t('D0027'),
					ok: () => {
						this.doRealPay(params)
					},
					cancel_text: $t('L1023'),
					ok_text: $t('D0028'),
				})
			} else {
				this.doRealPay(params)
			}
		},
		doRealPay(params: any) {
			this.bClickDeposit = true
			const userLoading = useUserLoading()
			userLoading.value = true

			const payMehthods = useSysConfigStore().checkVersionConfig.pay_version ? usePay : useNewPay
			payMehthods(
				{ body: params },
				(res: any) => {
					this.getPayUrlByOrderId(res)
				},
				(err: any) => {
					HallLog.error('usePay error', err)
					userLoading.value = false
				}
			)

			googleEvent({ event: 'recharge', event_type: 'af_recharge', moneyValue: params.price })
		},
		getPayUrlByOrderId(data: any) {
			// useSysConfigStore().checkVersionConfig.pay_version
			const { order_id, order_no } = data
			if (order_id || order_no) {
				let param = { order_id, order_no }
				this.reqGetUrlTimes(param, this.reqCount)
			} else {
				const userLoading = useUserLoading()
				userLoading.value = false
			}
		},
		reqGetUrlTimes(param: any, times: any) {
			times--
			const resultMethods = useSysConfigStore().checkVersionConfig.pay_version ? useGetPayResult : useGetUserPayUrl
			resultMethods(
				{ body: param },
				(res: any) => {
					let url = res.url
					let qr_code = res.qr_code
					if (qr_code || url) {
						//正常
						return this.handlePayUrl(res)
					} else {
						if (times <= 0) {
							//超时 五次拉取不成功
							return this.payFailed()
						}
						this.timeOut = setTimeout(() => {
							this.reqGetUrlTimes(param, times)
						}, 1500) as any
					}
				},
				(err: any) => {
					// HallLog.error('useGetPayResult error', err)
					useUserLoading().value = false
				}
			)
		},
		payFailed() {
			useUserLoading().value = false
			const { addErrorMessage } = useSysConfigStore()
			addErrorMessage({ id: 'error_recharge_timeout_error', msg: useNuxtApp().$t('D0024') })
		},
		handlePayUrl(data: any) {
			useUserLoading().value = false
			if (data.qr_code) {
				this.payResult = { ...data }
			} else if (data.url) {
				let urls = new URL(data.url)
				if (window.location.protocol != urls.protocol) {
					data.url = data.url.replace(urls.protocol, window.location.protocol)
				}
				this.payResult = { ...data }
				// if (Helper.openInWebview()) {
				// 	Helper.toOutLink(data.url);
				// } else {
				// 	this.cpfPayResult = { data: { ...data } };
				// }
				// Helper.toOutLink(data.url);
			} else {
				this.payFailed()
			}
		},
		propsCheckChange({ id, val }: any) {
			if (val) {
				this.checkedId = id
				this.propsList.forEach((el: any, index: any) => {
					if (el.activity_param != id) {
						el.checked = false
					}
				})
			} else {
				this.checkedId = ''
			}
		},
		changeAmount(amount: any) {
			this.amount = amount
		},
		changeUsdtAmount(amount: any) {
			this.usdtAmount = amount
		},
		getFreeByAmount(point: any) {
			point = Number(point) || 0
			let item = this.propsMap[this.checkedId]
			if (item && item.depositCfg && item.depositCfg.reward_list && point) {
				let result = 0
				item.depositCfg.reward_list.forEach((el: any) => {
					if (item.depositCfg.reward_type) {
						if (el.join_point <= point) {
							let value = (el.value / 100) * point
							if (el.limit_point) {
								let max = el.limit_point
								result = Math.max(Math.min(value, max), result)
							} else {
								result = Math.max(value, result)
							}
						}
					} else {
						if (el.join_point <= point && result < el.value) {
							result = el.value
						}
					}
				})
				return result
			} else {
				return 0
			}
		},
		getUsdtFreeByAmount(point: any) {
			point = Number(point) || 0
			let item = this.propsMap[this.checkedId]
			if (item && item.depositCfg && item.depositCfg.reward_list && point) {
				let result = 0
				item.depositCfg.reward_list.forEach((el: any) => {
					if (item.depositCfg.reward_type) {
						let join_point = el.join_point / this.config.usdt_rate
						if (join_point <= point) {
							let value = (el.value / 100) * point * this.config.usdt_rate
							if (el.limit_point) {
								value = Math.min(value, el.limit_point)
							}
							value = value / this.config.usdt_rate
							result = parseFloat(Math.max(value, result).toFixed(2))
						}
					} else {
						let join_point = el.join_point / this.config.usdt_rate
						let value = el.value / this.config.usdt_rate
						if (join_point <= point && result < value) {
							result = value
						}
					}
				})
				return result
			} else {
				return 0
			}
		},
		getPromoItemList() {
			useGetpPromoitemList(
				{ body: { item_type: 1, used_status: 1, page: 1, limit: 10000, need_details: true } },
				(res: any) => {
					const { $cp, $fp, $i18n } = useNuxtApp()
					let list = res.list || []
					let tempList: any = []
					let tempMap: any = {}
					let max_point: any = 0 //最大奖励
					let max_percent: any = 0 //最大优惠比例
					let msg: any = $i18n.messages.value

					let langValue: any = {}
					for (let key in langConf) {
						langValue[key] = $i18n.t('D0010', {}, { locale: langConf[key].i18n })
					}
					list.forEach((el: any) => {
						let cfg = el.cfg
						let text: any = ''
						try {
							text = JSON.parse(cfg.item_lang)
						} catch (error) {
							HallLog.error('json item_lang error:' + cfg.item_lang)
						}
						let depositCfg = cfg.deposit_reward_cfg
						if (depositCfg.limit_hour) {
							el.end_time = el.used_time + depositCfg.limit_hour * 60 * 60
						}
						if (depositCfg.reward_list) {
							depositCfg.reward_list.forEach((el: any, index: any) => {
								el.value = $cp(el.value)
								el.join_point = $cp(el.join_point)
								if (depositCfg.reward_type) {
									el.limit_point = $cp(el.limit_point)
									if (el.limit_point > max_point) {
										max_point = el.limit_point
									}
									if (el.value > max_percent) {
										max_percent = el.value
									}
									if (index == depositCfg.reward_list.length) {
										max_point = $fp(max_point)
										max_percent = $fp(max_percent)
									}
									if (!text) {
										let textValue: any = {}
										for (let key in langValue) {
											textValue[key] = { item_name: $fp(el.value) + '% ' + langValue[key] }
										}
										text = textValue
									}
								} else {
									if (el.value > max_point) {
										max_point = el.value
									}
									if (index == depositCfg.reward_list.length) {
										max_point = $fp(max_point)
									}
									if (!text) {
										let textValue: any = {}
										for (let key in langValue) {
											textValue[key] = { item_name: $fp(el.value) + ' ' + langValue[key] }
										}
										text = textValue
									}
								}
							})
						}
						let betRate = depositCfg.dama_multi //打码倍数
						let eTime = el.end_time //结束时间
						let left = el.left_time

						let item = {
							id: 26,
							text,
							max_percent,
							depositCfg,
							max_point,
							betRate,
							eTime,
							left,
							activity_param: '' + el.item_id,
							checked: false,
						}
						if (!item.eTime || item.eTime - this.currentTime > 0) {
							tempList.push(item)
							tempMap[item.activity_param] = item
						}
					})
					//按奖励比例降序排列
					tempList.sort((a: any, b: any) => {
						if (a.eTime == b.eTime) {
							if (a.max_percent != b.max_percent) {
								return b.max_percent - a.max_percent
							} else {
								return b.max_point - a.max_point
							}
						} else {
							if (!b.eTime) {
								return -1
							}
							if (!a.eTime) {
								return 1
							}
							return b.eTime > a.eTime ? -1 : 1
						}
					})
					if (tempList[0]) {
						tempList[0].checked = true
						this.checkedId = tempList[0].activity_param
					}
					this.propsList = tempList
					this.propsMap = tempMap
				},
				(err: any) => {
					// HallLog.error('useGetpPromoitemList error', err)
				}
			)
		},
		updateCurrentTime() {
			this.currentTime = parseInt(`${Date.now() / 1000}`)
		},
		getRemain(item: any, index: any) {
			if (!item.eTime) return ''
			let str = Helper.renderTimeRemainNoDay(item.eTime - this.currentTime)
			if (!str) {
				this.deleteProps(item.activity_param)
				return ''
			} else {
				return str
			}
		},
		deleteProps(key: any) {
			let findIndex = this.propsList.findIndex((el: any) => el.activity_param == key)
			if (findIndex != -1) {
				let checked = this.propsList[findIndex].checked
				this.propsList.splice(findIndex, 1)
				if (checked) {
					if (this.propsList.length) {
						this.propsList[0].checked = true
						this.checkedId = this.propsList[0].activity_param
					} else {
						this.checkedId = ''
					}
				}
			}
		},
		initData() {
			this.bClickDeposit = false
			this.payResult = null
			registerTimer(this.timerKey, this.updateCurrentTime)
			this.initError()
			this.getBindInfo()
			this.getPayInfo()
			this.getPromoItemList()
		},
		getIconByPayKey(pay_key: any) {
			return pay_key == DepositKeyTypeEnum.pix
				? 'pix'
				: pay_key == DepositKeyTypeEnum.usdt
				? 'usdt'
				: pay_key == DepositKeyTypeEnum.spei
				? 'spei'
				: ''
		},
		mounted() {
			googleEvent({ sendType: 1, event: 'page_show', type: 'personal', module: 'deposit' })
			this.initData()
		},

		unmounted() {
			this.currentPayInfo = {}
			this.payResult = null
			this.amount = null as any
			this.usdtAmount = null as any

			if (!this.bClickDeposit) {
				//没有点充值就关闭了
				googleEvent({ event: 'close_without_deposit', sendType: 1 })
			}
		},
		cpfAndCnpjInputFormat(newValue: string, oldValue: string) {
			const withDrawStore = useWithdrawStore()
			if (newValue.length <= 14) {
				return withDrawStore.cpfInputFormat(newValue, oldValue)
			} else {
				return withDrawStore.cnpjInputFormat(newValue, oldValue)
			}
		},
		cpfAndCnpjPasteFormat(event: any) {
			event?.preventDefault()
			let value: string = (event.clipboardData.getData('text') || '').replace(/[^0-9]/g, '')
			value = value.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '')
			if (value.length <= 11) {
				return this.cpfPasteFormat(value)
			} else {
				return this.cnpjPasteFormat(value)
			}
		},
		cpfPasteFormat(value: any) {
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
			if(this.currentPayInfo.bind_info) {
				this.currentPayInfo.bind_info.entrus_bank_account = value
			}
			useAccountStore().currentValue2 = value
		},
		cnpjPasteFormat(value: any) {
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
			if(this.currentPayInfo.bind_info) {
				this.currentPayInfo.bind_info.entrus_bank_account = value
			}
			useAccountStore().currentValue2 = value
		},
	},
	getters: {
		inResult: (state: any) => !state.inLobbyPage && state.payResult,
		inLobbyPage: (state) => !state.currentPayInfo.pay_key,
		isInPixPay: (state) => state.currentPayInfo.pay_key == DepositKeyTypeEnum.pix,
		isInSpeiPay: (state) => state.currentPayInfo.pay_key == DepositKeyTypeEnum.spei,
		amountError: (state: any) => {
			let amount = Number(state.usdtAmount)
			if (state.isInPixPay || state.isInSpeiPay) {
				amount = Number(state.amount)
			}
			let result = amount < state.currentPayInfo.pay_num_min
			if (!result) {
				if (state.currentPayInfo.pay_num_max) {
					result = amount > state.currentPayInfo.pay_num_max
				}
			}
			if (!result) {
				result = amount != Math.ceil(amount)
			}

			return result
		},
		currencyTip: (state) => {
			let list = []
			let app = useNuxtApp()
			let configStore = useSysConfigStore()
			list.push(app.$t('D0012', { symbol: configStore.currency_symbol, point: app.$fp(state.currentPayInfo.pay_num_min) }))
			if (state.currentPayInfo.pay_num_max) {
				list.push(app.$t('D0023', { symbol: configStore.currency_symbol, point: app.$fp(state.currentPayInfo.pay_num_max) }))
			}
			let str = list.join(' ')
			return str
		},
		usdtTip: (state) => {
			let list = []
			let app = useNuxtApp()
			list.push(app.$t('D0012', { symbol: app.$fp(state.currentPayInfo.pay_num_min), point: 'USDT' }))
			if (state.currentPayInfo.pay_num_max) {
				list.push(app.$t('D0023', { symbol: app.$fp(state.currentPayInfo.pay_num_max), point: 'USDT' }))
			}
			let str = list.join(' ')
			return str
		},
		//渲染金额兑换
		getRateHtml: (state) => {
			let val: any = Number(state.amount) || 0
			val += state.getFreeByAmount(val)
			let className = ''
			if (val) {
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
		getRateUsdtHtml: (state) => {
			let val: any = Number(state.usdtAmount) || 0
			val += state.getUsdtFreeByAmount(val)
			let className = ''
			let usdt_rate = state.config.usdt_rate
			if (Boolean(val)) {
				val = (val * usdt_rate).toFixed(2)
				className = 'warning'
			} else {
				val = '0.00'
			}
			return useNuxtApp().$t('W0012', {
				symbol: useSysConfigStore().currency_symbol,
				point: `<span class="${className}">${useNuxtApp().$fp(val)}</span>`,
			})
		},
		// tutorial: (state) => {
		// 	if (state.isInPixPay) {
		// 		return ['D0032', 'D0033', 'D0034', 'D0035']
		// 	} else if (state.isInSpeiPay) {
		// 		return ['D0045', 'D0046', 'D0047', 'D0048']
		// 	} else {
		// 		return ['D0036', 'D0037', 'D0038', 'D0039', 'D0040']
		// 	}
		// },
		bonusTime: (state) => {
			let list: any = state.propsList || []
			let find = list.find((el: any) => el.eTime && el.eTime - state.currentTime < 24 * 60 * 60 && el.eTime - state.currentTime > 0)
			return find ? find.eTime : 0
		},
		fullnameError: (state) => useSysConfigStore().realnameError(state.currentPayInfo.bind_info.full_name),
		accountReadonly: (state) => !state.currentPayInfo.bind_info.status,
		pixDisabled: (state: any) => {
			return state.amountError || state.fullnameError || !state.currentPayInfo.bind_info.entrus_bank_account
		},
	},
})
