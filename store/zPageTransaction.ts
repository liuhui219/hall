import { defineStore } from 'pinia'
import { uuid } from 'vue3-uuid'
import Helper from '~~/apis/tool/Helper'
import { mapFace } from '~~/apis/types'
import { TransactionTypeEnum } from '~~/composables/enums'
import { ApplyCashListInfo } from '~~/types/appserverComponents'
interface BillRecord {
	bill_no: string
	bill_type: number // 账变类型
	amount: number //操作金额
	amount2: number // 操作金额 彩金
	opening_balance: number //amount帐变前
	closing_balance: number //amount帐变后
	opening_balance2: number //amount2帐变前
	closing_balance2: number //amount2帐变后
	created_at: number //created_at
}
export const useTransactionStore = defineStore({
	id: 'transaction-store',
	state: () => {
		return {
			showModal: false,
			limit: 50,
			page: 1,
			list: <Array<BillRecord>>[],
			typeMap: {
				[TransactionTypeEnum.all]: { value: TransactionTypeEnum.all, text: 'AF0013' },
				[TransactionTypeEnum.gift]: { value: TransactionTypeEnum.gift, text: 'T0027' },
				[TransactionTypeEnum.commission]: { value: TransactionTypeEnum.commission, text: 'T0028' },
				[TransactionTypeEnum.depoistOrWithdraw]: { value: TransactionTypeEnum.depoistOrWithdraw, text: 'T0029' },
				[TransactionTypeEnum.game]: { value: TransactionTypeEnum.game, text: 'T0030' },
			},
			billTextMap: {
				201: 'BC0012',
				203: 'BC0012',
				202: 'U0002',
				204: 'U0002',
			},
			date: '',
			finish: InfiniteTypeEnum.init,
			typeIndex: 0,
		}
	},
	actions: {
		getBillTypeText(bill_type: number) {
			if (this.billTextMap[bill_type]) return this.billTextMap[bill_type]
			if (bill_type >= 0 && bill_type < 100) return this.typeMap[TransactionTypeEnum.gift].text
			if (bill_type >= 100 && bill_type < 200) return this.typeMap[TransactionTypeEnum.commission].text
			if (bill_type >= 300 && bill_type < 400) return this.typeMap[TransactionTypeEnum.game].text
			return 'T0031'
		},
		changeTime(value: any) {
			this.date = value
			this.page = 0
			this.list = []
			this.finish = InfiniteTypeEnum.init
		},
		chageType(item: any, value: number) {
			this.typeIndex = value
			this.page = 0
			this.list = []
			this.finish = InfiniteTypeEnum.init
		},
		renderDepositClass(value?: any) {
			if (value == 2) {
				return {
					class: 'text-second',
					text: useNuxtApp().$t('T0002'),
				}
			} else if (value == 1) {
				return {
					class: 'color-text',
					text: useNuxtApp().$t('T0003'),
				}
			} else {
				return {
					class: 'error',
					text: useNuxtApp().$t('T0004'),
				}
			}
		},
		renderWithdrawClass(value: Number) {
			if (value == 3) {
				return {
					class: 'text-second',
					text: useNuxtApp().$t('T0002'),
				}
			} else if (value == -1) {
				return {
					class: 'text-lowlight',
					text: useNuxtApp().$t('T0006'),
				}
			} else {
				return {
					class: 'text-lowlight',
					text: useNuxtApp().$t('TR0007'),
				}
			}
		},
		async loadData() {
			this.page++
			let time = new Date(this.date.replace(/\-/gi, '/'))
			let start_time = parseInt(time.valueOf() / 1000)
			let end_time = start_time + 24 * 60 * 60
			let opt_type = this.typeList[this.typeIndex].value
			let body = {
				limit: this.limit,
				page: this.page,
				start_time,
				end_time,
				opt_type,
			}
			useGetBillRecord(
				{ body: body },
				(res: any) => {
					if (opt_type == this.typeIndex - 1) {
						let list = res.list || []
						if (body.page == 1) {
							this.list = list
						} else {
							this.list = [...this.list, ...list]
						}
						this.finish = list.length < body.limit
					}
				},
				(err: any) => {
					// HallLog.error('transaction loadData error', err)
					this.finish = InfiniteTypeEnum.error
				}
			)
		},
		mounted() {
			let date = new Date()
			this.date = `${date.getFullYear()}-${Helper.addZero(date.getMonth() + 1)}-${Helper.addZero(date.getDate())}`
			this.list = []
			this.page = 0
			this.typeIndex = 0
		},
	},
	getters: {
		typeList: (state) => {
			let list = Object.values(state.typeMap)
			list.sort((a: any, b: any) => (a.value > b.value ? 1 : -1))
			return list
		},
	},
})
