import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'

export const useMygameStore = defineStore({
	id: 'mygame-store',
	state: () => {
		return {
			tabId: 1,
			recentlyData: <Array<any>>[],
			favoriteData: <Array<any>>[],
		}
	},
	actions: {
		mounted() {
			HallLog.log('mygames mounted')
			this.getRecentlyData()
		},
		changeData(type: number) {
			this.tabId = type
			setTimeout(() => {
				if (type) {
					this.getRecentlyData()
				}
			})
		},
		getRecentlyData() {
			useMyGameList(
				{},
				(res: any) => {
					if (res.recent_gid.length) {
						const configStore = useSysConfigStore()
						this.recentlyData = res.recent_gid.filter((el: any) => configStore.gameAllMap[el])
						this.favoriteData = res.collect_gid.filter((el: any) => configStore.gameAllMap[el])
					}
				},
				(err: any) => {}
			)
		},
		//收藏游戏
		setCollectGame(gid: number) {
			if (!useUserStore().isLogin) {
				openLogin()
				return
			}
			const isFavorite = this.isFavorite(gid)
			const params = {
				body: {
					type: isFavorite ? 2 : 1, //1 收藏 2 取消收藏
					gid: gid,
				},
			}
			useCollectgame(
				params,
				(res: any) => {
					this.favoriteData = res.collect_gid
				},
				(err: any) => {
					// HallLog.error('useCollectgame error', err)
				}
			)
		},
	},
	getters: {
		recommendShow: (state) => {
			if (state.tabId == 0) {
				if (state.favoriteData.length) {
					return false
				} else {
					return true
				}
			} else {
				if (state.recentlyData.length) {
					return false
				} else {
					return true
				}
			}
		},
		isFavorite: (state) => (game_id: number) => {
			return state.favoriteData.includes(game_id)
		},
	},
})
