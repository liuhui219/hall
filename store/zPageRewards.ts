import { defineStore } from 'pinia'
import { RewardHistory, Rewards, UserPromoItem } from '~~/types/appserverComponents'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
export const useRewardsStore = defineStore({
	id: 'rewards-store',
	state: () => {
		return {
			codeText: '',
			rewardsList: <Array<Rewards>>[],
			propsList: <Array<UserPromoItem>>[],
			tabId: 0,
			rewardHistoryList: ['AF0013', 'AF0010', 'AF0011', 'AF0012'],
			rewardHistoryData: <Array<RewardHistory>>[],
			day_type: 1,
			rewardIndex: 0,
			reward_type: 0,
			timerKey: 'rewards',
			currentTime: getTimestamp(),
		}
	},
	actions: {
		mounted() {
			HallLog.log('rewards mounted')
			this.codeText = ''
			useUserStore().redPoint.rewards = 0
			this.initData()
			registerTimer(this.timerKey, this.changeCurrentTime)
		},
		initData() {
			const app = useNuxtApp()
			if (app.$device.isDesktop || this.tabId == 1) {
				this.getProps()
			}
			if (app.$device.isDesktop || this.tabId == 0) {
				this.getmyrewards()
			}
		},
		otherPageLoadRewards() {
			if (useRoute().path.includes('/rewards')) {
				this.initData()
			}
		},
		remainPcardTime(data: any) {
			if (!data) return ''
			if (data.end_time <= 0) {
				return ''
			}
			let t = Helper.getTimeRemaining(0, data.end_time - this.currentTime)
			if (t.total < 0) {
				if (data.used_status != 3) {
					data.used_status = 3
				}
				return useNuxtApp().$t('REW0013')
			}
			let dd = t.day
			let hh = Helper.addZero(t.hour)
			let mm = Helper.addZero(t.minute)
			let ss = Helper.addZero(t.second)

			if (t.total >= 86400) {
				return `${dd}D ${hh}h ${mm}m ${ss}s`
			}
			return `${hh}h ${mm}m ${ss}s`
		},
		changeCurrentTime() {
			this.currentTime = getTimestamp()
		},
		unmounted() {
			this.codeText = ''
			removeTimer(this.timerKey)
		},
		//礼包码兑换
		giftcodereward(giftCode = '', sucFunc: any = null, errFunc: any = null) {
			const app = useNuxtApp()
			const params = { body: {} }
			if (!giftCode) {
				giftCode = this.codeText
			}
			params.body = { code: giftCode }
			useGiftcodereward(
				params,
				(res: any) => {
					//礼包码兑换后，奖励自动领取可能有延迟
					setTimeout(() => {
						useUserStore().updateUserWallets()
						this.otherPageLoadRewards()
					}, 500)

					const { addErrorMessage } = useSysConfigStore()
					addErrorMessage({ id: 'success_giftcodereward_format', msg: useNuxtApp().$t('REW0012'), type: 'success' })

					if (sucFunc) {
						sucFunc(res)
					}
				},
				(err: any) => {
					if (errFunc) {
						errFunc(err)
					}
					// HallLog.error('useGiftcodereward error', err)
				}
			)
		},
		//获取道具
		getProps() {
			const params = {
				body: {
					page: 1,
					limit: 10000,
					item_type: -1,
					used_status: -1,
					need_details: true,
				},
			}
			useGetpPromoitemList(
				params,
				(res: any) => {
					let list: any[] = res.list || []
					list.forEach((item: any) => {
						if (item.used_status == 1 && item.cfg) {
							if (item.cfg.item_type == RewardEnum.deposit) {
								if (item.cfg.deposit_reward_cfg && item.cfg.deposit_reward_cfg.limit_hour > 0) {
									item.end_time = item.used_time + item.cfg.deposit_reward_cfg.limit_hour * 60 * 60
								}
							} else if (item.cfg.item_type == RewardEnum.vipMul) {
								if (item.cfg.vip_point_multi_cfg && item.cfg.vip_point_multi_cfg.duration > 0) {
									item.end_time = item.used_time + item.cfg.vip_point_multi_cfg.duration * 60
								}
							}
						}
						if (item.cfg && item.cfg.item_lang) {
							try {
								item.cfg.item_lang = JSON.parse(item.cfg.item_lang)
							} catch (error) {
								item.cfg.item_lang = {}
							}
						}
					})
					let now = getTimestamp()
					list.sort((a: any, b: any) => {
						if (b.end_time <= 0) {
							return -1
						}
						if (a.end_time <= 0) {
							return 1
						}
						if (a.end_time < now) {
							return 1
						}
						if (b.end_time < now) {
							return -1
						}
						return a.end_time > b.end_time ? 1 : -1
					})
					this.propsList = list
				},
				(err: any) => {
					// HallLog.error('useGetpPromoitemList error', err)
				}
			)
		},
		remainRcardTime(end_time: number) {
			let t = Helper.getTimeRemaining(0, end_time - this.currentTime)
			if (t.total < 0) {
				return useNuxtApp().$t('REW0013')
			}
			let dd = t.day
			let hh = Helper.addZero(t.hour)
			let mm = Helper.addZero(t.minute)
			let ss = Helper.addZero(t.second)

			if (t.total >= 86400) {
				return `${dd}D ${hh}h ${mm}m ${ss}s`
			}
			return `${hh}h ${mm}m ${ss}s`
		},
		//获取奖励列表
		getmyrewards() {
			useMyRewards(
				{},
				(res: any) => {
					let list = res.data || []
					let now = getTimestamp()
					list.sort((a: any, b: any) => {
						if (b.end_itime <= 0) {
							return -1
						}
						if (a.end_itime <= 0) {
							return 1
						}
						if (a.end_itime < now) {
							return 1
						}
						if (b.end_itime < now) {
							return -1
						}
						return a.end_itime > b.end_itime ? 1 : -1
					})

					this.rewardsList = list
				},
				(err: any) => {
					// HallLog.error('useMyRewards error', err)
				}
			)
		},
		//兑换奖励
		rewardsSubmit(data: any) {
			const params = {
				loading: 1,
				body: {
					id: data.id,
				},
			}
			useReceiveRewards(
				params,
				(res: any) => {
					let index = this.rewardsList.findIndex((el: any) => el.id == data.id)
					if (index != -1) {
						this.rewardsList.splice(index, 1)
					}
					const { addErrorMessage } = useSysConfigStore()
					addErrorMessage({ id: 'success_receiverewards_format', msg: useNuxtApp().$t('REW0012'), type: 'success' })
					//请求更新余额
					const userStore = useUserStore()
					userStore.updateUserWallets()
					this.otherPageLoadRewards()
				},
				(err: any) => {
					// HallLog.error('useReceiveRewards error', err)
				}
			)
		},
		//使用道具
		useNow(data: any) {
			let item_id = data.item_id
			const params = { body: { item_id: item_id } }
			useApplyPromoItem(
				params,
				(res: any) => {
					data.used_status = true
					this.getProps()
					const { addErrorMessage } = useSysConfigStore()
					addErrorMessage({ id: 'success_usenow_format', msg: useNuxtApp().$t('REW0012'), type: 'success' })
				},
				(err: any) => {
					// HallLog.error('useApplyPromoItem error', err)
				}
			)
		},
		changeData(type: number) {
			this.tabId = type
			setTimeout(() => {
				if (type) {
					this.getProps()
				} else {
					this.getmyrewards()
				}
			})
		},

		gotoType(type: Number) {
			switch (type) {
				case 1:
					toDeposit()
					break
				case 2:
					break
				case 3:
					openPopup(PopupEnum.roulette)
					break
				case 4:
					// navigateTo("/casino")
					break
				case 5:
					// navigateTo("/casino")
					break
				default:
					break
			}
		},
		//奖励记录页面获取
		rewardHistoryMounted() {
			this.getrewardhistory()
		},
		//获取奖励使用记录
		getrewardhistory() {
			const configStore = useSysConfigStore()
			const params = { body: {} }
			params.body = {
				page: 1,
				limit: 10000,
				day_type: this.day_type, // 时间 1 今天 2 最近7天 3 最近60天
				bill_type: Number(configStore.rewardTypes[this.reward_type]?.type),
			}

			useMyRewardHistory(
				params,
				(res: any) => {
					let list = res.data || []
					list.forEach((el: any) => {
						if (el.props && el.props.length) {
							el.props.forEach((item: any) => {
								try {
									item.item_lang = JSON.parse(item.item_lang)
								} catch (error) {
									item.item_lang = {}
									HallLog.error('reward history parse error')
								}
							})
						}
					})
					this.rewardHistoryData = list
				},
				(err: any) => {
					// HallLog.error('useMyRewardHistory error', err)
				}
			)
		},
		//时间选择
		changeType(type: number) {
			this.day_type = type
			this.getrewardhistory()
		},
		//类型选择
		changerewardType(val: number) {
			this.reward_type = val
			this.getrewardhistory()
		},
		selectChange(val: number, type: number) {
			if (type == 0) {
				this.changeType(val)
			} else {
				this.changerewardType(val)
			}
		},
	},
	getters: {
		showPropsList: (state) => state.propsList.filter((el: any) => el.used_status != 3),
		selectComp: (state) => {
			return [
				{ value: state.day_type, list: state.rewardHistoryList, langBol: 1 },
				{ value: state.reward_type, list: useSysConfigStore().rewardTypes, langBol: 2, langBolKey: 'title' },
			]
		},
	},
})
