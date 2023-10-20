import { mapFace } from '~~/apis/types'
import { defineStore } from 'pinia'
import Helper from '~~/apis/tool/Helper'
import HallLog from '~~/apis/debug/HallLog'
export const useCasinoStore = defineStore({
	id: 'casino-store',
	state: () => {
		return {
			active: '',
			gplat: -1,
			filter1: 'ALL',
			showFilter1: false,
			filter2: '',
			showFilter2: false,
			showSearchResult: false,
			alwaysShowSearch: false,
			searchText: '',
			searchList: <Array<any>>[],
			casinoGplatMap: <mapFace>{},
			casinoGplatLenMap: <mapFace>{},
		}
	},
	actions: {
		mounted() {
			//获取初始gclass
			HallLog.log('casino mounted')
			const route = useRoute()
			const configStore = useSysConfigStore()
			const tab = route.query.tab ?? configStore.gameGclassList[0].urlKey
			let find = ''
			let from = configStore.pageConfig.sysConfig.gclass_item_map
			if (from) {
				for (let key in from) {
					let item = from[key]
					if (item.urlKey === tab) {
						find = item.gclass
						break
					}
				}
			}
			this.active = find
			this.gplat = route.query.gplat ? Number(route.query.gplat) : -1
			//search
			this.searchList = configStore.pageConfig?.index?.search?.list || []
			this.searchval()

			if (!useNuxtApp().$device.isDesktop) {
				setTimeout(() => {
					this.activeToView()
				})
			}
		},
		initCasinoGplatMap() {
			const configStore = useSysConfigStore()
			for (let key in configStore.gclassGplatMap) {
				let list = [...configStore.gclassGplatMap[key]]
				list.sort((a: any, b: any) => {
					let aname = configStore.getProviderByPlat(a).name as string
					let bname = configStore.getProviderByPlat(b).name as string
					if (aname < bname) {
						return -1
					}
					return 1
				})
				list.unshift(-1)
				this.casinoGplatMap[key] = list
				let gameList = configStore.gameGclassMap[key] || []
				let maps: any = { '-1': gameList.length }
				gameList.forEach((el: any) => {
					if (maps[el.gplat]) {
						maps[el.gplat]++
					} else {
						maps[el.gplat] = 1
					}
				})
				this.casinoGplatLenMap[key] = maps
			}
		},

		filterSel(item: number) {
			this.gplat = item
			this.showFilter1 = false

			let newQuery = {}
			Helper.assignObj(newQuery, useRoute().query)
			newQuery['gplat'] = '' + item
			navigateTo({ path: '/casino', query: newQuery })
		},
		changeShowFilter1(value: boolean) {
			this.showFilter1 = value
		},
		changeShowFilter2(value: boolean) {
			this.showFilter2 = value
		},
		//娱乐城入口函数
		toCasino(gclass_item?: any) {
			if (!gclass_item) {
				const configStore = useSysConfigStore()
				gclass_item = configStore.gameGclassList[0]
			}
			this.active = gclass_item.gclass
			this.gplat = -1
			setTimeout(() => {
				this.activeToView()
			})
			navigateTo({ path: '/casino', query: { tab: gclass_item.urlKey } })
		},
		activeToView() {
			const app = useNuxtApp()
			if (!app.$device.isDesktop) {
				setTimeout(() => {
					document.querySelector('.game-type-item.active')?.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'nearest',
					})
				})
			}
		},
		hideSearch() {
			if (!this.showGplatList) {
				document.activeElement?.blur && document.activeElement?.blur()
			}
			this.searchval()
		},
		searchval() {
			this.searchText = ''
			this.showSearchResult = false
		},

		changeShowSearch(val?: boolean, el?: any) {
			if (val == undefined) {
				this.showSearchResult = !this.showSearchResult
			} else {
				if (!val) {
					if (!this.searchText) {
						this.showSearchResult = val
					}
				} else {
					this.showSearchResult = val
				}
			}
		},
		unmounted() {
			HallLog.log('casino unmounted')
			this.searchval()
		},
	},
	getters: {
		casinoGameListFilterGplat: (state) => {
			const list = useSysConfigStore().gameGclassMap[state.active]
			if (state.gplat == -1) {
				return list
			} else {
				return list.filter((el: any) => el.gplat == state.gplat)
			}
		},
		casinoGplatList: (state) => state.casinoGplatMap[state.active] || [],
		showGplatList: (state) => state.casinoGplatList.length > 2,
		casinoGplatGameLen: (state) => (gplat: any) => {
			if (state.casinoGplatLenMap[state.active]) {
				return state.casinoGplatLenMap[state.active][gplat]
			} else {
				return -1
			}
		},
	},
})
