import { defineStore } from 'pinia'

export const useMessageStore = defineStore({
	id: 'message-store',
	state: () => {
		return {
			showModal: false,
			selectedIndex: 0,
			tabIndexActive: 0,
			refreshing: false,
			expandedId: null,
			limit: 20,
			tabList: [
				{ index: 0, text: 'AF0013' },
				{ index: 1, text: 'T0012' },
			],
		}
	},
	actions: {
		close() {
			this.showModal = false
		},
		refresh() {
			setTimeout(() => {
				this.refreshing = false
			}, 1000)
		},
		switchTab(tabIndex: number) {
			if (tabIndex != this.tabIndexActive) {
				this.expandedId = null
				this.tabIndexActive = tabIndex
				document.querySelector('.message-content-wrap')?.scrollTo(0, 0)
			}
		},
		handleAccordion(item: any) {
			if (this.expandedId == item.id) {
				this.expandedId = null
			} else {
				this.expandedId = item.id
				useNoticeAndMessageStore().readEmail(item, this.tabIndexActive)
			}
		},
		mounted() {},
		unmounted() {
			useNoticeAndMessageStore().renderEmailList(0)
		},
	},
	getters: {
		list: (state) => useNoticeAndMessageStore().renderEmailList(state.tabIndexActive),
		renderItemContent: (state) => (item: any) => useNuxtApp().$pt(item.lang_msg) || item,
	},
})
