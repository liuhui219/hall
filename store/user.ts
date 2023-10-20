import { mapFace, userData, userPoint } from './../apis/types/index'
import StorageKey from '~~/apis/tool/StorageKey'
import { defineStore } from 'pinia'
import PlayerData from '~~/apis/tool/playerData'
import { googleUserProperty } from '~~/composables/useGoogleTag'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
import Global from '~~/core/Global'

export const useUserStore = defineStore({
	id: 'user-store',
	state: () => {
		return {
			data: <mapFace>{
				vip_level: 1,
				city: '',
				uid: 0,
				nickname: '',
				headimg: '0',
				token: '',
				vip_coin: 0,
				cpf_account: '',
				lname: '',
				fname: '',
				email_bind: false,
				activating: false,
				phone_bind: false,
				client_json: '',
				user_point: <userPoint>{
					bonus: 0,
					bonusCode: 0,
					code: 0,
					point: 0,
				},
				UserFavoriteThreeGames: <any>[],
				bet_amount_point: <number>0,
				hit_amount_point: <number>0,
			},
			playerData: <PlayerData>{ uid: null },
			isLogin: false,
			//红点
			redPoint: <mapFace>{
				checkIn: 0, //签到入口
				rewards: 0, //奖励入口
				roulette: 0, //转盘入口
				task: 0, //任务入口

				vip: 0, //vip入口
				promotion: 0, //优惠活动
				referAndEarn: 0, //代理
				treasureBoxNum: 0, //宝箱活动入口
			},
			currentIndex: 0,
			getDetailTimestamp: 0,
			bonusCenterData: {
				task_num: 0,
				turntable_num: 0,

				reward_num: 0,
				is_check_in: 0,
				treasure_box_num: 0,
				task_count: {},
				activity_count: {},
				props_count: {},
				total_give: 0,
				w_total_give: 0,
			},
			isAgencyUser: false, // 是否有下级代理
		}
	},
	actions: {
		//设置用户信息 判断登录状态
		setUserInfo(data: any, bAutoLogin = false) {
			if (!data) {
				return
			}
			HallLog.log('setUserInfo:user data', JSON.stringify(data))
			// data.kyc = {status: 3, full_name: 'fullname', cpf_account: '708.180.332-66'}
			if (data.user_point) {
				data.point = data.user_point.point
			}
			useAccountStore().hasTel = data.phone ? true : false
			useAccountStore().hasEmail = data.email ? true : false
			const configStore = useSysConfigStore()
			if (data.UserVip) {
				data.activating = data.UserVip.activating
				data.vip_level = data.UserVip.coin_vip_level
				data.vip_coin = data.UserVip.vip_coin
				data.next_coin = data.UserVip.next_coin
				delete data.UserVip
			}

			const rate = configStore.config.point_ratio || 10000
			if (data.ready_put_code) {
				data.ready_put_code = Math.ceil(data.ready_put_code / rate) * rate
			}
			if (data.all_put_code) {
				data.all_put_code = Math.ceil(data.all_put_code / rate) * rate
			}

			let lastPoint = useNuxtApp().$cp(this.data.point)

			this.data = { ...this.data, ...data }
			let general = this.data.general
			let cfgIndex = general
			//邀请宝箱判断总代获取数据
			if (data.uid && this.inviteChestStatus) {
				let list = configStore.inviteChestCfg.cfg.general_cfg || []
				let find = list.find((el: any) => el.general === cfgIndex)
				if (find) {
					configStore.inviteChestCfg.data = find
				}
			}
			//VIP相关活动登录后判断总代获取数据
			if (data.uid && this.vipUpgradeStatus) {
				if (configStore.vipUpgradeCfg.data.general != cfgIndex) {
					let list = configStore.vipUpgradeCfg.cfg.general_cfg || []
					let find = list.find((el: any) => el.general === cfgIndex)
					if (find) {
						configStore.vipUpgradeCfg.data = find
						configStore.updateVipData(configStore.config.vip_config)
					}
				}
			}
			if (data.uid && this.vipWeeklyStatus) {
				if (configStore.vipWeeklyCfg.data.general != cfgIndex) {
					let list = configStore.vipWeeklyCfg.cfg.general_cfg || []
					let find = list.find((el: any) => el.general === cfgIndex)
					if (find) {
						configStore.vipWeeklyCfg.data = find
					}
				}
			}
			if (data.uid && this.vipDayStatus) {
				if (configStore.vipDayCfg.data.general != cfgIndex) {
					let list = configStore.vipDayCfg.cfg.general_cfg || []
					let find = list.find((el: any) => el.general === cfgIndex)
					if (find) {
						configStore.vipDayCfg.data = find
					}
				}
			}
			if (data.uid && this.vipMonthStatus) {
				if (configStore.vipMonthCfg.data.general != cfgIndex) {
					let list = configStore.vipMonthCfg.cfg.general_cfg || []
					let find = list.find((el: any) => el.general === cfgIndex)
					if (find) {
						configStore.vipMonthCfg.data = find
					}
				}
			}
			if (data.uid && this.vipReturnStatus) {
				if (configStore.vipReturnCfg.data.general != cfgIndex) {
					let list = configStore.vipReturnCfg.cfg.general_cfg || []
					let find = list.find((el: any) => el.general === cfgIndex)
					if (find) {
						configStore.vipReturnCfg.data = find
					}
				}
			}
			if (data.uid && this.vipLossRebateStatus) {
				if (configStore.vipLossRebateCfg.data.general != cfgIndex) {
					let list = configStore.vipLossRebateCfg.cfg.general_cfg || []
					let find = list.find((el: any) => el.general === cfgIndex)
					if (find) {
						configStore.vipLossRebateCfg.data = find
					}
				}
			}
			//转盘处理
			if (data.uid && this.rouletteStatus) {
				if (configStore.rouletteCfg.data.general != cfgIndex) {
					let list = configStore.rouletteCfg.cfg.general_cfg || []
					let find = list.find((el: any) => el.general === cfgIndex)
					if (find) {
						find.list.forEach((el: any) => {
							el.items?.sort((a: any, b: any) => (a.sort > b.sort ? 1 : -1))
						})
						configStore.rouletteCfg.data = find
					}
				}
			}
			//代理活动登录后判断总代获取数据
			if (data.uid && this.agencyStatus) {
				if (configStore.agencyCfg.data.general != cfgIndex) {
					let list = configStore.agencyCfg.cfg.general_cfg || []
					let find = list.find((el: any) => el.general === cfgIndex)
					if (find) {
						configStore.updateAgencyData(find)
					}
				}
			}

			// 代理模块
			if (data.uid && this.proxyAwardStatus) {
				let list = configStore.proxyAwardCfg.cfg.general_cfg || []
				let find = list.find((el: any) => el.general === cfgIndex)
				if (find) {
					configStore.proxyAwardCfg.data = find
				}
			}
			if (data.uid && this.disCommission3Status) {
				let list = configStore.disCommission3Cfg.cfg.general_cfg || []
				let find = list.find((el: any) => el.general === cfgIndex)
				if (find) {
					configStore.disCommission3Cfg.data = find
				}
			}
			if (data.uid && this.disRecharge3Status) {
				let list = configStore.disRecharge3Cfg.cfg.general_cfg || []
				let find = list.find((el: any) => el.general === cfgIndex)
				if (find) {
					configStore.disRecharge3Cfg.data = find
				}
			}
			if (data.uid && this.inviteUsersStatus) {
				let list = configStore.inviteUsersCfg.cfg.general_cfg || []
				let find = list.find((el: any) => el.general === cfgIndex)
				if (find) {
					configStore.inviteUsersCfg.data = find
				}
			}
			if (data.uid && this.inviteUsersVipStatus) {
				let list = configStore.inviteUsersVipCfg.cfg.general_cfg || []
				let find = list.find((el: any) => el.general === cfgIndex)
				if (find) {
					configStore.inviteUsersVipCfg.data = find
				}
			}
			HallLog.log('user data', this.data)
			this.createPlayerData()
			this.playerData.init(this.data)
			this.updateIsLogin(!!this.data.uid)
			const uinfo = vueStorage(StorageKey.UserInfo, {})
			uinfo.value = this.data

			if (this.isLogin) {
				let currPoint = useNuxtApp().$cp(this.data.point)
				let lowPoint = 5
				if (currPoint <= lowPoint && lastPoint > lowPoint) {
					//余额过低
					googleEvent({ event: 'low_balance', sendType: 1 })
				}
			} else {
				//登出需要将Token清掉后再执行，Token保存在本地storage，需要setTimeout
				setTimeout(() => {
					this.afterLogout()
				}, 10)
			}

			/**start 用于底层CON链接 */
			const Uid = vueStorage('Uid', 0)
			Uid.value = this.data.uid
			const Token = vueStorage('Token', '')
			Token.value = this.data.token
			/**end 用于底层CON链接 */
		},
		createPlayerData() {
			if (this.playerData.uid == null) {
				this.playerData = new PlayerData()
			}
		},
		updateIsLogin(val: boolean) {
			if (this.isLogin != val) {
				this.isLogin = val
			}
		},
		updateUserWallets() {
			useGetUserWallets(
				{ body: {} },
				(res: any) => {
					if (!res) {
						return
					}
					this.setUserInfo(res)
				},
				(err: any) => {
					// HallLog.error('useGetUserWallets error', err)
				}
			)
		},
		getUserInfo() {
			return new Promise((resolve, reject) => {
				useGetUserInfo(
					{ body: {} },
					(res: any) => {
						if (!res) {
							return
						}
						this.setUserInfo(res)

						if (!useUrlcApp().value && !googleEventValid()) {
							setTimeout(() => {
								let myChannel = this.data.pack_no || 0
								const urlChannel = useCheckversionChannel()
								const resParam = new Date().toISOString()
								let newParam = 'myChannel=' + myChannel + '&urlChannel=' + urlChannel.value + '&channelError=' + resParam
								const AppUrl = useUrlConfig()
								window.location.href = Helper.urlAddParam(AppUrl.value.origin, newParam)
							}, 100)
							return
						}

						//检查特殊url参数情况
						let clientJson: any = {}
						let serverClientJsonString = this.data.client_json
						if (serverClientJsonString) {
							try {
								clientJson = JSON.parse(serverClientJsonString)
							} catch (error) {
								HallLog.error('serverClientJsonString error:' + serverClientJsonString)
							}
						}

						const urlCodes = vueStorage(StorageKey.UrlCodes, {})
						let keyArr = ['click_id', 'pixel_id', 'maxconv_click_id', 'uniqueId', 'adtrack', 'utrack']
						keyArr.forEach((ele) => {
							if (!urlCodes.value[ele] && clientJson[ele]) {
								urlCodes.value[ele] = clientJson[ele]
							}
						})

						let newClientJsonString = JSON.stringify(urlCodes.value)
						if (newClientJsonString != serverClientJsonString) {
							//请求协议 同步数据给后端
							HallLog.log('serverClientJsonString:' + serverClientJsonString)
							HallLog.log('newClientJsonString:' + newClientJsonString)
							useSaveClientJson(
								{ body: { client_json: newClientJsonString } },
								(res: any) => {
									HallLog.log('useSaveClientJson suc', res)
								},
								(err: any) => {
									// HallLog.error('useSaveClientJson error')
								}
							)
						}

						updateSdkData(urlCodes.value)

						resolve(true)
					},
					(err: any) => {
						// HallLog.error('useGetUserInfo error', err)
						reject(err)
					}
				)
			})
		},
		//请求结果自动登录
		checkLoginCallback(valid: boolean) {
			//已获取到真实登录状态 设置
			HallLog.log('checkLoginCallback:' + valid)
			if (valid) {
				this.afterLogin(true)
			} else {
				//后端登录状态失败 执行退出登录操作
				useDialogStore().logOutCallback()
				this.noLogin()
			}

			if (!useUrlcApp().value) {
				Global.HallServer.run()
			}
		},

		//自动登录
		autoLogin() {
			let bAutoLogin = false
			const checkChannel = useCheckversionChannel()
			const localInfo = vueStorage(StorageKey.UserInfo, {})
			if (useUrlcApp().value) {
				const urlParams = useUrlParams()
				let uid = urlParams.value['cUid']
				let token = urlParams.value['cToken']
				if (uid && token) {
					localInfo.value = { uid, token }
					bAutoLogin = true
				}
			} else if (localInfo.value?.uid && checkChannel.value == localInfo.value.pack_no) {
				//如果当前url渠道地址 与 缓存账号的渠道不一致，则不能自动登录
				bAutoLogin = true
			}

			if (bAutoLogin) {
				this.setUserInfo(localInfo.value, true)
				closePopup('register')
				closePopup('login')
			} else {
				localInfo.value = {}
			}
		},

		//登录后统一执行——包括【自动+手动】登录以后
		afterLogin(bAutoLogin = false) {
			HallLog.log('afterLogin bAutoLogin:' + bAutoLogin)
			Global.HallServer.heartbeatHelper._initHeartBeatData()
			useLoginStore().needForceReg = ''
			const lastLoginTime = vueStorage(StorageKey.LastLoginTime, 0)
			let lastLoginDate = new Date(lastLoginTime.value)
			lastLoginTime.value = new Date().getTime()

			useNoticeAndMessageStore().loadData(0)
			useMygameStore().getRecentlyData()
			useDepositStore().initData()
			if (!bAutoLogin) {
				this.getRedPointData()
			}

			const lastUid = vueStorage(StorageKey.LastUid, 0)
			lastUid.value = this.data.uid

			const lastChannel = vueStorage(StorageKey.LastChannel, 0)
			lastChannel.value = this.data.pack_no

			const LastGeneral = vueStorage(StorageKey.LastGeneral, 0)
			LastGeneral.value = this.data.general

			googleUserProperty({})

			googleEvent({ event: 'user_identify', sendType: 1 })
			googleEvent({ sendType: 1, event: 'entrance_show', type: 'personal', module: 'deposit' })

			let bLoginEvent = true
			let nowTime = new Date().getTime()
			const lastLoginEventTime = vueStorage(StorageKey.LastLoginEventTime, 0)
			if (bAutoLogin) {
				//自动登录
				let jiangeTime = nowTime - lastLoginEventTime.value
				if (jiangeTime < 30 * 60 * 1000) {
					//30分钟间隔
					bLoginEvent = false
				}

				if (!useUrlcApp().value && new Date().getDate() != lastLoginDate.getDate()) {
					//隔天 请求自动登录，刷新token有效期，也会有心跳返回登录事件
					bLoginEvent = false
					useLoginByAuto({ body: { uid: this.data.uid, token: this.data.token, type: 2 } })
				}
			}
			if (bLoginEvent) {
				lastLoginEventTime.value = nowTime
				//GA登录
				if (bAutoLogin) {
					googleEvent({ event: 'login', event_type: 'af_login' })
				}
			}

			setTimeout(() => {
				const urlGameID = useUrlGameID()
				if (urlGameID.value > 0) {
					//进游戏
					useGameStore().tryToGame(urlGameID.value, true, false)
				} else {
					// this.openRoulette()
					this.openNotice()
				}
			}, 10)

			//登录后处理特殊参数
			const urlCodes = vueStorage(StorageKey.UrlCodes, {})
			let key = 'gift'
			if (urlCodes.value[key]) {
				useRewardsStore().giftcodereward(
					urlCodes.value[key],
					(res: any) => {
						delete urlCodes.value[key]
					},
					(err: any) => {
						delete urlCodes.value[key]
					}
				)
			}

			if (!bAutoLogin) {
				const chatStore = useChatStore()
				if (chatStore.chatGameControl) {
					chatStore.connectCurRoom()
				}
			}

			useSysConfigStore().SetDataByGeneralAndChannel(this.data.general, this.data.pack_no)

			// this.getAgencyChild()
			this.getShareData()
		},

		//进入页面后没登录
		noLogin() {
			const urlParams = useUrlParams()
			if (urlParams.value['connection_token']) {
				let oneAllToken = urlParams.value['connection_token']
				let thirdLoginObj = { methods: 'UserOneAllLogin', sub_type: 4, code: JSON.stringify({ provider: '', connection_token: oneAllToken }) }
				useLoginStore().doLoginRequest({ body: {}, thirdLoginObj }, {}, false)
				return
			}
			let bNeedLogin = false
			const urlCodes = vueStorage(StorageKey.UrlCodes, {})
			let key = 'gift'
			if (urlCodes.value[key]) {
				bNeedLogin = true
			}

			if (bNeedLogin) {
				openLoginOrRegister()
			}

			let channel = useCheckversionChannel().value
			let general = Math.floor(channel / 10000)
			useSysConfigStore().SetDataByGeneralAndChannel(general, channel)
			googleUserProperty({ channel, general })
		},

		//退出登录以后
		afterLogout() {
			const chatStore = useChatStore()
			if (chatStore.chatGameControl) {
				chatStore.connectCurRoom()
			}
		},

		openNotice() {
			let notice: any = resConfig['notice-config']
			let now = Date.now()
			const notice_time = vueStorage('notice_time', 0)
			if (notice && notice.status && useAppStore().noticeContent.length) {
				if (!Number(notice.pop_config)) {
					if (notice_time.value) {
						if (now - notice_time.value >= 1000 * 60 * 60 * 24) {
							useAppStore().changeNoticeOpen(true)
						} else if (new Date(notice_time.value).getDate() != new Date().getDate()) {
							useAppStore().changeNoticeOpen(true)
						}
						notice_time.value = now
					} else {
						useAppStore().changeNoticeOpen(true)
						notice_time.value = now
					}
				} else if (notice.pop_config == 1) {
					useAppStore().changeNoticeOpen(true)
					notice_time.value = now
				}
			}
		},
		copyUid() {
			Helper.copyText(this.data.uid)
		},
		copyaCount() {
			Helper.copyText(this.data.account)
		},
		getRedPointData(isReal = false) {
			if (!this.isLogin) return
			let now = Date.now()
			if (now - this.getDetailTimestamp < 100) return
			this.getDetailTimestamp = now
			useGetUserTodoDetails(
				{ body: { web_type: isReal ? 1 : useRoute().path == '/' ? 0 : 1 } },
				(res: any) => {
					HallLog.log('useGetUserTodoDetails: data', JSON.stringify(res))
					this.bonusCenterData = res
					if (this.bonusCenterData?.activity_count) {
						useRouletteStore().details.ticket_count = this.bonusCenterData.activity_count[ActivityTypeEnum.roulette]?.receive || 0
					}
					//9999意味着刚注册成功，默认强制有红点
					if (this.redPoint.checkIn != 9999) {
						this.redPoint.checkIn = res.is_check_in
					}
					if (this.redPoint.rewards != 9999) {
						this.redPoint.rewards = res.reward_num
					}
					if (this.redPoint.roulette != 9999) {
						this.redPoint.roulette = res.turntable_num
					}
					if (this.redPoint.task != 9999) {
						this.redPoint.task = res.task_num
					}
					if (this.redPoint.treasureBoxNum != 9999) {
						this.redPoint.treasureBoxNum = res.treasure_box_num
					}
				},
				(err: any) => {
					// HallLog.error('useGetUserTodoDetails error', err)
				}
			)
		},
		// 代理模块判断 是否为代理用户
		getAgencyChild() {
			useGetDlRewardAmount(
				{ body: {} },
				(res: any) => {
					this.isAgencyUser = res.level1_count > 0
				},
				(err: any) => {
					// HallLog.error('useGetDlRewardAmount error', err)
				}
			)
		},
		getShareData() {
			useReferAndEarnStore().getShareUrl()
			useReferAndEarnStore().referCode = this.data.uid
		},
		getActivityStatus(cfgkey: string) {
			const configStore = useSysConfigStore() as any
			const cfg: any = configStore[cfgkey]
			const list = cfg?.deny_pack || []
			const deny_pack_type = cfg?.deny_pack_type || 0
			let status = this.getStatusByDeny(list, deny_pack_type, !!cfg?.status)
			return status
		},
		getStatusByDeny(deny_pack: Array<any>, deny_pack_type: Number, init = false) {
			let status = init
			if (status && this.isLogin) {
				if (deny_pack_type == 2) {
					status = !deny_pack.includes(this.data.general || 0)
				} else if (deny_pack_type == 3) {
					status = deny_pack.includes(this.data.general || 0)
				} else if (deny_pack_type == 0) {
					status = !deny_pack.includes(this.data.pack_no || 0)
				} else if (deny_pack_type == 1) {
					status = deny_pack.includes(this.data.pack_no || 0)
				}
			}
			return status
		},
	},
	getters: {
		userInfo: (state) => state.data,
		uid: (state): string => state.data.uid + '',
		vip_level: (state): number => (state.data.uid ? state.data.vip_level : 1) || 1,
		vip_coin: (state) => parseFloat(((state.data.vip_coin || 0) / 100).toFixed(2)),
		next_coin: (state) => parseFloat(((state.data.next_coin || 0) / 100).toFixed(2)),
		//是否显示下载Tip
		bDownTip: (state) => {
			if (resConfig['down-tip-close']) {
				return false
			}
			if (!sysConfig.activity.download) {
				return false
			}
			if (useUrlnoCache().value) {
				return false
			}
			const downloadTipVs = vueStorage(StorageKey.DownloadTipKey, 0)
			if (downloadTipVs.value) {
				return false
			}
			if (useRoute().path != '/') {
				if (usePagePadding().value.top) {
					return true
				}
				return false
			}
			if (state.isLogin) {
				return true
			}
			if (!useCheckversionChannel().value && !useUrlIc().value) {
				return true
			}
			return false
		},
		getTaskCount: (state: any) => (type: number) => {
			//1任务 2宝箱
			if (state.bonusCenterData.task_count) {
				let find = state.bonusCenterData.task_count[type] || { receive: 0, received: 0 }
				return find.receive
			} else {
				return 0
			}
		},
		getPropsCount: (state: any) => (type: number) => {
			//0全部 1优惠
			if (state.bonusCenterData.props_count) {
				let find = state.bonusCenterData.props_count[type] || {}
				return find.receive || 0
			} else {
				return 0
			}
		},
		getActivityCount: (state: any) => (atype: number) => {
			if (state.bonusCenterData?.activity_count && state.bonusCenterData?.activity_count[atype]) {
				return state.bonusCenterData?.activity_count[atype] || { receive: 0, received: 0 }
			} else {
				return { receive: 0, received: 0 }
			}
		},
		paytimeTip: (state: any) => {
			const configStore = useSysConfigStore()
			let status = state.getActivityStatus('paytimeCfg')
			return status && configStore.paytimeCfg.active_text ? configStore.paytimeCfg.active_text : ''
		},
		checkinStatus: (state: any) => state.getActivityStatus('checkinCfg'),
		inviteChestStatus: (state: any) => state.getActivityStatus('inviteChestCfg'),
		rouletteStatus: (state: any) => state.getActivityStatus('rouletteCfg'),
		vipUpgradeStatus: (state: any) => state.getActivityStatus('vipUpgradeCfg'),
		vipRebateStatus: (state: any) => state.getActivityStatus('vipRebateCfg'),
		vipWeeklyStatus: (state: any) => state.getActivityStatus('vipWeeklyCfg'),
		vipMonthStatus: (state: any) => state.getActivityStatus('vipMonthCfg'),
		vipDayStatus: (state: any) => state.getActivityStatus('vipDayCfg'),
		vipReturnStatus: (state: any) => state.getActivityStatus('vipReturnStatus'),
		vipLossRebateStatus: (state: any) => state.getActivityStatus('vipLossRebateCfg'),
		agencyStatus: (state: any) => state.getActivityStatus('agencyCfg'),
		bonusRedPoint: (state: any) => {
			return (
				state.getPropsCount(1) ||
				state.getPropsCount(0) ||
				(state.rouletteStatus && state.getActivityCount(ActivityTypeEnum.roulette).receive) ||
				(state.agencyStatus && state.getActivityCount(ActivityTypeEnum.proxyAward).receive) ||
				(state.inviteChestStatus && state.getActivityCount(ActivityTypeEnum.inviteChest).receive) ||
				(state.checkinStatus && state.getActivityCount(ActivityTypeEnum.checkIn).receive)
			)
		},
		activatePoint: (state) => {
			return useSysConfigStore().vip_list.find((el: any) => el.vip == state.vip_level)?.activate_point || 0
		},
		vipCurrentStartCoin: (state: any) => {
			return useSysConfigStore().vip_list.find((el: any) => el.vip == state.vip_level)?.vip_coin || 0
		},
		vipCurrentCoin: (state) => {
			return parseFloat(((state.data.vip_coin - state.vipCurrentStartCoin) / 100).toFixed(2))
		},
		vipProgress: (state) => {
			return state.next_coin
				? Math.min(
						Math.max(
							((state.data.vip_coin - state.vipCurrentStartCoin) /
								(state.data.next_coin + state.data.vip_coin - state.vipCurrentStartCoin)) *
								100,
							0
						),
						100
				  ) + '%'
				: '100%'
		},
		// 代理模块
		proxyAwardStatus: (state: any) => state.getActivityStatus('proxyAwardCfg'),
		disCommission3Status: (state: any) => state.getActivityStatus('disCommission3Cfg'),
		disRecharge3Status: (state: any) => state.getActivityStatus('disRecharge3Cfg'),
		inviteUsersStatus: (state: any) => state.getActivityStatus('inviteUsersCfg'),
		inviteUsersVipStatus: (state: any) => state.getActivityStatus('inviteUsersVipCfg'),
	},
})
