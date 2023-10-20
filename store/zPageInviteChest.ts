import { defineStore } from 'pinia'
import Helper from '~~/apis/tool/Helper'

export const useInviteChestStore = defineStore({
	id: 'invite-chest-store',
	state: () => {
		return {
			data: {
				countdown: 60,
				invite_people_num: 0,
				list: <any>[],
				box_ids: <any>{},
				reset_period: 0,
				valid_people_num: 0,
			},
			shareUrl: '',
			timerKey: 'invite-chest-timer',
		}
	},
	actions: {
		getMyInviteChest() {
			useGetActivityDetail(
				{ body: { atype: ActivityTypeEnum.inviteChest } },
				(res: any) => {
					let data = res.details || {}
					let maps: any = {}
					data.box_ids = data.box_ids || []
					data.box_ids.forEach((el: any) => (maps[el] = true))
					data.box_ids = maps
					data.list = useSysConfigStore().inviteChestCfg.data.list || []
					data.list.forEach((el: any, index: number) => {
						el.index = Math.min(3, Math.ceil((index + 1) / 3))
						if (data.box_ids[el.id]) {
							el.status = 1
						} else if ((el.status = data.valid_people_num >= el.people_num_limit)) {
							el.status = 2
						} else {
							el.status = 0
						}
					})
					this.data = data
				},
				(err: any) => {}
			)
		},
		doInviteChest(item: any) {
			if (item.status != 2) {
				return
			}
			googleEvent({ event: 'chestClick', sendType: 1, chest_id: item.id })
			useDoActivity(
				{ loading: 1, body: { atype: ActivityTypeEnum.inviteChest, id: item.id } },
				(res: any) => {
					googleEvent({ event: 'chestClaim', sendType: 1, chest_id: item.id })
					googleEvent({ sendType: 1, event: 'recieve_reward', type: 'activity', module: 'invite_page', prop: { treasure_id: item.id } })
					item.status = 1
					this.getMyInviteChest()
					useSysConfigStore().addErrorMessage({ id: 'check-in-success', msg: useNuxtApp().$t('REW0012'), type: 'success' })
				},
				(err: any) => {
					this.getMyInviteChest()
				}
			)
		},
		updateTime() {
			this.data.countdown--
		},
		getShareUrl() {
			getUserShareurl(
				{},
				(res: any) => {
					this.shareUrl = res.url
				},
				(err: any) => {
					// HallLog.error('getUserShareurl error', err)
				}
			)
		},
		mounted() {
			googleEvent({ sendType: 1, event: 'page_show', type: 'activity', module: 'invite_page' })
			this.getShareUrl()
			registerTimer(this.timerKey, this.updateTime)
			this.getMyInviteChest()
		},
		unmouted() {
			removeTimer(this.timerKey)
		},
	},
	getters: {
		renderTotal: (state: any) => {
			let result: any = Helper.getTimeRemaining(0, state.data.countdown)
			if (result.total <= 0 && result.total > -10) {
				state.getMyInviteChest()
			}
			result.hour = Helper.addZero(result.hour)
			result.minute = Helper.addZero(result.minute)
			result.second = Helper.addZero(result.second)
			return result
		},
		isCopied: (state) => {
			return useSysConfigStore().errorMessageList.some((el: any) => el.id == 'copy_success')
		},
	},
})
