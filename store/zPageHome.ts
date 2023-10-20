import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'

export const useHomeStore = defineStore({
	id: 'home-store',
	state: () => {
		return {
			recent: <any>[],
			recentKey: 'recent' + Date.now(),
			showSearchResult: false,
			searchText: '',
			showSearch: false,
			recommendKey: 'recommend' + Date.now(),
			showWallet: false,
			focusInput: false,
			showOldWallet: false,
			infoShow: false,
			showInfoMenu: false,
		}
	},
	actions: {
		handleClick() {
			//Todu download
		},
		closeWallet() {
			this.showWallet = false
		},
		closeSearch(reset = true) {
			if (this.showSearchResult) {
				this.showSearchResult = false
				this.focusInput = false
				this.searchText = ''
				let page: any = document.querySelector('.page-container')
				if (page) {
					page.style.removeProperty('overflow')
				}
				document.body.style.removeProperty('overflow')
			}
		},
		updateSeachText(text: string) {
			this.searchText = text
		},
		closeOldWallet() {
			this.showOldWallet = false
		},
		changeShowWallet() {
			this.showWallet = !this.showWallet
			this.showInfoMenu = false
		},
		openMenuInfo() {
			this.showWallet = false
			this.showInfoMenu = !this.showInfoMenu
		},
		closeMenuInfo() {
			this.showInfoMenu = false
		},
		changeShowSearchResult() {
			this.showSearchResult = true
			let page: any = document.querySelector('.page-container')
			if (page) {
				page.style.overflow = 'hidden'
			}
			document.body.style.overflow = 'hidden'
			setTimeout(() => {
				this.focusInput = this.showSearchResult
			}, 300)
		},
		updateRecommendKey() {
			this.recommendKey = 'recommend' + Date.now()
		},
		close() {
			closePopup('download')
		},
		updateRecent() {
			let len = this.recent.length
			if (len < 10) {
				const configStore = useSysConfigStore()
				let gameList = configStore.pageConfig?.index?.game?.list || []
				let count = 10 - len
				let first = 0
				let initArray: any = []
				let gameIdMaps: any = {}
				for (let i = 0; i < gameList.length; i++) {
					let item = gameList[i].list || []
					for (let j = 0; j < item.length; j++) {
						let list = item[j]?.list || []
						for (let k = 0; k < list.length; k++) {
							let game_id = list[k]?.game_id
							if (game_id && !gameIdMaps[game_id]) {
								gameIdMaps[game_id] = true
								let name = `${parseInt(Math.random() * 8000000 + 1000000 + '')}`
								initArray.push({
									game_id: parseInt(game_id),
									point: parseInt(`${Math.random() * 8999 + 1000 / 10}`) * 10 * configStore.config.point_ratio,
									user: name.substring(0, 2) + '****' + name[name.length - 1],
									user_id: name,
								})
								first++
								if (first >= count) {
									break
								}
							}
						}
						if (first >= count) {
							break
						}
					}
					if (first >= count) {
						break
					}
				}
				this.recent.unshift(...initArray.slice(initArray.length - 10 + len, initArray.length))
				this.recent.sort((a: any, b: any) => (a.point > b.point ? -1 : 1))
			}
			this.recentKey = 'recent' + Date.now()
		},
		resetList() {
			useGetGamewinrecord(
				{},
				(res: any) => {
					let list = res?.data || []
					const configStore = useSysConfigStore()
					list.filter((el: any) => configStore.gameAllMap[el.game_id])
					list.forEach((el: any) => {
						let user = `${el.user_id}`
						user = user.substring(0, 2) + '****' + user[user.length - 1]
						el.user = user
					})
					this.recent = list
					this.updateRecent()
				},
				(err: any) => {}
			)
		},
		changeShowSearch(val?: boolean) {
			if (val == undefined) {
				this.showSearch = !this.showSearch
			} else {
				if (!val) {
					if (!this.searchText) {
						this.showSearch = val
						this.closeSearch()
					}
				} else {
					this.showSearch = val
				}
			}
		},
		mounted() {
			HallLog.log('index mounted')
			setPagePaddingTitle('')
			useUserStore().getRedPointData()
		},
		recentMounted() {
			this.updateRecent()
			this.resetList()
		},
		unmounted() {
			HallLog.log('index unmounted')
			this.closeSearch()
			this.showWallet = false
		},
	},
	getters: {
		show: (state) => !!(state.searchText || state.showSearch),
	},
})
