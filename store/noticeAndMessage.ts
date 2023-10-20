import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'
import { mapFace, webMessageConfig } from '~~/apis/types'

export const useNoticeAndMessageStore = defineStore({
	id: 'notice-msg-store',
	state: () => {
		return {
			noticeList: <Array<any>>[],
			emailList: <Array<webMessageConfig>>[],
			userClickIdMap: <mapFace>{},
			unreadEmailCount: 0,
		}
	},
	actions: {
		clear() {
			this.emailList = []
			this.noticeList = []
		},
		loadData(type = 0) {
			useGetMessageList(
				{ body: { type } },
				(res: any) => {
					if (type == 0 || type == 1) {
						this.noticeList = res.notice || []
					}
					if (type == 0 || type == 2) {
						let list = res.mail || []
						if (this.userClickIdMap && this.userClickIdMap.length) {
							list.forEach((el: any, index: number) => {
								if (this.userClickIdMap[el.id]) {
									this.emailList[index] = this.userClickIdMap[el.id]
								}
							})
						}
						this.emailList = list
						this.updateUnreadEmailCount()
					}
				},
				(err: any) => {
					// HallLog.error('useGetMessageList error', err)
				}
			)
		},
		updateUnreadEmailCount() {
			this.unreadEmailCount = this.emailList.filter((el) => !el.red_status).length
		},
		readEmail(item: any, index: any) {
			if (item && !item.red_status && !item.page_read) {
				useReadMsg(
					{ body: { id: item.id, msg_type: 2, red_status: true } },
					(res: any) => {
						item.page_read = true
						this.userClickIdMap[item.id] = item
						if (!index) {
							this.renderEmailList(0)
						}
					},
					(err: any) => {
						// HallLog.error('useReadMsg error', err)
					}
				)
			}
		},
	},
	getters: {
		renderEmailList: (state) => (index: number) => {
			if (index == 0) {
				for (let key in state.userClickIdMap) {
					let el = state.userClickIdMap[key]
					el.red_status = 1
					if (state.unreadEmailCount > 0) {
						state.unreadEmailCount--
					}
				}
				state.userClickIdMap = {}
				return state.emailList
			} else {
				return state.emailList.filter((el) => !el.red_status)
			}
		},
	},
})
