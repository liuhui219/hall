import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'

export const useTempStore = defineStore({
	id: 'temp',
	state: () => {
		return {
			currPage: '',

			scaleRate: 1,
			gameList: [111902075, 111902076, 111902086, 111902079, 100402038, 111902026, 111902048, 100602237],
		}
	},
	actions: {
		mounted() {
			HallLog.log('temp mounted:' + this.currPage)
			googleEvent({ event: `temp_view_${this.currPage}`, sendType: 1 })
			setPagePaddingTitle('')
			const pageContainer = document.getElementById('page-container')
			const pageWidth = pageContainer ? pageContainer.clientWidth : 375
			this.scaleRate = pageWidth / 375
		},
		unmounted() {
			HallLog.log('TEMP unmounted')
		},
	},
	getters: {},
})
