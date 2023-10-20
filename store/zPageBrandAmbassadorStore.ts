import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'
import { mapFace } from '~~/apis/types'

export const userBrandAmbassadorStore = defineStore({
	id: 'brandAmbassador-store',
	state: () => {
		return {
			data: <mapFace>{
				banner_url: '',
				pc_banner_url: '',
				cooperation1: <mapFace>{
					content: '',
					title: {},
				},
				cooperation2: <mapFace>{
					content: <mapFace>{},
					swiper_list: <Array<any>>[],
					title: <mapFace>{},
				},
				mediaReports: {},
			},
		}
	},
	actions: {
		mounted() {
			HallLog.log('brandambassador mounted')
			const configStore = useSysConfigStore()
			this.data = configStore.pageConfig.brandConfig
		},
	},
	getters: {},
})
