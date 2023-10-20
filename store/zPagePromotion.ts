import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'

export const usePromotionStore = defineStore({
	id: 'promotion',
	state: () => {
		return {
			showModal: false,
			itemData: <any>{},
			openId: vueStorage('p_c_a_n', ''),
		}
	},
	actions: {
		mounted() {
			HallLog.log('promotion mounted')
			useUserStore().redPoint.promotion = 0
			setTimeout(() => {
				setPagePaddingTitle('H0002')
			})
		},
		unmounted() {
			HallLog.log('promotion unmounted')
			setPagePaddingTitle('')
		},
		close() {
			this.showModal = false
		},
		openDetail(id: any) {
			this.openId = id
			openPopup(PopupEnum.promotioncontent)
			// googleEvent({ event: 'activity', click_id: id, sendType: 1 })
		},
	},
	getters: {
		activity: (state) => {
			if (state.openId) {
				let find = useSysConfigStore().config.offine_activity_config.find((el: any) => el._id == state.openId) || { content: {} }
				return find
			} else {
				return { content: {} }
			}
		},
		openList: () => {
			const configStore = useSysConfigStore()
			const userStore = useUserStore()
			const list = configStore.config?.offine_activity_config || []
			const result = list.filter(
				(el: any) =>
					userStore.getStatusByDeny(el.deny_pack || [], el.deny_pack_type || 0, el.status) &&
					el.stime <= configStore.currentTimestamp &&
					(!el.etime || el.etime > configStore.currentTimestamp)
			)
			return result
		},
	},
})
