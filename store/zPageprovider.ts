import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'
export const useProviderStore = defineStore({
	id: 'provider-store',
	state: () => {
		return {
			selectValue: 0,
			searchText: '',
		}
	},
	actions: {
		mounted() {
			HallLog.log('provider mounted')
			this.searchText = ''
		},
	},
	getters: {
		titlePlatText: (state) => {
			const $router = useRouter()
			return useSysConfigStore().getProviderByPlat(useRoute().query?.gplat).name || ''
		},
		allList: (state: any) => {
			const list = useSysConfigStore().gamePlatMap['' + useRoute().query?.gplat] || []
			if (state.searchText) {
				return list.filter((el: any) => el.name?.toLocaleLowerCase().includes(state.searchText.toLocaleLowerCase()))
			} else {
				return list
			}
		},
		list: (state: any) => {
			let arr = [...state.allList]
			if (state.selectValue == 1) {
				arr.sort((a, b) => (a.name < b.name ? -1 : 1))
			} else if (state.selectValue == 2) {
				arr.sort((a, b) => (a.name > b.name ? -1 : 1))
			}
			return arr
		},
	},
})
