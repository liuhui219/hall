import { userData } from './../apis/types/index'
import { defineStore } from 'pinia'
export const useWalletStore = defineStore({
	id: 'wallet-store',
	state: () => {
		return {
			modal: 0,
			list: <any>[],
			totalPoint: 0,
			totalCode: 0,
			totalCodeC: 0,
			sort: 0,
		}
	},
	actions: {
		changeSort(value?: number) {
			this.sort = this.sort == 0 ? 1 : 0
			this.list.reverse()
		},
		handleGet(id: any) {
			useExchangeBonus(
				{ body: { id: id }, loading: 1 },
				(res: any) => {
					let index = this.list.findIndex((el: any) => el.id == id)
					if (index > -1) {
						let item = this.list[index]
						this.totalCode -= item.code
						this.totalPoint -= item.point
						this.totalCodeC -= item.codeC
						let obj = {
							all_put_code: (useUserStore().data.all_put_code || 0) + item.code,
							ready_put_code: (useUserStore().data.ready_put_code || 0) + item.codeC,
							point: (useUserStore().data.point || 0) + item.point,
						}
						useUserStore().setUserInfo(obj)
						this.list.splice(index, 1)
					}
					useSysConfigStore().addErrorMessage({ id: 'exchage_bonus_success', type: 'success', msg: useNuxtApp().$t('REW0010') })
					this.handleList()
				},
				(err: any) => {}
			)
		},
		handleDel(id: any) {
			useDialogStore().open({
				title: useNuxtApp().$t('BH0015'),
				text: useNuxtApp().$t('BH0016'),
				ok: () => {
					useDelBonus(
						{ body: { id: id }, loading: 1 },
						(res: any) => {
							useSysConfigStore().addErrorMessage({
								id: 'delete_bonus_success',
								type: 'success',
								msg: useNuxtApp().$t('BH0019'),
							})
							this.handleList()
						},
						(err: any) => {}
					)
				},
				cancel_text: '',
			})
		},
		handleList() {
			useGetBonusList(
				{ body: {} },
				(res: any) => {
					let result = res.list || []

					let totalCode = 0
					let totalPoint = 0
					let totalCodeC = 0
					result.forEach((el: any) => {
						el.web_code = parseFloat((el.code / el.point).toFixed(2))
						totalPoint += el.point
					})
					let sort = this.sort == 0 ? 1 : -1
					let sortNext = sort == 1 ? -1 : 1
					result.sort((a: any, b: any) => {
						if (a.code == b.code) {
							if (a.point == b.point) {
								return a.over > b.over ? sort : sortNext
							}
							return a.point > b.point ? sortNext : sort
						}
						return a.code > b.code ? sort : sortNext
					})
					let codeCList = result.filter((el: any) => !!el.codeC)
					if (codeCList.length) {
						let item = sort ? codeCList[0] : codeCList[codeCList.length - 1]
						totalCode = item.code
						totalCodeC = item.codeC
					}
					this.totalPoint = totalPoint
					this.totalCode = totalCode
					this.totalCodeC = totalCodeC
					this.list = result
				},
				(err: any) => {
					// HallLog.error('useGetMyTaskInfo error', err)
				}
			)
		},
		mounted() {
			nextTick(() => {
				setTimeout(() => {
					this.modal = 1
				}, 20)
			})
		},
		unmounted() {
			setTimeout(() => {
				this.modal = 0
			})
		},
	},
	getters: {},
})
