import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'
export const usePragmaticStore = defineStore({
	id: 'pragmatic-store',
	state: () => {
		return {
			platListData: <any>[],
			clickNum: 12,
			sortVal: 0,
			searchText: '',
		}
	},
	actions: {
		mounted() {
			HallLog.log('providers mounted')
			this.changeSearchText()
		},
		unMounted() {
			this.searchText = ''
		},
		changeSort(val: number) {
			this.sortVal = val
		},
		showMore() {
			const configStore = useSysConfigStore()
			const app = useNuxtApp()
			const num = app.$device.isDesktop
				? Number(configStore.pageConfig.sysConfig.pc_game_num)
				: Number(configStore.pageConfig.sysConfig.mobile_game_num)
			this.clickNum += num
		},
		changeSearchText() {
			this.clickNum = 0
			this.showMore()
		},
	},
	getters: {
		allList: (state: any) => {
			const configStore = useSysConfigStore()
			let arr = configStore.gplatList ? [...configStore.gplatList] : []
			if (state.searchText) {
				arr = arr.filter((el: any) =>
					configStore.getProviderByPlat(el).name?.toLocaleLowerCase().includes(state.searchText?.toLocaleLowerCase())
				)
			}
			return arr
		},
		list: (state: any) => {
			const configStore = useSysConfigStore()
			let arr = [...state.allList]
			if (arr.length > state.clickNum) {
				arr = arr.slice(0, state.clickNum)
			}
			if (state.sortVal == 1) {
				arr.sort((a, b) => {
					let aname = configStore.getProviderByPlat(a).name as string
					let bname = configStore.getProviderByPlat(b).name as string
					if (aname < bname) {
						return -1
					}
					return 0
				})
			} else if (state.sortVal == 2) {
				arr.sort((a, b) => {
					let aname = configStore.getProviderByPlat(a).name as string
					let bname = configStore.getProviderByPlat(b).name as string
					if (aname > bname) {
						return -1
					}
					return 0
				})
			}
			return arr
		},
	},
})
