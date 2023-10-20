import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'

export const useClassGameStore = defineStore({
	id: 'class-game-store',
	state: () => {
		return {
			active: '',
			index: 0,

			searchText: '',
			selectValue: 0,
		}
	},
	actions: {
		mounted() {
			HallLog.log('class-game mounted')
			this.searchText = ''
			this.selectValue = 0

			const route = useRoute()
			this.active = route.query.active ? route.query.active + '' : 'bonus'
			this.index = route.query.index ? Number(route.query.index) : 0
		},

		unmounted() {
			HallLog.log('class-game unmounted')
		},

		//页面跳转函数
		toClassGame(query_item: any = {}) {
			this.searchText = ''
			this.selectValue = 0
			this.active = query_item.active ? query_item.active + '' : 'bonus'
			this.index = query_item.index ? Number(query_item.index) : 0
			navigateTo({ path: '/class-game', query: query_item })
		},

		changeSort(val: number) {
			this.selectValue = val
		},
	},
	getters: {
		classGameBase: (state: any) => {
			const configStore = useSysConfigStore()
			let result = { title: {}, list: [] }
			if (state.active == 'bonus') {
				result = { title: { 0: useNuxtApp().$t('H0009') }, list: configStore.gameBonusList }
			} else {
				let from = configStore.pageConfig?.index?.game || { list: [{ list: [] }] }
				result = from.list[state.active || 0].list[state.index || 0]
			}
			return result
		},

		classGameList: (state: any) => {
			const configStore = useSysConfigStore()
			let game_list = state.classGameBase.list?.map((el: any) => configStore.gameAllMap[el.game_id]) || []
			let result = []
			if (!state.searchText) {
				result = game_list
			} else {
				result = configStore.searchGameByText(state.searchText, game_list, 0)
			}
			if (state.selectValue > 0) {
				if (state.selectValue == 1) {
					result.sort((a: any, b: any) => {
						return a.name < b.name ? -1 : 1
					})
				} else {
					result.sort((a: any, b: any) => {
						return a.name > b.name ? -1 : 1
					})
				}
			}
			return result
		},
	},
})
