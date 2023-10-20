import { defineStore } from 'pinia'

export const useDownloadStore = defineStore({
	id: 'download-store',
	state: () => {
		return {
			show: false,
		}
	},
	actions: {
		handleClick() {
			//Todu download
		},
		close() {
			closePopup('download')
		},
		mounted() {
			nextTick(() => {
				setTimeout(() => {
					this.show = true
				}, 200)
			})
		},
		unmounted() {
			this.show = false
		},
	},
	getters: {},
})
