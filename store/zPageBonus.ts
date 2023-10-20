import { defineStore } from 'pinia'
export const useBonusStore = defineStore({
	id: 'bonus-store',
	state: () => {
		return {
			dayTypeList: ['AF0010', 'AF0011', 'AF0012'],
			statusList: ['AF0013', 'BH0017', 'BH0018'],
			list: <any>[],
			day_type: 1,
			status: 0,
			type: 0,
		}
	},
	actions: {
		//获取奖励使用记录
		getList() {
			const configStore = useSysConfigStore()
			const params = { body: {} }
			params.body = {
				page: 1,
				limit: 100000,
				day_type: this.day_type + 1, // 时间 1 今天 2 最近7天 3 最近60天
				status: this.status,
				opt_code: Number(configStore.rewardTypes[this.type]?.type),
			}
			useGetBonusHistory(
				params,
				(res: any) => {
					this.list = res.data || []
				},
				(err: any) => {}
			)
		},
		selectChange(value: number, type: number) {
			if (type == 0) {
				this.changeType(value)
			} else {
				this.changerewardType(value)
			}
		},
		//时间选择
		changeType(type: number) {
			this.day_type = type
			this.getList()
		},
		changeStatus(status: number) {
			this.status = status
			this.getList()
		},
		//类型选择
		changerewardType(val: number) {
			this.type = val
			this.getList()
		},
		mounted() {
			this.getList()
		},
	},
	getters: {
		selectComp: (state) => {
			return [
				{ value: state.day_type, list: state.dayTypeList, langBol: 1 },
				{ value: state.type, list: useSysConfigStore().rewardTypes, langBol: 2, langBolKey: 'title' },
			]
		},
	},
})
