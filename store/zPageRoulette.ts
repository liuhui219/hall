import { GetActivityRecord, ActivityCfg } from './../types/appserverComponents'
import { mapFace } from './../apis/types/index'
import { defineStore } from 'pinia'
import Helper from '~~/apis/tool/Helper'

import { speedConfig } from '~~/apis/tool/speed'
import fileSaver from 'file-saver'
import { uuid } from 'vue3-uuid'
import html2canvas from 'html2canvas'
import HallLog from '~~/apis/debug/HallLog'
import { openLoginOrRegister } from '~~/composables/usePage'
import Global from '~~/core/Global'

// "plat-light": "roulette/plat-light.png",
export const useRouletteStore = defineStore({
	id: 'roulette-store',
	state: () => {
		return {
			keyMaps: <mapFace>{
				[RouletteKeyEnum.lucky]: { title: 'RO0011', fixed: 'silver' },
				[RouletteKeyEnum.super]: { title: 'RO0012', fixed: 'gold' },
				[RouletteKeyEnum.mega]: { title: 'RO0013', fixed: 'diamond' },
			},
			daySecond: 24 * 60 * 60,
			showModal: false,
			rouletteIndexActive: 0,
			showRewardModal: false,
			bounsList: <GetActivityRecord[]>[],
			bounsLoading: 0,
			currentTime: getTimestamp(),
			timer: <any>null,
			rouletteCopy: <any>(<unknown>null),
			awardInterval: <any>null,
			msgMap: <mapFace>{},
			animationStatus: 0,
			startCanClick: true,
			transitionOffset: 0,
			transitionIndexOffset: 0,
			angle: 0,
			disangle: 12,
			targetAngle: 0,
			windowAnimation: 0,
			endAnimationInterval: <any>null,
			playCount: 0,
			animationStart: 0,
			isSlowDown: false,
			endStep: 0,
			offsetDuration: 0,
			resultValue: { reward_type: 0, fixed: '', name: '' },
			itemAngle: 30,
			newCount: 0,
			isInPage: false,
			timerKey: 'roulette_time',
			animationRef: <any>null,
			animationRef2: <any>null,
			isEnd: false,
			details: {
				bonus: <any[]>[],
				ticket_count: 0,
				total_bonus: 0,
			},
		}
	},
	actions: {
		init() {
			this.rouletteIndexActive = useSysConfigStore().pageConfig.sysConfig.rouletteConfig.statusList.findIndex((el) => !!el)
			this.angle = this.transitionOffset = this.transitionIndexOffset = 0
		},
		changeActiveIndex(index: number) {
			this.rouletteIndexActive = index
		},
		endOneRoulette() {
			this.animationStatus = 0
			// this.angle = this.animationStatus = this.transitionOffset = this.transitionIndexOffset = 0
		},
		closed() {
			this.showModal = false
			this.init()
		},
		clickPlay(id = 'roulette-click') {
			let clickAudio: any = document.getElementById(id)
			if (clickAudio) {
				clickAudio.pause()
				clickAudio.currentTime = 0
				clickAudio.removeAttribute('muted')
				clickAudio.volume = 1
				clickAudio.play()
			}
		},
		playPlay() {
			let clickAudio: any = document.getElementById('roulette-play')
			if (clickAudio) {
				clickAudio.currentTime = 0
				clickAudio.pause()
				clickAudio.removeAttribute('muted')
				// clickAudio.setAttribute('loop', 'loop');
				clickAudio.volume = 1
				clickAudio.play()
			}
		},
		stopPlay() {
			let clickAudio: any = document.getElementById('roulette-play')
			if (clickAudio) {
				clickAudio.currentTime = 0
				clickAudio.pause()
			}
		},
		startLoading() {
			this.angle = this.transitionOffset = this.transitionIndexOffset = 0
			this.disangle = 12
			this.targetAngle = 0
			this.playCount = 0
			this.animationStart = new Date().getTime()
			this.playPlay()
			this.isSlowDown = false
			this.endStep = 0
			this.isEnd = false
			this.windowAnimation = window.requestAnimationFrame(this.requestAnimationFrame)
		},
		requestAnimationFrame() {
			this.isEnd = this.updateTableRotate()
			if (!this.isEnd) {
				this.windowAnimation = window.requestAnimationFrame(this.requestAnimationFrame)
			}
		},
		clear() {
			this.details.ticket_count = 0
		},
		updateTableRotate() {
			this.playCount++
			let isLower = this.transitionIndexOffset && this.animationStatus > 2
			if (isLower) {
				if (!this.targetAngle) {
					let timeOffset = new Date().getTime() - this.animationStart
					let timeStep = timeOffset / this.playCount //每次刷新时间
					let count = 0 //递减次数
					if (this.animationStatus == 5) {
						count = Math.ceil(900 / timeStep)
					} else {
						count = Math.ceil(1350 / timeStep)
					}
					if (count < 30) {
						count = 30
					}
					if (count > 199) {
						count = 199
					}
					this.offsetDuration = speedConfig[count].duration
					this.endStep = speedConfig[count].speed
					this.targetAngle = Math.ceil(this.angle / 360) * 360 + this.transitionIndexOffset
					if (this.targetAngle - this.angle < this.offsetDuration - 2) {
						this.targetAngle += Math.ceil((this.offsetDuration - this.targetAngle + this.angle) / 360) * 360
					}
				}
				if (!this.isSlowDown) {
					if (this.targetAngle - this.angle < this.offsetDuration + 5) {
						this.isSlowDown = true
					}
				}
				if (this.isSlowDown) {
					this.disangle -= this.endStep
				}
				if (this.disangle < 0.9) {
					this.disangle = 0.9
				}
				this.angle += this.disangle
				if (this.targetAngle && this.isSlowDown) {
					let offset1 = Math.min(this.disangle, 1.5)
					if (this.angle >= this.targetAngle - offset1 || this.angle > this.targetAngle) {
						this.animationEnd()
						return true
					}
				}
			} else {
				this.angle += this.disangle
			}

			return false
		},
		animationEnd() {
			this.winPlay()
		},
		winPlay() {
			if (this.animationRef2) {
				this.animationRef2.goToAndPlay(0)
			}
			if (this.resultValue.reward_type) {
				let clickAudio: any = document.getElementById('roulette-win')
				if (this.animationRef) {
					this.animationRef.goToAndPlay(0)
					if (clickAudio) {
						clickAudio.pause()
						clickAudio.removeAttribute('muted')
						clickAudio.volume = 1
						clickAudio.currentTime = 0
						clickAudio.play()
					}
				} else {
					this.animationComplete()
				}
				this.initRouletteDetail()
			} else {
				setTimeout(() => {
					this.details.ticket_count--
					this.animationComplete()
					this.initRouletteDetail()
					this.endOneRoulette()
				}, 2000)
			}
		},
		rouletteButtonHandler() {
			const userStore = useUserStore()

			if (!userStore.isLogin) {
				openLoginOrRegister()
				return
			}
			if (this.animationStatus != 0) {
				return
			}

			const { $t, $fp, $cp } = useNuxtApp()
			if (!userStore.data.activating) {
				let find = useSysConfigStore().vip_list.find((el: any) => el.vip == userStore.vip_level)
				useDialogStore().open({
					title: $t('D0029'),
					text: $t('RO0027', { symbol: useSysConfigStore().currency_symbol, value: $fp($cp(find?.activate_point)) }),
					ok_text: $t('H0005'),
					cancel_text: $t('RO0028'),
					ok: () => {
						openPopup(PopupEnum.deposit)
					},
				})
				return
			}
			if (userStore.vip_level < this.currentRouletteCfg.list[this.rouletteIndexActive].min_vip_limit) {
				useDialogStore().open({
					title: $t('D0029'),
					text: $t('RO0018', { vip: this.currentRouletteCfg.list[this.rouletteIndexActive].min_vip_limit }),
				})
				return
			}
			if (this.details.ticket_count < 1) {
				return
			}

			this.clickPlay()
			this.startCanClick = false
			this.playPlay()
			this.stopPlay()
			this.animationStatus = 1
			setTimeout(() => {
				this.startLoading()
				this.startCanClick = true
				this.ReceiveActivityAward()
				// this.currentTableData.count = this.currentTableData.count - 1;
			}, 300)
		},
		openEndAnimation(startTime: number) {
			let timeout = 4000 - Date.now() + startTime
			this.endAnimationInterval = setTimeout(() => {
				if (this.animationStatus == 2) {
					this.animationStatus = 4
				} else if (this.animationStatus == 1) {
					this.animationStatus = 3
				}
				this.closeEndAnimation()
			}, timeout)
		},
		closeEndAnimation() {
			if (this.endAnimationInterval) {
				clearInterval(this.endAnimationInterval)
				this.endAnimationInterval = null
			}
		},

		ReceiveActivityAward() {
			let startTime = Date.now()
			let currentItem: any = this.currentRouletteCfg.list[this.rouletteIndexActive]
			let body = { atype: 5, data: currentItem.key }
			//记录返回数据

			useDoActivity(
				{ body },
				(data: any) => {
					//记录返回数据

					let res = data.data || 0
					this.rouletteCopy = currentItem
					if (this.animationStatus > 0) {
						//获奖金额所在数据下标
						let index = currentItem.items.findIndex((el: any) => el.id == res)
						//获奖金额值
						this.resultValue = {
							fixed: currentItem.fixed,
							name: currentItem.items[index]?.name,
							reward_type: currentItem.items[index]?.reward_type,
						}
						//计算指针所在角度
						this.transitionIndexOffset = this.itemAngle * (14.5 - index)
						if (this.animationStatus == 1) {
							this.animationStatus = 2
						} else if (this.animationStatus == 3) {
							this.animationStatus = 4
						}
						this.closeEndAnimation()
						this.openEndAnimation(startTime)
					}
					googleEvent({
						sendType: 1,
						event: 'recieve_reward',
						type: 'activity',
						module: 'roulette_page',
						prop: { wheel_id: this.rouletteIndexActive + 1, award_id: res.num },
					})
				},
				(err: any) => {
					HallLog.error('useReceiveActivityAward error', err)
					if (this.windowAnimation) {
						window.cancelAnimationFrame(this.windowAnimation)
					}
					this.endOneRoulette()
				}
			)
		},
		animationCreate() {
			if (this.animationRef) {
				this.animationRef.goToAndStop(-1, false)
			}
		},
		animationCreate2() {
			if (this.animationRef2) {
				this.animationRef2.goToAndStop(-1, false)
			}
		},
		animationComplete() {
			this.isEnd = false
			if (this.resultValue.reward_type) {
				this.openReward()
			}
			if (this.animationRef) {
				this.animationRef.goToAndStop(-1, false)
			}
			if (this.animationRef2) {
				this.animationRef2.goToAndStop(-1, false)
			}
			this.details.ticket_count--
		},
		openReward() {
			if (this.resultValue.reward_type) {
				const { $vm } = useNuxtApp()
				$vm.show('ModalRouletteReward', { ...this.resultValue })
			}
		},
		openBonusList() {
			const { $vm } = useNuxtApp()
			$vm.show('ModalRouletteMyBonus')
		},
		openRule() {
			const { $vm } = useNuxtApp()
			$vm.show('ModalRouletteRule')
		},
		initRouletteDetail() {
			if (useUserStore().isLogin) {
				useGetActivityDetail(
					{ body: { atype: ActivityTypeEnum.roulette } },
					(res: any) => {
						let data = res.details || {}
						this.details = data
					},
					(err: any) => {
						// HallLog.error('useGetActivityDetail error', err)
					}
				)
			}
		},
		download() {
			let doc = document.querySelector('.modal-roulette-reward .vfm__content') as HTMLElement
			let loading = useHttpLoading()
			if (doc) {
				loading.value = true
				html2canvas(doc, {
					backgroundColor: null,
					scrollX: 0,
					scrollY: 0,
					scale: 1,
					useCORS: true,
				})
					.then(function (canvas) {
						canvas.toBlob(function (blob: any) {
							loading.value = false
							const { saveAs } = fileSaver
							saveAs(blob, `share_${uuid.v1()}.png`)
						})
					})
					.catch((err) => {
						HallLog.error('html2canvas error', err)
						loading.value = false
						useSysConfigStore().addErrorMessage({
							msg: 'system error, please try again a moment',
							id: 'download_roulette_error',
						})
					})
			} else {
				useSysConfigStore().addErrorMessage({ id: 'download_roulette_error', msg: 'system error, please try again a moment' })
			}
		},
		updateCurrentTime() {
			this.currentTime = getTimestamp()
		},
		tableMounted(ref: any) {
			this.animationRef2 = ref
		},
		mounted(ref: any) {
			googleEvent({ sendType: 1, event: 'page_show', type: 'activity', module: 'roulette_page' })
			useUserStore().redPoint.roulette = 0
			this.isInPage = true
			this.isEnd = false
			this.animationRef = ref
			this.initRouletteDetail()
			this.init()
			registerTimer(this.timerKey, this.updateCurrentTime)
		},
		unmounted() {
			removeTimer(this.timerKey)
			this.isInPage = false
			this.startCanClick = true
			this.timer?.pause()
			this.closed()
		},
	},
	getters: {
		leftTime: (state) => {
			if (state.details.ticket_count) {
				return ''
			} else {
				const configStore = useSysConfigStore()
				const date = new Date()
				let end = parseInt(
					`${new Date(date.getFullYear(), date.getMonth(), date.getDate(), state.currentRouletteCfg.reset_hour).valueOf() / 1000}`
				)

				let offset = end + configStore.timeOffset - useSysConfigStore().currentTimestamp

				while (offset < 0) {
					offset += 86400
				}
				return Helper.renderTimeRemainNoDay(offset)
			}
		},
		leftTimeFormat: (state) => {
			const configStore = useSysConfigStore()
			const date = new Date()
			let end = parseInt(
				`${new Date(date.getFullYear(), date.getMonth(), date.getDate(), state.currentRouletteCfg.reset_hour).valueOf() / 1000}`
			)

			let offset = end + configStore.timeOffset - useSysConfigStore().currentTimestamp
			while (offset < 0) {
				offset += 86400
			}
			return Helper.renderTimeRemainNoDayFormmat(offset)
		},
		transform: (state) => (index: number) => {
			let transform = state.isActive(index) && state.angle ? `translateZ(0) rotate(${state.angle}deg)` : 'translateZ(0) rotate(60deg)'
			return { transform: transform }
		},
		isActive: (state) => (index: number) => {
			return state.rouletteIndexActive == index
		},
		currentRouletteCfg: (state) => {
			const configStore = useSysConfigStore()
			let init = { list: <any>[], rules: configStore.rouletteCfg.rules }
			Object.assign(init, JSON.parse(JSON.stringify(configStore.rouletteCfg.data || {})))
			init.list.forEach((el: any) => {
				let max_point = 0
				el.items.forEach((item: any) => {
					if (item.reward && item.reward.point > max_point) {
						max_point = item.reward.point
					}
				})
				el.max_point = max_point
				if (state.keyMaps[el.key]) {
					el.title = state.keyMaps[el.key].title
					el.fixed = state.keyMaps[el.key].fixed
					el.count = 1
				}
			})
			let date = new Date()
			init.end_time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0).getTime()
			return init
		},
		currentRouletteCfgRule: (state) => {
			return Global.AESUtil.getDecString(useNuxtApp().$pt(state.currentRouletteCfg.rules || {}) || '')
		},
	},
})
