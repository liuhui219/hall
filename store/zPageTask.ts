import { useSysConfigStore } from './config'
import { mapFace } from '~~/apis/types'
import { defineStore } from 'pinia'
import Helper from '~~/apis/tool/Helper'
import { GetMyTaskActivityCfgInfo } from '~~/types/appserverComponents'
import HallLog from '~~/apis/debug/HallLog'
export const useTaskStore = defineStore({
	id: 'task-store',
	state: () => {
		return {
			timer: null,
			haveNewbie: true,
			task_point: 50,
			loaded: false,
			progressActive: -1,
			task_point_left_time: 156071,
			day_left_time: 1888,
			week_left_time: 156071,
			taskPercentage: '0%',
			tabList: [
				{ text: 'TA0002', id: 4, index: 0, show: true, list: <Array<GetMyTaskActivityCfgInfo>>[] },
				{ text: 'TA0003', id: 1, index: 1, show: true, list: <Array<GetMyTaskActivityCfgInfo>>[] },
				{ text: 'TA0004', id: 2, index: 2, show: true, list: <Array<GetMyTaskActivityCfgInfo>>[] },
			],
			tabIndex: 0,
			progress: [
				{
					need_task_point: 10,
					reward: { props: <any[]>[], point: 0 },
					status: 0,
				},
				{
					need_task_point: 20,
					reward: { props: <any[]>[], point: 0 },
					status: 0,
				},
				{
					need_task_point: 30,
					reward: { props: <any[]>[], point: 0 },
					status: 0,
				},
				{
					need_task_point: 40,
					reward: { props: <any[]>[], point: 0 },
					status: 0,
				},
			],
		}
	},
	actions: {
		mounted() {
			HallLog.log('task mounted')
			googleEvent({ sendType: 1, event: 'page_show', type: 'activity', module: 'task_page' })

			useUserStore().redPoint.task = 0
			setTimeout(() => {
				setPagePaddingTitle('H0020')
			})
			this.getTaskList()
		},
		unmounted() {
			HallLog.log('task unmounted')
			setPagePaddingTitle('')
			removeTimer('task')
		},
		receiveTask(item: mapFace) {
			if (item.status != 1) {
				return
			}
			useGetUserTaskPointReward(
				{ body: { need_task_point: item.need_task_point } },
				(res: any) => {
					googleEvent({
						sendType: 1,
						event: 'recieve_reward',
						type: 'activity',
						module: 'task_page',
						prop: { task_id: item.need_task_point },
					})
					const { addErrorMessage } = useSysConfigStore()
					let str = useNuxtApp().$t('TA0008', {
						point: `<em class='text-number'>${useSysConfigStore().currency_symbol}${useNuxtApp().$fp(
							useNuxtApp().$cp(res.reward_point)
						)}</em>`,
						vip: `<em class='text-number'>${parseFloat((res.reward_vip_point / 100 || 0).toFixed(2))}</em>`,
					})
					addErrorMessage({
						id: 'success_task_reward',
						msg: str,
						type: 'success',
					})
					this.getTaskList()
				},
				(err: any) => {
					// HallLog.error('useGetUserTaskPointReward error', err)
				}
			)
		},
		groupBy(objectArray: any[], property: string) {
			const configStore = useSysConfigStore()
			let result = objectArray.reduce(function (
				acc: { [x: string]: any[] },
				obj: {
					[x: string]: any
					showRate: any
					task_type: string | number
					task_num: number
					task_self_num: number
					achievementRate: number
					achievementColor: string
				}
			) {
				let key = obj[property]
				//是否显示金额进度
				let from: any = configStore.pageConfig.sysConfig.task_rate_map
				obj.showRate = !!from[obj.task_type]
				if (obj.showRate) {
					//计算金额进度
					let achievementRate = obj.task_num ? parseFloat(((obj.task_self_num / obj.task_num) * 100).toFixed(2)) : 0
					obj.achievementRate = achievementRate
					obj.achievementColor = achievementRate == 0 ? 'text-lowlight' : achievementRate >= 100 ? 'warning' : 'text-second'
				}

				if (!acc[key]) {
					acc[key] = []
				}
				acc[key].push(obj)
				return acc
			}, {})
			return result
		},
		getTaskList() {
			useGetMyTaskInfo(
				{},
				(res: any) => {
					this.loaded = true
					res.list = res.list || []
					let progress = res.progress || []
					progress.forEach((el: any) => {
						el.reward = el.reward || {}
						el.reward.props = el.reward.props || []
					})
					res.list.sort((a: { task_status: number; sort: number }, b: { task_status: number; sort: number }) => {
						return (a.task_status == 1 ? a.sort - 100 : a.sort) - (b.task_status == 1 ? b.sort - 100 : b.sort)
					})
					res.list.forEach((el: any) => {
						el.reward = el.reward || {}
						el.reward.props = el.reward.props || []
					})
					let groupMaps = this.groupBy(res.list, 'task_week')
					let init = false
					this.tabList.forEach((el) => {
						el.list = groupMaps[el.id] || []
						el.show = !!el.list.length
						if (!init && el.show) {
							init = true
							this.changeTabIndex(el.index)
						}
					})
					// res.task_point = res.progress[1].need_task_point;
					// res.progress[0].status = 2;
					// res.progress[1].status = 1;
					this.task_point = res.task_point
					this.progress = progress

					let index = this.progress.findIndex((el) => el.status == 0)
					if (index == -1) {
						this.progressActive = this.progress.length - 1
					} else {
						this.progressActive = index - 1
					}
					this.task_point_left_time = res.task_point_left_time
					this.day_left_time = res.day_left_time
					this.week_left_time = res.week_left_time

					//计算任务进度条
					let percentage = 0
					this.progress.forEach((item, index) => {
						if (this.task_point >= item.need_task_point) {
							percentage += this.task_point === item.need_task_point ? 9 + index : 25
						}
					})
					this.taskPercentage = percentage + '%'
					registerTimer('task', () => {
						this.task_point_left_time--
						this.day_left_time--
						this.week_left_time--
						if (this.task_point_left_time <= 0 || this.day_left_time <= 0 || this.week_left_time <= 0) {
							this.getTaskList()
						}
					})
				},
				(err: any) => {
					// HallLog.error('useGetMyTaskInfo error', err)
				}
			)
		},
		//去完成任务
		skipWay(item: { task_id: number; task_type: number; game_id: string | any[]; achievementRate: number }) {
			googleEvent({
				sendType: 1,
				event: 'toward_click',
				type: 'activity',
				module: 'task_page',
				prop: { task_id: item.task_id, percent: item.achievementRate / 100 },
			})
			if ([1001, 1002, 2001, 2002].indexOf(item.task_type) != -1) {
				openPopup(PopupEnum.deposit)
			} else if ([3001, 3002].indexOf(item.task_type) != -1) {
				navigateTo('/refer-and-earn')
			} else if ([4001, 4101, 4102, 4103, 4201, 4202, 4204, 4205, 7001].indexOf(item.task_type) != -1) {
				if (item.game_id.length > 0) {
					// let time = Date.now() % 2 == 0
					// let randomIndex = Math.floor(Math.random() * (item.game_id.length - 1))
					// if (time) {
					// 	randomIndex = Math.ceil(randomIndex)
					// } else {
					// 	randomIndex = Math.floor(randomIndex)
					// }
					useGameStore().tryToGame(item.game_id[0], true, false)
				} else {
					useCasinoStore().toCasino()
				}
			} else if ([6001].indexOf(item.task_type) != -1) {
				openPopup(PopupEnum.withdraw)
			} else if ([5001, 5002].indexOf(item.task_type) != -1) {
				openPopup(PopupEnum.account)
			}
		},
		changeTabIndex(index: number) {
			this.tabIndex = index
		},
	},
	getters: {
		taskList: (state): Array<any> => state.tabList[state.tabIndex].list,
		showTabList: (state) => state.tabList.filter((el) => el.show),
		renderBaseTimeLeft: (state) => Helper.renderTimeRemain(state.task_point_left_time),
		renderTimeLeft: (state) =>
			state.tabIndex == 4
				? Helper.renderTimeRemain(state.task_point_left_time)
				: Helper.renderTimeRemain(state.tabIndex == 1 ? state.day_left_time : state.week_left_time),
	},
})
