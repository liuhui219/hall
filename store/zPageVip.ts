import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
import { mapFace } from '~~/apis/types'

export const useVipStore = defineStore({
	id: 'vip-store',
	state: () => {
		return {
			vipActive: 1,
			clickApply: false,
			vipAcitvityObject: {
				[VipActivityEnum.vipUpgrade]: {
					title: 'V0037',
					text: 'V0038',
					tip: 'V0078',
					image: 'bonus',
					index: 0,
					key: VipActivityEnum.vipUpgrade,
				},
				[VipActivityEnum.vipRebate]: {
					title: 'V0039',
					text: 'V0040',
					tip: 'V0042',
					image: 'rebate',
					index: 1,
					key: VipActivityEnum.vipRebate,
				},
				[VipActivityEnum.vipWeekly]: {
					title: 'V0051',
					text: 'V0052',
					tip: 'V0054',
					image: 'weekly',
					index: 2,
					key: VipActivityEnum.vipWeekly,
				},
				[VipActivityEnum.vipRoulette]: {
					title: 'V0043',
					text: 'V0044',
					tip: '',
					image: 'roulette_3',
					index: 3,
					key: VipActivityEnum.vipRoulette,
				},
				[VipActivityEnum.vipRoulette1]: {
					title: 'V0045',
					text: '',
					tip: 'V0046',
					image: 'roulette_1',
					index: 3,
					key: VipActivityEnum.vipRoulette1,
				},
				[VipActivityEnum.vipRoulette2]: {
					title: 'V0047',
					text: '',
					tip: 'V0048',
					image: 'roulette_2',
					index: 4,
					key: VipActivityEnum.vipRoulette2,
				},
				[VipActivityEnum.vipRoulette3]: {
					title: 'V0049',
					text: '',
					tip: 'V0050',
					image: 'roulette_3',
					index: 5,
					key: VipActivityEnum.vipRoulette3,
				},

				[VipActivityEnum.vipDay]: { title: 'V0055', text: 'V0056', tip: 'V0058', image: 'daily', index: 6, key: VipActivityEnum.vipDay },
				[VipActivityEnum.vipMonth]: {
					title: 'V0059',
					text: 'V0060',
					tip: 'V0061',
					image: 'monthly',
					index: 7,
					key: VipActivityEnum.vipMonth,
				},
				[VipActivityEnum.vipHost]: { title: 'V0062', text: 'V0063', tip: 'V0064', image: 'host', index: 8, key: VipActivityEnum.vipHost },
				[VipActivityEnum.vipExclusive]: {
					title: 'V0065',
					text: 'V0066',
					tip: 'V0067',
					image: 'exclusive',
					index: 9,
					key: VipActivityEnum.vipExclusive,
				},
				[VipActivityEnum.vipLuxury]: {
					title: 'V0068',
					text: 'V0069',
					tip: 'V0070',
					image: 'luxury',
					index: 10,
					key: VipActivityEnum.vipLuxury,
				},
			},
			showVipRule: false,
			faqOpenMap: <mapFace>{},
			vipBg: `url(${getResConfigImage('bg', ImageKeyEnum.vip)})`,
			lossRebateCfg: {
				receive_start_time: 0,
				receive_end_time: 0,
				has_received: 0,
				point: 0,
				YearWeek: 0,
				vip_level: 0,
			},
		}
	},
	actions: {
		closeRule() {
			this.showVipRule = false
		},
		openRule() {
			this.showVipRule = true
		},
		clickFaqItem(index: number) {
			this.faqOpenMap[index] = !this.faqOpenMap[index]
		},
		changeVipActive(vip: number) {
			this.vipActive = vip
		},
		lossRebateMounted() {
			googleEvent({ sendType: 1, event: 'cashback_pageview' })
			if (useUserStore().isLogin) {
				useGetActivityDetail(
					{ body: { atype: ActivityTypeEnum.vipLossRebate } },
					(res: any) => {
						let data = res.details || {}
						this.lossRebateCfg = data
					},
					(err: any) => {
						// HallLog.error('useGetActivityDetail error', err)
					}
				)
			}
		},
		mounted() {
			HallLog.log('vip mounted')
			setPagePaddingTitle('')
			useUserStore().redPoint.vip = 0
			useUserStore().getUserInfo()
		},
		unmounted() {
			HallLog.log('vip unmounted')
			this.closeRule()
			this.faqOpenMap = {}
		},
		hasReward(reward: any) {
			if (!reward) return false
			return !!(reward.point || reward.flow_pro || reward.props?.length)
		},
		getVipUpgradeBonus(vip: number) {
			return useSysConfigStore().vipUpgradeCfg.data.levels.find((el: any) => el.vip == vip)?.reward?.point
		},
		getVipNextObj(type: number, vip: number) {
			const findVip = useSysConfigStore().vip_list.find((el) => el.vip == vip)
			return {
				type,
				vip,
				coin: ((findVip.vip_coin - useUserStore().data.vip_coin) / 100).toFixed(2),
			}
		},
		clickJoin() {
			googleEvent({ sendType: 1, event: 'cashback_join_click' })
			openLoginOrRegister()
		},
		animationEnd() {
			this.clickApply = false
		},
		openRewards() {
			if (!this.lossRebateCfg.point || this.lossRebateCfg.point == 1) {
				googleEvent({ sendType: 1, event: 'cashback_join_click' })
				this.clickApply = true
				return
			}
			googleEvent({ sendType: 1, event: 'cashback_claim_click' })
			let body = { atype: ActivityTypeEnum.vipLossRebate }
			//记录返回数据
			let point = this.lossRebateCfg.point
			useDoActivity({ body, loading: 1 }, (data: any) => {
				googleEvent({ sendType: 1, event: 'cashback_claim_success' })
				const { $vm } = useNuxtApp()
				$vm.show('vipReward', { fixed: '', name: point })
			})
		},
	},
	getters: {
		lossRebateMaxPro: (state) => {
			let max = 0
			const len = useSysConfigStore().vipLossRebateCfg.data?.vip_cfg?.length || 0
			for (let i = 0; i < len; i++) {
				let item = useSysConfigStore().vipLossRebateCfg.data.vip_cfg[i]
				let value = (item.reward?.flow_pro || 0) / 100
				if (value > max) {
					max = value
				}
			}

			return parseFloat(max.toFixed(2))
		},
		lossRebateCurrent: (state) => {
			let find = useSysConfigStore().vipLossRebateCfg.data?.vip_cfg?.find((el: any) => el.vip_level == useUserStore().vip_level)
			return parseFloat(((find?.reward?.flow_pro || 0) / 100).toFixed(2))
		},
		lossLeftTime: (state) => {
			const lossEvent = state.lossRebateEvent
			const config = resConfig.vipConfig.lossRebate
			const refreshTime = parseInt(
				new Date(
					lossEvent.year,
					lossEvent.month,
					lossEvent.day_e + config.receive_start_day,
					lossEvent.hours_start + (config.receive_start_hour - config.event_start_hour),
					lossEvent.minute_start + (config.receive_start_minute - config.event_start_minute)
				).valueOf() / 1000
			)
			return Helper.renderTimeRemainFormat(refreshTime - useSysConfigStore().currentTimestamp)
		},
		lossRebateReceiveFormat: (state) => {
			const lossEvent = state.lossRebateEvent
			const config = resConfig.vipConfig.lossRebate
			let event_start = Helper.formatDateM(
				new Date(
					lossEvent.year,
					lossEvent.month,
					lossEvent.day_e + config.receive_start_day,
					lossEvent.hours_start + (config.receive_start_hour - config.event_start_hour),
					lossEvent.minute_start + (config.receive_start_minute - config.event_start_minute)
				).valueOf(),
				7
			)
			let event_end = Helper.formatDateM(
				new Date(
					lossEvent.year,
					lossEvent.month,
					lossEvent.day_e + config.receive_end_day,
					lossEvent.hours_end + (config.receive_end_hour - config.event_end_hour),
					lossEvent.minute_end + (config.receive_end_minute - config.event_end_minute)
				).valueOf(),
				7
			)
			return `${event_start} ~ ${event_end}`
		},
		lossRebateEventFormat: (state) => {
			const lossEvent = state.lossRebateEvent
			const event_start = Helper.formatDateM(
				new Date(lossEvent.year, lossEvent.month, lossEvent.day_s, lossEvent.hours_start, lossEvent.minute_start).valueOf(),
				7
			)
			const event_end = Helper.formatDateM(
				new Date(lossEvent.year, lossEvent.month, lossEvent.day_e, lossEvent.hours_end, lossEvent.minute_end).valueOf(),
				7
			)
			return `${event_start} ~ ${event_end}`
		},
		lossRebateEvent: (state) => {
			const configStore = useSysConfigStore()
			const date = new Date()
			const config = resConfig.vipConfig.lossRebate
			const year = date.getFullYear()
			const month = date.getMonth()
			const day = date.getDay() == 0 ? 7 : date.getDay()
			const day_s = date.getDate() - date.getDay() + config.event_start_day
			const day_e = day_s + (config.event_end_day - config.event_start_day)
			const offset_h = Math.floor(configStore.timeOffset / 3600)
			const offset_m = configStore.timeOffset % 3600
			const hours_start = offset_h + config.event_start_hour
			const hours_end = offset_h + config.event_end_hour
			const minute_start = config.event_start_minute + offset_m
			const minute_end = config.event_end_minute + offset_m
			return { year, month, day_s, day_e, hours_start, hours_end, minute_start, minute_end }
		},
		vipColor: (state) => {
			return resConfig.vipConfig[useUserStore().vip_level]?.color || ''
		},
		list: (state): any[] => {
			const userStore = useUserStore()
			const init = { ...state.vipAcitvityObject }
			//vip根据登录状态配置显示的转盘
			if (!useUserStore().rouletteStatus) {
				delete init[VipActivityEnum.vipRoulette]
				delete init[VipActivityEnum.vipRoulette1]
				delete init[VipActivityEnum.vipRoulette2]
				delete init[VipActivityEnum.vipRoulette3]
			} else {
				if (userStore.isLogin) {
					delete init[VipActivityEnum.vipRoulette]
					const rouletteConfig = useSysConfigStore().pageConfig.sysConfig.rouletteConfig
					if (!rouletteConfig.statusList[2]) {
						delete init[VipActivityEnum.vipRoulette3]
					}
					if (!rouletteConfig.statusList[1]) {
						delete init[VipActivityEnum.vipRoulette2]
					}
					if (!rouletteConfig.statusList[0]) {
						delete init[VipActivityEnum.vipRoulette1]
					}
				} else {
					delete init[VipActivityEnum.vipRoulette1]
					delete init[VipActivityEnum.vipRoulette2]
					delete init[VipActivityEnum.vipRoulette3]
				}
			}

			if (!userStore.vipUpgradeStatus) {
				delete init[VipActivityEnum.vipUpgrade]
			}

			if (!userStore.vipRebateStatus) {
				delete init[VipActivityEnum.vipRebate]
			}
			if (!userStore.vipDayStatus) {
				delete init[VipActivityEnum.vipDay]
			}
			if (!userStore.vipWeeklyStatus) {
				delete init[VipActivityEnum.vipWeekly]
			}
			if (!userStore.vipMonthStatus) {
				delete init[VipActivityEnum.vipMonth]
			}
			const list = Object.values(init)
			list.sort((a: any, b: any) => (a.index > b.index ? 1 : -1))
			return list
		},
		currentList: (state): any[] => {
			const userStore = useUserStore()
			const configStore = useSysConfigStore()
			const init = { ...state.vipAcitvityObject }
			if (userStore.rouletteStatus) {
				const rouletteCfg = configStore.rouletteCfg.data || { list: [{ min_vip_limit: 16 }, { min_vip_limit: 16 }, { min_vip_limit: 16 }] }
				// 转盘配置
				//当前VIP等级列表不显示未登录状态转盘
				delete init[VipActivityEnum.vipRoulette]
				const rouletteConfig = configStore.pageConfig.sysConfig.rouletteConfig
				//根据转盘配置等级及前端配置删除转盘
				if (rouletteCfg.list[2].min_vip_limit > state.vipActive || !rouletteConfig.statusList[2]) {
					delete init[VipActivityEnum.vipRoulette3]
				}
				if (rouletteCfg.list[1].min_vip_limit > state.vipActive || !rouletteConfig.statusList[1]) {
					delete init[VipActivityEnum.vipRoulette2]
				}
				if (rouletteCfg.list[0].min_vip_limit > state.vipActive || !rouletteConfig.statusList[0]) {
					delete init[VipActivityEnum.vipRoulette1]
				}
			} else {
				delete init[VipActivityEnum.vipRoulette]
				delete init[VipActivityEnum.vipRoulette3]
				delete init[VipActivityEnum.vipRoulette2]
				delete init[VipActivityEnum.vipRoulette1]
			}

			//vip升级
			let vipUpgradeReward
			if (!userStore.vipUpgradeStatus) {
				delete init[VipActivityEnum.vipUpgrade]
			} else {
				vipUpgradeReward = configStore.vipUpgradeCfg.data.levels.find((el: any) => el.vip == state.vipActive)?.reward
				if (!state.hasReward(vipUpgradeReward)) {
					delete init[VipActivityEnum.vipUpgrade]
				}
			}

			//vip返利
			let vipRebateReward
			if (!userStore.vipRebateStatus) {
				delete init[VipActivityEnum.vipRebate]
			} else {
				vipRebateReward = configStore.vipRebateCfg.cfg.vip_cfg.find((el: any) => el.vip_level == state.vipActive)?.reward
				if (!state.hasReward(vipRebateReward)) {
					delete init[VipActivityEnum.vipRebate]
				}
			}

			//vip日福利
			let vipDayReward
			if (!userStore.vipDayStatus) {
				delete init[VipActivityEnum.vipDay]
			} else {
				vipDayReward = configStore.vipDayCfg.data.vip_cfg.find((el: any) => el.vip_level == state.vipActive)?.reward
				if (!state.hasReward(vipDayReward)) {
					delete init[VipActivityEnum.vipDay]
				}
			}
			//vip周福利
			let vipWeekly
			let vipWeeklyReward
			if (!userStore.vipWeeklyStatus) {
				delete init[VipActivityEnum.vipWeekly]
			} else {
				vipWeekly = configStore.vipWeeklyCfg.data.vip_cfg.find((el: any) => el.vip_level == state.vipActive)
				vipWeeklyReward = vipWeekly?.reward
				if (!state.hasReward(vipWeeklyReward)) {
					delete init[VipActivityEnum.vipWeekly]
				}
			}
			//vip月福利
			let vipMonthReward
			if (!userStore.vipMonthStatus) {
				delete init[VipActivityEnum.vipMonth]
			} else {
				vipMonthReward = configStore.vipMonthCfg.data.vip_cfg.find((el: any) => el.vip_level == state.vipActive)?.reward
				if (!state.hasReward(vipMonthReward)) {
					delete init[VipActivityEnum.vipMonth]
				}
			}
			//高V功能开放等级
			if (!resConfig.vipConfig.activity[VipActivityEnum.vipLuxury] || state.vipActive < 15) {
				delete init[VipActivityEnum.vipLuxury]
			}
			if (!resConfig.vipConfig.activity[VipActivityEnum.vipExclusive] || state.vipActive < 13) {
				delete init[VipActivityEnum.vipExclusive]
			}
			if (!resConfig.vipConfig.activity[VipActivityEnum.vipHost] || state.vipActive < 10) {
				delete init[VipActivityEnum.vipHost]
			}
			const list = Object.values(init)
			list.sort((a: any, b: any) => (a.index > b.index ? 1 : -1))
			const { $fp, $cp } = useNuxtApp()
			list.forEach((el: any) => {
				if (el.key == VipActivityEnum.vipUpgrade) {
					el.params = {
						value: configStore.renderVHtmlNumber(
							configStore.currency_symbol + ' ' + $fp($cp(vipUpgradeReward.point)),
							'text-second font-[500]'
						),
					}
				} else if (el.key == VipActivityEnum.vipMonth) {
					el.params = { value: configStore.renderVHtmlNumber((vipMonthReward.flow_pro / 100).toFixed(2) + '%', 'text-second font-[500]') }
				} else if (el.key == VipActivityEnum.vipWeekly) {
					el.params = {
						value1: configStore.renderVHtmlNumber(
							configStore.currency_symbol + ' ' + $fp($cp(vipWeekly.need_flow)),
							'text-second font-[500]'
						),
						value2: configStore.renderVHtmlNumber(configStore.currency_symbol + ' ' + $fp($cp(vipWeeklyReward.point)), 'text-second'),
					}
				} else if (el.key == VipActivityEnum.vipDay) {
					let find = { value: 0, join_point: 0, limit_point: 0 }
					vipDayReward.props.forEach((el: any) => {
						let type = el.deposit_reward_cfg?.reward_type
						el.deposit_reward_cfg?.reward_list?.forEach((temp: any) => {
							if (temp.value > find.value || temp.limit_point > find.limit_point) {
								find = temp
							}
						})
					})
					el.params = {
						value1: configStore.renderVHtmlNumber(
							configStore.currency_symbol + ' ' + $fp($cp(find.join_point)),
							'text-second font-[500]'
						),
						value2: configStore.renderVHtmlNumber(
							configStore.currency_symbol + ' ' + $fp($cp(find.limit_point || find.value)),
							'text-second'
						),
					}
				} else if (el.key == VipActivityEnum.vipRebate) {
					el.params = { value: configStore.renderVHtmlNumber((vipRebateReward.flow_pro / 100).toFixed(2) + '%', 'text-second font-[500]') }
				}
			})
			return list
		},
		faqList: (state) => {
			const userStore = useUserStore()
			const init = {
				[VipActivityEnum.vipUpgrade]: { title: 'V0079', content: 'V0080', index: 0 },
				[VipActivityEnum.vipRebate]: { title: 'V0081', content: 'V0082', index: 1 },
				[VipActivityEnum.vipWeekly]: { title: 'V0083', content: 'V0084', index: 2 },
				[VipActivityEnum.vipDay]: { title: 'V0085', content: 'V0086', index: 3 },
				[VipActivityEnum.vipMonth]: { title: 'V0087', content: 'V0088', index: 4 },
				[VipActivityEnum.vipRoulette]: { title: 'V0089', content: 'V0090', index: 5 },
			}
			if (!userStore.vipUpgradeStatus) {
				delete init[VipActivityEnum.vipUpgrade]
			}
			if (!userStore.vipRebateStatus) {
				delete init[VipActivityEnum.vipRebate]
			}
			if (!userStore.vipWeeklyStatus) {
				delete init[VipActivityEnum.vipWeekly]
			}
			if (!userStore.vipDayStatus) {
				delete init[VipActivityEnum.vipDay]
			}
			if (!userStore.vipMonthStatus) {
				delete init[VipActivityEnum.vipMonth]
			}
			//Todo: vip解锁转盘
			if (!userStore.rouletteStatus) {
				delete init[VipActivityEnum.vipRoulette]
			}
			const list = Object.values(init)
			list.sort((a: any, b: any) => (a.index > b.index ? 1 : -1))
			return list
		},
		nextUnlock: (state) => {
			const userStore = useUserStore()
			if (!userStore.isLogin) return null
			const vip = userStore.vip_level
			const next = vip + 1
			const configStore = useSysConfigStore()
			for (let i = next; i < configStore.maxVip; i++) {
				if (userStore.vipUpgradeStatus) {
					const isUnlockVipUpgrade = configStore.vipUpgradeCfg.data.levels.some((el) => el.vip <= vip && state.hasReward(el.reward))
					if (!isUnlockVipUpgrade) {
						const find = configStore.vipUpgradeCfg.data.levels.find((el) => el.vip == i && state.hasReward(el.reward))
						if (find) {
							return state.getVipNextObj(VipActivityEnum.vipUpgrade, i)
						}
					}
				}

				if (userStore.vipRebateStatus) {
					const isUnlockVipRebate = configStore.vipRebateCfg.cfg.vip_cfg.some((el) => el.vip_level <= vip && state.hasReward(el.reward))
					if (!isUnlockVipRebate) {
						const find = configStore.vipRebateCfg.cfg.vip_cfg.find((el) => el.vip_level == i && state.hasReward(el.reward))
						if (find) {
							return state.getVipNextObj(VipActivityEnum.vipRebate, i)
						}
					}
				}
				if (userStore.vipWeeklyStatus) {
					const isUnlockVipWeekly = configStore.vipWeeklyCfg.data.vip_cfg.some((el) => el.vip_level <= vip && state.hasReward(el.reward))
					if (!isUnlockVipWeekly) {
						const find = configStore.vipWeeklyCfg.data.vip_cfg.find((el) => el.vip_level == i && state.hasReward(el.reward))
						if (find) {
							return state.getVipNextObj(VipActivityEnum.vipWeekly, i)
						}
					}
				}
				if (userStore.rouletteStatus) {
					const rouletteCfg = configStore.rouletteCfg.data || {
						list: [{ min_vip_limit: 16 }, { min_vip_limit: 16 }, { min_vip_limit: 16 }],
					}
					let index = rouletteCfg.list.findIndex((el: any) => el.min_vip_limit == i)
					if (index != -1) {
						if (configStore.pageConfig.sysConfig.rouletteConfig.statusList[index]) {
							if (index == 0) {
								return state.getVipNextObj(VipActivityEnum.vipRoulette1, i)
							} else if (index == 1) {
								return state.getVipNextObj(VipActivityEnum.vipRoulette2, i)
							} else if (index == 2) {
								return state.getVipNextObj(VipActivityEnum.vipRoulette3, i)
							}
						}
					}
				}
				if (userStore.vipDayStatus) {
					const isUnlockVipDay = configStore.vipDayCfg.data.vip_cfg.some((el) => el.vip_level <= vip && state.hasReward(el.reward))
					if (!isUnlockVipDay) {
						const find = configStore.vipDayCfg.data.vip_cfg.find((el) => el.vip_level == i && state.hasReward(el.reward))
						if (find) {
							return state.getVipNextObj(VipActivityEnum.vipDay, i)
						}
					}
				}
				if (userStore.vipMonthStatus) {
					const isUnlockVipMonth = configStore.vipMonthCfg.data.vip_cfg.some((el) => el.vip_level <= vip && state.hasReward(el.reward))
					if (!isUnlockVipMonth) {
						const find = configStore.vipMonthCfg.data.vip_cfg.find((el) => el.vip_level == i && state.hasReward(el.reward))
						if (find) {
							return state.getVipNextObj(VipActivityEnum.vipMonth, i)
						}
					}
				}

				if (resConfig.vipConfig.activity[VipActivityEnum.vipHost] && i == 10) {
					return state.getVipNextObj(VipActivityEnum.vipHost, i)
				}
				if (resConfig.vipConfig.activity[VipActivityEnum.vipExclusive] && i == 13) {
					return state.getVipNextObj(VipActivityEnum.vipExclusive, i)
				}
				if (resConfig.vipConfig.activity[VipActivityEnum.vipLuxury] && i == 15) {
					return state.getVipNextObj(VipActivityEnum.vipLuxury, i)
				}
			}
			return null
		},
	},
})
