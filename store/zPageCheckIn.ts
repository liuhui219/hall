import { useRewardsStore } from './zPageRewards'
import { defineStore } from 'pinia'
import Helper from '~/apis/tool/Helper'

export const useCheckInStore = defineStore({
	id: 'check-in-store',
	state: () => {
		return {
			show: false,
			clickId: -1,
			clickStatus: false,
			self: {
				nth: 1,
				err: {
					ret: 0,
				},
			},
			list: <any>[],
			cfg: {
				unlimit_day_num: 7,
				List: {
					1: { day: 1, deposit_limit: 0, reward_type: 1, rewards: [{ point: 10, props: [{ item_type: 1 }] }] },
					2: { day: 2, deposit_limit: 0, reward_type: 1, rewards: [{ point: 0, props: [{ item_type: 1 }] }] },
					3: { day: 3, deposit_limit: 0, reward_type: 1, rewards: [{ point: 10, props: [{ item_type: 1 }] }] },
					4: {
						day: 4,
						deposit_limit: 0,
						reward_type: 2,
						rewards: [
							{ point: 10, props: null },
							{ point: 10, props: null },
						],
					},
					5: {
						day: 5,
						deposit_limit: 0,
						reward_type: 2,
						rewards: [{ point: 0, props: [{ item_type: 2 }, { point: 0, props: [{ item_type: 1 }] }] }],
					},
					6: {
						day: 6,
						deposit_limit: 0,
						reward_type: 2,
						rewards: [
							{ point: 10, props: [{ item_type: 1 }] },
							{ point: 10, props: [{ item_type: 3 }] },
						],
					},
					7: {
						day: 7,
						deposit_limit: 0,
						reward_type: 2,
						rewards: [
							{ point: 10, props: [{ item_type: 1 }] },
							{ point: 10, props: [{ item_type: 1 }] },
							{ point: 10, props: [{ item_type: 1 }] },
						],
					},
				},
			},
		}
	},
	actions: {
		handleClick() {
			//Todu download
		},
		animationend() {
			this.clickStatus = true
			this.self.err = { ret: 16201, Params: [] }
			this.updatePageData()
			this.getMyCheckin()
		},
		getItemImage(item: any) {
			let list = item.rewards || []
			let result = {
				rewards: <any>[],
				point: 0,
				random: false,
				more: false,
				day: item.day,
				current: item.day == this.self.nth,
				receive: item.day < this.self.nth || (item.day == this.self.nth && this.self.err && this.self.err.ret == 16201),
				show_point: false,
				show_count: false,
				deposit_limit: item.deposit_limit,
				turnover_limit: item.turnover_limit,
				disallow_vips: item.disallow_vips,
			}
			if (list.length == 1) {
				if (list[0].props && list[0].props[0]) {
					result.rewards.push(list[0].props[0].item_type)
				}
				if (list[0].point) {
					result.point = list[0].point
				}
				item.show_point = result.point && !result.rewards.length
				item.show_count = !item.show_point
			} else if (list.length == 2) {
				if (list[0].props && list[0].props[0]) {
					result.rewards.push(list[0].props[0].item_type)
				}
				if (list[1].props && list[1].props[0] && (result.rewards.length == 0 || result.rewards[0] != list[1].props[0].item_type)) {
					result.rewards.push(list[1].props[0].item_type)
				}
				if (list[0].point || list[1].point) {
					result.point = list[0].point || list[1].point
				}
				result.random = true
			} else if (list.length > 2) {
				result.random = true
				result.more = true
			}
			return result
		},
		close() {
			closePopup('download')
		},
		getMyCheckin() {
			useGetActivityDetail(
				{ body: { atype: ActivityTypeEnum.checkIn } },
				(res: any) => {
					let result = res?.details || {}
					if (JSON.stringify(result) != JSON.stringify(this.self)) {
						this.self = res?.details || {}
						this.updatePageData()
					}
				},
				(err: any) => {}
			)
		},
		doCheckin() {
			let item = this.currentItem
			if (!item) return
			if (item.receive) return
			const { addErrorMessage } = useSysConfigStore()
			const { $t } = useNuxtApp()
			if (this.self.err) {
				if (this.self.err.ret == 16201) {
					return
				}
				if (this.self.err.ret) {
					let message = Helper.getErrnoStr({ _errno: this.self.err.ret, _param: this.self.err.Params })
					return addErrorMessage({ id: `errno-${this.self.err.ret}`, msg: message, type: 'warning' })
				}
			}
			useDoActivity(
				{ loading: 2, body: { atype: ActivityTypeEnum.checkIn } },
				(res: any) => {
					googleEvent({ sendType: 1, event: 'recieve_reward', type: 'activity', module: 'check_in_seven', prop: { day: item.day } })
					this.clickId = item.day
					useRewardsStore().otherPageLoadRewards()
					addErrorMessage({ id: 'check-in-success', msg: $t('errno16201'), type: 'success' })
				},
				(err: any) => {}
			)
		},
		updatePageData() {
			let list: any = []
			let from = Object.values(this.cfg?.List || {}) || []
			from.sort((a: any, b: any) => (a.day > b.day ? 1 : -1))
			from.forEach((el: any) => {
				list.push(this.getItemImage(el))
			})
			if (list[list.length - 1]) {
				list[list.length - 1].last = true
			}
			this.list = list
		},
		mounted() {
			googleEvent({ sendType: 1, event: 'page_show', type: 'activity', module: 'check_in_seven' })
			useUserStore().redPoint.checkIn = 0
			if (useSysConfigStore().checkinCfg?.cfg) {
				this.cfg = useSysConfigStore().checkinCfg?.cfg
			}
			this.getMyCheckin()
			this.updatePageData()
		},
		unmounted() {
			this.clickId = -1
			this.clickStatus = false
		},
	},
	getters: {
		getDayRule: (state) => (item: any) =>
			useNuxtApp().$t('CI0008', {
				symbol_point: `<em>${useSysConfigStore().currency_symbol}${useNuxtApp().$fp(useNuxtApp().$cp(item.deposit_limit))}</em>`,
				day: `<em>"${useNuxtApp().$t('CI0011')} ${item.day}"</em></li>`,
			}),
		checkinDay: (state) => (!state.self.err || state.self.err.ret != 16201 ? Math.max(state.self.nth - 1, 0) : Math.max(state.self.nth, 0)),
		currentItem: (state) => {
			let find = state.list.find((el) => el.current)
			return find
		},
	},
})
