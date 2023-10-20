import { defineStore } from 'pinia'
import { mapFace } from '~~/apis/types'
import { useMygameStore } from './zPageMygame'
export const useGamedetailStore = defineStore({
	id: 'gamedetail-store',
	state: () => {
		return {
			gameListData: <Array<any>>[],
			gameInfo: <mapFace>{ src: '', name: '', game_id: 0, demo: 0 },
			showOverlay: false, //遮罩层是否显示
			gameTypeObj: {},
		}
	},
	actions: {
		mounted() {
			const route = useRoute()
			const configStore = useSysConfigStore()
			this.gameListData = configStore.pageConfig.index.search.list || []
			this.gameInfo = configStore.getGameByGameId(Number(route.query.gid))

			//获取数据时直接获取gameTypeObject
			const gclass_item_map = configStore.pageConfig.sysConfig.gclass_item_map
			this.gameTypeObj = gclass_item_map[this.gameInfo.gclass]
		},
		toggleFavorite(game: any) {
			const user = useUserStore()
			if (!user.isLogin) {
				//跳转登录
				return openLoginOrRegister()
			}
			useMygameStore().setCollectGame(game.game_id)
		},
		gotoprovider(plat: any) {
			if (plat == -1) {
				navigateTo('/providers')
			} else {
				toProvider(plat)
			}
		},
		// pc端切换试玩真玩
		goGamePlayChange(val: Boolean) {
			const gameStore = useGameStore()
			gameStore.tryToGame(this.gameInfo.game_id, true, val)
		},
	},
	getters: {
		realPlayshow: (state) => {
			const user = useUserStore()
			const app = useNuxtApp()
			if (!user.isLogin) {
				return false
			}
			if (state.gameInfo.isOringinal) {
				return true
			}
			return Number(app.$cp(user.data.point)) >= (state.minPoint || 0)
		},
		minPoint: (state) => {
			const app = useNuxtApp()
			const configStore = useSysConfigStore()
			const userStore = useUserStore()
			const enterGameMinPoint = userStore.data.is_pay ? 0 : configStore.getProviderByPlat(state.gameInfo.gplat).enterGameMinPoint || 0
			const third_minpoint = configStore.config.third_minpoint
			return app.$cp(enterGameMinPoint) > third_minpoint ? app.$cp(enterGameMinPoint) : third_minpoint
		},
		minpointTips: (state) => {
			const app = useNuxtApp()
			return app.$t('GA0005', { min_point: app.$fp(state.minPoint) })
		},
		switchBol: (state) => useGameStore().demo,
		isFavorite: (state) => {
			const myGameStore = useMygameStore()
			return myGameStore.isFavorite(state.gameInfo.game_id)
		},
	},
})
