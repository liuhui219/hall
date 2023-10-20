import { defineStore } from 'pinia'
import { TRUE } from 'sass'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
import { GetShareInviteSummaryRsp } from '~~/types/appserverComponents'
export const useReferAndEarnStore = defineStore({
	id: 'referAndEarn-store',
	state: () => {
		return {
			shareUrl: '',
			referCode: <any>null,
			friendsId: '',
			friendsId2: '',
			type: 1,
			type2: 1,
			shareData: <GetShareInviteSummaryRsp>{},
			share_pay_config: <any>[],
			reward_point: 0,
			inviteRecordList: <any>['AF0013', 'AF0010', 'AF0011', 'AF0012'],
			inviteRecordData: <any>[],
			inviteRecordData2: <any>[],
			total: 0,
			rulesData: <any>[],
			wagersCommissionRewards: [],
			firstDepositRewardsData: <any>[],
			ruleTitle: '',
			ruleType: 1,
			ruleList: [
				//LAT 202306014 这一段需求删除
				// { title: 'AF0041', list: ['AF0042', 'AF0043', 'AF0044', 'AF0045'], desc: { title: 'AF0046', list: ['AF0047', 'AF0048', 'AF0049'] } },
				{
					title: 'AF0050',
					list: ['AF0051', 'AF0052', 'AF0053', 'AF0054', 'AF0055'],
					desc: { title: 'AF0056', list: ['AF0057', 'AF0058', 'AF0059'] },
				},
				{
					title: 'AF0070',
					list: ['AF0071', 'AF0072'],
				},
			],
			tabIndexActive: 0,
			tabList: [
				{ index: 0, text: 'V0009', tip: '1' },
				{ index: 1, text: 'V0009', tip: '2&3' },
			],
			// 改版
			scoreTabIndex: <number>1,
			friendTabIndex: <number>1,
			showFriendInfo: <boolean>false,
			showFilter: <boolean>false,
			showSort: <boolean>false,
			dlShareList: <any>[],
			// 数据上
			dlData: {
				un_receive_point: 0,
				amount_point: 0,
				today_amount_point: 0,
				team_total: 0,
				level1_count: 0,

				// referral_rewards: 0,
				// commission_rewards: 0,
				// distribution_rewards: 0,
				// level_total_number: 0,
				// level1_friend: 0,
				// level2_friend: 0,
				// level3_friend: 0,
			},
			// 数据下
			dlData2: {
				total_rewards_point: 0,
				referral_rewards_point: 0,
				referral_vip_up_rewards_point: 0,
				commission_rewards_point: 0,
				custom_commission_rewards_point: 0,
				friends_recharge_and_cashback: 0,
				team_total: 0,
				level1_count: 0,
				other_team_count: 0,
			},
			friendParam: {
				page: 1,
				page_size: 10,
				query_type: 1, //查询类型，与顶部tab对应，// 当日 = 1 昨日 = 2 本月 = 3 上月 = 4
				sort: 0, //默认为0，暂不关注
				// time_range: <any>[],
				// time_start: <string>'',
				// time_end: <string>'',
			},
			historyParam: {
				page: 0,
				page_size: 50,
				Date: '',
				query_type: 7, //1,referral 2 vip upgrade 3,commission 4 distribution commission 5 distribution recharge 6 team(accept 1v1)  7返回所有
			},
			historyDate: <string>'',
			rewardParam: {
				query_type: 1, // 当日1 昨日2 月3 上月4
			},
			friendList: <any>[],
			friendChildInfo: {
				username: '',
				registration_time: '',
				recharge_amount: '',
				recharge: -1,
				bet_amount: '',
				bet: -1,
				total_reward: '',
				total: -1,
				vip_level: 0,
			},
			historyList: <any>[],
			historyPcList: <any>[],
			appLoadingStatus: <boolean>false,
			historyFinish: InfiniteTypeEnum.init,
			friendFinish: InfiniteTypeEnum.init,
			filterText: <string>'DL0063',
			historyFilterList: [
				{
					index: 7,
					text: 'DL0063',
				},
				{
					index: 1,
					text: 'DL0014',
				},
				{
					index: 2,
					text: 'DL0029',
				},
				{
					index: 3,
					text: 'DL0021',
				},
				{
					index: 4,
					text: 'DL0030',
				},
				{
					index: 5,
					text: 'DL0031',
				},
				{
					index: 6,
					text: 'DL0032',
				},
			],
			activetyRules: {
				activity37: <any>null,
				activity38: <any>null,
				activity33: <any>null,
				activity36: <any>null,
			},
			pcCardNum: <number>0, //开放了几个card活动
			pcDlHomeEarnHeight: <string>'',
			totalFriendRefer: 0,
			disRechargeList: <any>[],
		}
	},
	actions: {
		// distributionRewards 活动36 按需排列 111 222 333 ...
		getDisRechargeList() {
			this.disRechargeList = []
			const configStore = useSysConfigStore()
			let list = configStore.disRecharge3Cfg.data.reward_items
			let levelList = ['ParentFirstReward', 'ParentSecondReward', 'ParentThirdReward']
			for (let i = 0; i < list.length; i++) {
				list[i].ParentFirstReward.min_recharge_point = list[i].min_recharge_point
				list[i].ParentFirstReward.level = 1
				list[i].ParentSecondReward.min_recharge_point = list[i].min_recharge_point
				list[i].ParentSecondReward.level = 2
				list[i].ParentThirdReward.min_recharge_point = list[i].min_recharge_point
				list[i].ParentThirdReward.level = 3
			}
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < list.length; j++) this.disRechargeList.push(list[j][levelList[i]])
			}
		},
		// friendList 页面 范围时间
		// friendTimeRangeChange() {
		// 	this.friendParam.time_start = this.friendParam.time_range[0]
		// 	this.friendParam.time_end = this.friendParam.time_range[1]
		// 	this.friendParam.page = 0
		// 	this.loadFriendData()
		// },
		// 37 card第一个
		maxReferralRewards() {
			if (this.activetyRules.activity37 == null) return 0
			const configStore = useSysConfigStore()
			let maxRewards = 0
			for (let i = 0; i < configStore.inviteUsersCfg.data.awards.length; i++) {
				if (configStore.inviteUsersCfg.data.awards[i].reward.point > maxRewards) {
					maxRewards = configStore.inviteUsersCfg.data.awards[i].reward.point
				}
			}
			return maxRewards
		},
		maxFlowPro() {
			const configStore = useSysConfigStore()
			let maxFlow = 0
			for (let i = 0; i < configStore.proxyAwardCfg.data.list.length; i++) {
				if (configStore.proxyAwardCfg.data.list[i].reward.flow_pro > maxFlow) {
					maxFlow = configStore.proxyAwardCfg.data.list[i].reward.flow_pro
				}
			}
			maxFlow = resConfig.referAndEarnConfig.multiplyPercent ? maxFlow : maxFlow / 100
			return maxFlow + '%'
		},
		totalVipRewards() {
			if (this.activetyRules.activity38 == null) return 0
			const configStore = useSysConfigStore()
			let totalNum = 0
			for (let i = 0; i < configStore.inviteUsersVipCfg.data.levels.length; i++) {
				totalNum += configStore.inviteUsersVipCfg.data.levels[i].reward.point
			}
			return totalNum
		},
		// PC 各card显示
		pcCard() {
			let userStore = useUserStore()
			this.pcCardNum = 0
			if (userStore.inviteUsersStatus) {
				this.pcCardNum++
			}
			if (userStore.inviteUsersVipStatus) {
				this.pcCardNum++
			}
			if (userStore.proxyAwardStatus) {
				this.pcCardNum++
			}
			if (userStore.disRecharge3Status) {
				this.pcCardNum++
			}
			// 显示四个
			if (this.pcCardNum == 3 || this.pcCardNum == 4) {
				this.pcDlHomeEarnHeight = 'height:140px'
			}
			// 只显示两个
			if (this.pcCardNum == 1 || this.pcCardNum == 2) {
				this.pcDlHomeEarnHeight = 'height:381px'
			}
			// 不显示
			if (this.pcCardNum == 0) {
				this.pcDlHomeEarnHeight = 'height:621px'
			}
		},
		BulkClick() {
			if (this.dlData.un_receive_point == 0) return
			this.appLoadingStatus = true
			useReceiveDlUserReward(
				{ body: {} },
				(res: any) => {
					this.appLoadingStatus = false
					if (res.status == 0) {
						const $t = useNuxtApp().$t
						useSysConfigStore().addErrorMessage({
							id: 'bulk_tips_success',
							msg: $t('REW0012'),
							type: 'success',
						})
						this.getRewardAmount()
					}
				},
				(err: any) => {
					this.appLoadingStatus = false
					// HallLog.error('useGetDlFriendList error', err)
				}
			)
		},
		switchScoreTab(index: number) {
			this.scoreTabIndex = index
			this.rewardParam.query_type = index
			this.getRewardAmount2()
		},
		switchFriendTab(index: number) {
			this.friendTabIndex = index
			this.friendParam.query_type = index
			this.friendParam.page = 0
			this.friendList = []
			this.friendFinish = InfiniteTypeEnum.init
		},
		viewFriendsInfo(uid: any) {
			this.appLoadingStatus = true
			this.friendChildInfo = {
				username: '',
				registration_time: '',
				recharge_amount: '',
				recharge: -1,
				bet_amount: '',
				bet: -1,
				total_reward: '',
				total: -1,
				vip_level: 0,
			}
			let body = { uid: uid }
			useGetDlFriendChild(
				{ body },
				(res: any) => {
					this.appLoadingStatus = false
					this.showFriendInfo = true
					this.friendChildInfo = res

					//DGJOGO包网需求：后端返回-1代表不需要显示
					const app = useNuxtApp()
					if (this.friendChildInfo.recharge >= 0) {
						this.friendChildInfo.recharge_amount = app.$fp(app.$cp(this.friendChildInfo.recharge))
					} else {
						this.friendChildInfo.recharge_amount = ''
					}
					if (this.friendChildInfo.bet >= 0) {
						this.friendChildInfo.bet_amount = app.$fp(app.$cp(this.friendChildInfo.bet))
					} else {
						this.friendChildInfo.bet_amount = ''
					}
					if (this.friendChildInfo.total >= 0) {
						this.friendChildInfo.total_reward = app.$fp(app.$cp(this.friendChildInfo.total))
					} else {
						this.friendChildInfo.total_reward = ''
					}
				},
				(err: any) => {
					this.appLoadingStatus = false
					// HallLog.error('useGetDlFriendChild error', err)
				}
			)
		},
		closeFriendInfo() {
			this.showFriendInfo = false
		},
		replaceShareListImg() {
			this.getShareUrl()
			this.dlShareList = useSysConfigStore().shareList ? useSysConfigStore().shareList : []
			this.dlShareList.forEach((item: any) => {
				if (item.icon == 'facebook') {
					item.icon = 'dl-facebook'
				}
				if (item.icon == 'whats_app') {
					item.icon = 'dl-whatsapp'
				}
				if (item.icon == 'telegram') {
					item.icon = 'dl-telegram'
				}
				if (item.icon == 'twitter') {
					item.icon = 'dl-twitter'
				}
			})
		},
		filterSelect(index: number) {
			this.showFilter = false
			this.historyParam.query_type = index
			this.historyParam.page = 0
			this.historyList = []
			this.historyFinish = InfiniteTypeEnum.init
			this.filterSelectText()
		},
		filterSelectText() {
			this.historyFilterList.find((item: any) => {
				if (item.index == this.historyParam.query_type) {
					this.filterText = item.text
				}
			})
		},
		sortList() {
			this.showSort = false
		},
		signUpEarn() {
			openLoginOrRegister()
			// 如果仅是普通用户 且为PC端
			if (isPC()) {
				let timer = setInterval(() => {
					if (useUserStore().isLogin) {
						clearInterval(timer)
						navigateTo('/')
						setTimeout(() => {
							openPopup(PopupEnum.referEarn)
						}, 500)
					}
				}, 500)
			}
		},
		sliceLang(index: number, str: string) {
			if (index == 0) {
				return str.split('1000')[0]
			} else {
				return str.split('1000')[1]
			}
		},
		// 37 referralRewards数量页面获取
		getTotalFriendRefer() {
			if (useUserStore().isLogin) {
				useGetActivityDetail(
					{ body: { atype: ActivityTypeEnum.inviteUsers } },
					(res: any) => {
						let data = res.details || { effective_team_count: 0 }
						this.totalFriendRefer = data.effective_team_count
					},
					(err: any) => {
						// HallLog.error('useGetActivityDetail error', err)
					}
				)
			}
		},
		// totalFriendRefer位于哪个区间
		friendReferLocation(item: any, index: number) {
			let configStore = useSysConfigStore()
			if (configStore.inviteUsersCfg.data.awards.length == 0) return false
			if (index == 0) {
				if (this.totalFriendRefer > 0 && this.totalFriendRefer <= item.max_count) return true
			} else if (index == configStore.inviteUsersCfg.data.awards.length - 1) {
				if (this.totalFriendRefer >= item.max_count) return true
			} else {
				if (this.totalFriendRefer <= item.max_count && this.totalFriendRefer > configStore.inviteUsersCfg.data.awards[index - 1].max_count)
					return true
			}
			return false
		},
		async loadFriendData() {
			this.appLoadingStatus = true
			this.friendParam.page++
			let body = this.friendParam
			// if (body.time_start) {
			// 	body.time_start = String(Date.parse(new Date(body.time_start)) / 1000)
			// 	body.time_end = String(Date.parse(new Date(body.time_end)) / 1000)
			// }
			useGetDlFriendList(
				{ body: body },
				(res: any) => {
					let list = res.list || []
					if (body.page == 1) {
						this.friendList = list
					} else {
						this.friendList = [...this.friendList, ...list]
					}
					this.friendFinish = res.list.length < 10
					this.appLoadingStatus = false
				},
				(err: any) => {
					// HallLog.error('transaction loadHistoryData error', err)
					this.friendFinish = InfiniteTypeEnum.error
				}
			)
		},
		async loadHistoryData() {
			this.appLoadingStatus = true
			this.historyParam.page++
			let body = { ...this.historyParam }
			if (body.Date) {
				body.Date = String(Date.parse(new Date(body.Date)) / 1000)
			}
			useGetDlHistoryList(
				{ body: body },
				(res: any) => {
					let list = res.list || []
					if (body.page == 1) {
						this.historyList = list
						if (this.historyPcList.length == 0) {
							this.historyPcList = list
						}
					} else {
						this.historyList = [...this.historyList, ...list]
					}
					this.historyFinish = res.list.length < 50
					this.appLoadingStatus = false
				},
				(err: any) => {
					// HallLog.error('transaction loadHistoryData error', err)
					this.historyFinish = InfiniteTypeEnum.error
				}
			)
		},
		// 代理用户面板1数据
		getRewardAmount() {
			// this.appLoadingStatus = true
			useGetDlRewardAmount(
				{ body: {} },
				(res: any) => {
					// this.appLoadingStatus = false
					Object.assign(this.dlData, res)
				},
				(err: any) => {
					// HallLog.error('useGetDlFriendList error', err)
				}
			)
		},
		// 代理用户面板2数据
		getRewardAmount2() {
			// this.appLoadingStatus = true
			let body = this.rewardParam
			useGetDlRewardAmount2(
				{ body },
				(res: any) => {
					// this.appLoadingStatus = false
					Object.assign(this.dlData2, res)
				},
				(err: any) => {
					// HallLog.error('useGetDlFriendList error', err)
				}
			)
		},
		formatDate(date: any, type: String) {
			if (date == '') return

			let time = new Date(date * 1000)
			let year = time.getFullYear()
			let month = (time.getMonth() + 1).toString().padStart(2, '0')
			let day = time.getDate().toString().padStart(2, '0')
			let hour = time.getHours().toString().padStart(2, '0')
			let minute = time.getMinutes().toString().padStart(2, '0')
			let second = time.getSeconds().toString().padStart(2, '0')
			if (type == 'noYear') {
				return month + '-' + day + ' ' + hour + ':' + minute + ':' + second
			}
			if (type == 'noHour') {
				return year + '-' + month + '-' + day
			}
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
		},
		init() {
			useSysConfigStore().inviteUsersVipCfg.data.levels.forEach((item: any, index: number) => {
				if (item.reward.point == 0) {
					useSysConfigStore().inviteUsersVipCfg.data.levels.splice(index, 1)
				}
			})
			this.replaceShareListImg()
			this.pcCard()
			if (useUserStore().isLogin) {
				this.getRewardAmount()
				this.getRewardAmount2()
				this.historyList = []
				this.historyParam.page = 0
				this.loadHistoryData()
			}
		},
		mounted() {
			this.init()

			// 旧版
			HallLog.log('refer mounted')
			useUserStore().redPoint.referAndEarn = 0
			this.firstDepositRewardsData = useSysConfigStore().referAndEarnData.deposit_data
			this.getShareData()
			const userStore = useUserStore()
			this.referCode = userStore.data.uid
		},
		unmounted() {
			HallLog.log('refer unmounted')
			// setPagePaddingTitle('')
		},
		changeTabIndexActive(index: number) {
			if (this.tabIndexActive != index) {
				this.tabIndexActive = index
				this.getRecord()
			}
		},
		//获取分享链接
		getShareUrl() {
			getUserShareurl(
				{},
				(res: any) => {
					this.shareUrl = res.url
				},
				(err: any) => {
					// HallLog.error('getUserShareurl error', err)
				}
			)
		},
		//获取页面数据
		getShareData() {
			getshareinvitesummary(
				{},
				(res: any) => {
					this.shareData = res
				},
				(err: any) => {
					// HallLog.error('getshareinvitesummary error', err)
				}
			)
		},
		//跳转外部分享页面
		clickShare(url: string, text?: String) {
			if (!url) return
			if (!text) {
				const configStore = useSysConfigStore()
				text = useNuxtApp().$pt(configStore.pageConfig.sysConfig.share_text)
			}
			text = encodeURIComponent(text as string)
			let shareUrl = encodeURIComponent(this.shareUrl)
			url = url.replace('{url}', shareUrl).replace('{text}', text as string)
			Helper.toOutLink(url)
			googleEvent({ event: 'social_share', sendType: 1 })
		},
		changeType(val: number) {
			if (this.tabIndexActive == 0) {
				this.type = val
			} else {
				this.type2 = val
			}
			this.getRecord()
		},
		blurGetData() {
			this.getRecord()
		},
		//获取
		getRecord() {
			let params = {
				page: 1,
				page_size: 100,
				user_id: this.tabIndexActive ? Number(this.friendsId2) : Number(this.friendsId), // 用户id
				time_type: this.tabIndexActive ? this.type2 : this.type,
				user_type: this.tabIndexActive + 1,
			}
			getUnderUserDepositAgentRecord(
				{ body: params },
				(res: any) => {
					this.total = res.total
					let list = res.list || []
					list.sort((a: any, b: any) => {
						return Number(a.register_time) > Number(b.register_time) ? -1 : 1
					})
					if (params.user_type == 1) {
						this.inviteRecordData = list
					} else {
						this.inviteRecordData2 = list
					}
				},
				(err: any) => {
					// HallLog.error('getUnderUserDepositAgentRecord error', err)
				}
			)
		},
		//打开rules
		openRules(type: number) {
			this.ruleType = type
			if (type) {
				this.ruleTitle = 'First Deposit Rewards'
				this.rulesData = this.firstDepositRewardsData
			} else {
				this.ruleTitle = 'Wagers Commission Rewards'
				this.rulesData = [
					{ rule: 500000, bonus: 500000 * 0.01 },
					{ rule: 1000000, bonus: 1000000 * 0.01 },
					{ rule: 10000000, bonus: 10000000 * 0.01 },
					{ rule: 100000000, bonus: 100000000 * 0.01 },
					{ rule: 1000000000, bonus: 1000000000 * 0.01 },
				]
			}
			openPopup('rules')
		},
	},
	getters: {
		bannerHtml: (state) => {
			return ''
			//LAT 20230614 需求删除
			// const app = useNuxtApp()
			// let size = 'text-[14px]'
			// if (app.$device.isDesktop) {
			// 	size = 'text-[28px]'
			// }
			// const configStore = useSysConfigStore()
			// const from = configStore.referAndEarnData
			// let point = ''
			// if (from.title_reward) {
			// 	point = `<span class="text-second ${size}">${from.title_reward}</span>`
			// } else {
			// 	point = `<span class="text-second ${size}">${configStore.currency_symbol}${app.$fp(app.$cp(from.title_point))}</span>`
			// }
			// return app.$t('AF0031', {
			// 	symbol: '',
			// 	point: point,
			// 	rate: `<span class="text-second ${size}">${from.title_commi}</span>`,
			// })
		},
		valueObject: (state) => {
			const configStore = useSysConfigStore()
			const { $fp, $cp } = useNuxtApp() as any
			const {
				commi_rate,
				commi_three_rate,
				commi_four_rate,
				reward_rate,
				reward_point,
				reward_three_point,
				reward_four_rate,
				reward_three_rate,
				reward_four_point,
			} = configStore.referAndEarnData
			let value1 = ''
			if (reward_rate) {
				const rp = `<em class='text-number'>${$fp($cp(reward_point))}</em>`
				value1 = `<em>${configStore.currency_symbol + rp}</em>`
			} else {
				value1 = `<em class='text-number'>${reward_rate}</em>`
			}

			let value2 = ''
			if (value2) {
				const rtp = `<em class='text-number'>${$fp($cp(reward_three_point))}</em>`
				value2 = `<em>${configStore.currency_symbol + rtp}</em>`
			} else {
				value2 = `<em class='text-number'>${reward_three_rate}</em>`
			}

			let value3 = ''
			if (value3) {
				const rfp = `<em class='text-number'>${$fp($cp(reward_four_point))}</em>`
				value3 = `<em>${configStore.currency_symbol + rfp}</em>`
			} else {
				value3 = `<em class='text-number'>${reward_four_rate}</em>`
			}

			let value4 = `<em class='text-number'>${commi_rate}</em>`
			let value5 = `<em class='text-number'>${commi_three_rate}</em>`
			let value6 = `<em class='text-number'>${commi_four_rate}</em>`
			return {
				value1,
				value2,
				value3,
				value4,
				value5,
				value6,
			}
		},
	},
})
