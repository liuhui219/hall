import { defineStore } from 'pinia'

export const useBonusCenterStore = defineStore({
	id: 'bonus-center-store',
	state: () => {
		return {
			giftCode: '',

			bEntranceShow: false,
		}
	},
	actions: {
		mounted() {
			useUserStore().getRedPointData()

			if (!this.bEntranceShow) {
				this.bEntranceShow = true
				googleEvent({ sendType: 1, event: 'entrance_show', type: 'activity', module: 'check_in_seven' })
				googleEvent({ sendType: 1, event: 'entrance_show', type: 'activity', module: 'task_page' })
				googleEvent({ sendType: 1, event: 'entrance_show', type: 'activity', module: 'roulette_page' })
				googleEvent({ sendType: 1, event: 'entrance_show', type: 'activity', module: 'invite_page' })
			}
		},
	},
	getters: {
		showDailyBonus: (state: any) => {
			const userStore = useUserStore()
			const configStore = useSysConfigStore()
			let result =
				configStore.pageConfig.sysConfig.activity.task ||
				(!!userStore.rouletteStatus && !userStore.getActivityCount(ActivityTypeEnum.roulette).receive) ||
				!userStore.getActivityCount(ActivityTypeEnum.proxyAward).receive ||
				(userStore.inviteChestStatus && !userStore.getActivityCount(ActivityTypeEnum.inviteChest).receive) ||
				(userStore.checkinStatus && !userStore.getActivityCount(ActivityTypeEnum.checkIn).receive)
			return result
		},
		showVipBonus: (state) => {
			const userStore = useUserStore()
			return userStore.vipUpgradeStatus || userStore.vipWeeklyStatus || userStore.vipRebateStatus
		},
	},
})
