import { UserGameRecordInfo } from './../types/appserverComponents'
import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'

export const useBetHisotryStore = defineStore({
	id: 'bet-history-store',
	state: () => {
		return {
			showModal: false,
			tabIndexActive: 0,
			page: 1,
			limit: 20,
			refreshing: false,
			loading: <number | boolean>0,
			timeTypeIndex: 0,
			timeTypeList: ['AF0010', 'AF0011', 'AF0012'],
			gclass: -1,
			gclassIndex: 0,
			list: <Array<UserGameRecordInfo>>[],
			tabList: [
				{ index: 0, text: 'AF0013' },
				{ index: 1, text: 'T0009' },
			],
		}
	},
	actions: {
		changeTabIndexActive(index: number) {
			this.tabIndexActive = index
			this.refresh()
		},
		refresh() {
			this.page = 0
			this.loading = 0
			this.list = []
			this.loadData()
		},
		renderPointClass(value: number) {
			if (value > 0) {
				return 'warning'
			} else if (value < 0) {
				return 'error'
			} else {
				return 'text-lowlight'
			}
		},
		selectChange(value: number, type: number) {
			if (type == 0) {
				this.changeTimeType(value)
			} else {
				this.changeGclass(value)
			}
		},
		changeGclass(value: any) {
			if (this.gclassIndex != value) {
				this.gclassIndex = value
				let find = this.selectComp[1]?.list[value] || { gclass: -1 }
				this.gclass = find.gclass
				this.refresh()
			}
		},
		changeTimeType(value: any) {
			if (this.timeTypeIndex != value) {
				this.timeTypeIndex = value
				this.refresh()
			}
		},
		loadData($state?: { error: () => void } | undefined) {
			this.page++
			let stime = getTimestamp(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000)
			if (this.timeTypeIndex == 1) {
				stime -= 7 * 24 * 60 * 60
			} else if (this.timeTypeIndex == 2) {
				stime -= 60 * 24 * 60 * 60
			}
			let etime = getTimestamp()
			if (this.list[this.list.length - 1]) {
				etime = this.list[this.list.length - 1].itime
			}
			let body: any = {
				gclass: Number(this.gclass),
				page_size: this.limit,
				page: this.page,
				is_win: this.tabIndexActive,
				stime,
				etime,
			}
			useGetGameRecord(
				{ body },
				(res: any) => {
					let list = res.list || []
					if (body.page == 1) {
						this.list = list
					} else {
						this.list = this.list.concat(list)
					}
					this.loading = list.length < this.limit
				},
				(err: any) => {
					// HallLog.error('useGetGameRecord error', err)
				}
			)
		},
		mounted() {
			this.tabIndexActive = 0
			this.refresh()
		},
	},
	getters: {
		selectComp: (state) => {
			const { $i18n } = useNuxtApp()
			let langValue: any = {}
			for (let key in langConf) {
				langValue[key] = $i18n.t('T0010', {}, { locale: langConf[key].i18n })
			}
			let list = useSysConfigStore().gameGclassList || []
			const gclassList = [{ gclass: -1, name: langValue }, ...list]
			return [
				{ value: state.timeTypeIndex, list: state.timeTypeList, langBol: 1 },
				{ value: state.gclassIndex, list: gclassList, langBol: 2, langBolKey: 'name' },
			]
		},
	},
})
