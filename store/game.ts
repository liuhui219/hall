import { mapFace } from '~~/apis/types'
import NativeEvent from '~~/apis/tool/NativeEvent'
import HallLog from '~~/apis/debug/HallLog'
import { defineStore } from 'pinia'
import Helper from '~~/apis/tool/Helper'
import { getUserAction } from '~~/composables/useVueCore'
import Global from '~~/core/Global'

export const useGameStore = defineStore({
	id: 'user-game-config',
	state: () => {
		return {
			//游戏页面loading开关
			gameLoading: false,
			//游戏进入异常的提示语
			gameErrorMsg: '',
			//游戏页面重载key
			gameReload: 0,
			gameTimeout: <any>null,
			url: '',
			gameUrl: <URL>{},
			gid: -1,
			gname: '',
			gameData: { game_id: 0, demo: false, name: '', gclass: 0, isOringinal: false, gplat: 0 }, //后端给的游戏数据对象
			/**模式
			 * 0(带底部菜单) or 2-内嵌iframe
			 * 1-新窗口打开
			 * 2-iframe不带底部菜单
			 * 3-本窗口web跳转
			 * 9-原生打开新的webview
			 */
			jumpMode: 0,
			//是否试玩
			demo: false,
			//底栏状态 0-打开 1-收起
			bottomState: 0,
			//当前游戏PC端背景图
			PCGameBg: '',
			//PC端 竖屏游戏id集合，已经无用，自研游戏可以自行处理
			pcLimitGameList: [-99], //5003, 5008, 5018, 5021
			//自研游戏需要的数据 【无用】
			webInfoObj: <mapFace>{},
			//试玩账号数据
			tryGameInfo: <mapFace>{},
			//betby厂商需要的参数对象
			betbyParams: <mapFace | null>null,
			//是否已获取betby参数（可以加载betby页面了）
			bShowBetByGame: false,
			//PC是否全屏
			bPCFullScreen: false,
			//betby体育游戏ID
			sportGameId: 102804001,
			//保利体育游戏ID
			polyGameId: 111804001,
			//体育模块指定类型路径
			sportPath: '',
			//进入游戏的时间戳：用于计算在游戏页面停留时间
			gameMountTime: 0,
			//游戏化排行榜数据对象
			tournamentObj: {
				//游戏化排行榜当前游戏id
				tournamentGameId: 0,
				//游戏化排行榜token
				tournamentToken: '',
			},
		}
	},
	actions: {
		//start page logic
		clearGameTimeOut() {
			if (this.gameTimeout) {
				clearTimeout(this.gameTimeout)
				this.gameTimeout = null
			}
		},

		mounted() {
			HallLog.log('game mounted')
			googleEvent({ sendType: 1, event: 'page_show', type: 'play', module: 'game_process', prop: { game_id: this.gid } })
			this.gameMountTime = new Date().getTime()
			useToGamePage().value = true

			const pagePadding = usePagePadding()
			pagePadding.value.top = false
			pagePadding.value.bottom = false

			const gamedetailStore = useGamedetailStore()
			gamedetailStore.mounted()

			const app = useNuxtApp()
			this.clearGameTimeOut()

			if (app.$device.isMobile) {
				this.gameLoading = true
				this.gameTimeout = setTimeout(() => {
					if (!this.url) {
						this.gameToHome()
					}
				}, 5000)
				requestFullscreen()
			} else {
				this.gameLoading = false
			}

			//心跳上报
			Global.HallServer.heartbeatHelper.setSession({ _para: { _gid: this.gid } })
		},

		unmounted() {
			HallLog.log('game unmounted')
			this.clearTournament()
			this.clearGameTimeOut()
			const gameDetail = useGamedetailStore()
			gameDetail.showOverlay = false
			const pagePadding = usePagePadding()
			pagePadding.value.top = true
			pagePadding.value.bottom = true
			this.leaveFromGame()

			const app = useNuxtApp()
			if (app.$device.isMobile) {
				exitFullscreen()
			}

			Global.HallServer.heartbeatHelper.setSession(null)
		},

		//处理iframe传过来的消息
		handleIframeMsg(event: any) {
			try {
				let data = event.data
				HallLog.log('vue handleIframeMsg data', data)
				if (typeof data == 'string') {
					try {
						data = JSON.parse(data)
					} catch (e) {
						if (data == 'ToCloseWebView') {
							//EASYGAME
							this.gameToHome()
						} else if (data == 'TOPUP') {
							//EASYBET
							openPopup(PopupEnum.deposit)
						}
						return
					}
				}
				HallLog.log('vue handleIframeMsg jsonstring:' + JSON.stringify(data))
				const conf = useSysConfigStore()
				switch (data.cmd) {
					case 'exit':
						if (data.param && data.param.tip) {
							conf.addErrorMessage({ id: 'game_exit_home', type: TipsTypeEnum.error, msg: data.param.tip })
						}
						this.gameToHome()
						break
					case 'getinfo':
						// this.sendMsgToIframe({ cmd: data.cmd, param: this.webInfoObj }, event.source)
						break
					case 'intogame':
						break
					case 'setpoint':
						if (this.demo) {
							//试玩不应该同步余额
							return
						}
						//更新大厅余额
						const userStore = useUserStore()
						userStore.setUserInfo({ point: data.param.point })
						break
					case 'topay':
						//进充值页面
						openPopup(PopupEnum.deposit)
						break
					case 'photograph': //iframe嵌入牌照
						useUrlApgSel().value.sel_url = data.url
						break
					case 'cocoslink': //cocosApp跳转页面
					case 'event_link': //h5游戏跳转
						pageConfigClick(data.click_id, data.click_params)
						break
					case 'event_tips':
						conf.addErrorMessage({ id: 'game_tips', type: TipsTypeEnum.error, msg: data.msg })
						break
					case 'event_msgbox':
						useDialogStore().open({
							title: data.title,
							text: data.msg,
							ok: data.yes,
							cancel_text: data.noText || 'No',
							ok_text: data.yesText || 'Yes',
						})
						break
				}
			} catch (error) {
				HallLog.error('vue handleIframeMsg error:' + JSON.stringify(error))
			}
		},

		//向iframe发送消息
		sendMsgToIframe(jsonObject: object, source: any = null) {
			HallLog.log('vue sendMsgToIframe')
			if (!source) {
				source = (window as any).iframeWin
			}
			source.postMessage(JSON.parse(JSON.stringify(jsonObject)), '*')
		},

		iFrameLoad() {
			HallLog.log('Game iFrameLoad:' + this.url)
			if (this.url != '') {
				this.gameLoading = false
			}
		},

		gameToHome() {
			HallLog.log('gameToHome')
			if (isPageInGame()) {
				HallLog.log('game toHome back')
				pageRouterBack('/game?') //可能有#/gamedetail，所以要加个?
				return true
			} else if (isPageInSport()) {
				HallLog.log('sport toHome back')
				pageRouterBack('/sport')
				return true
			}
			return false
		},
		//end page logic

		//更新当前要进入的游戏信息
		updateGameData(data: any) {
			this.url = data.url || ''
			this.gameData = data
			this.gid = data.game_id
		},

		//跳转进游戏统一接口
		//data:游戏数据对象
		//bIntoGame：是否直接进游戏，如果为否，则可能进入游戏详情页面【选试玩或真玩】
		//bDemo: null-根据是否登录判断是否试玩 true或false-指定是否试玩
		//return: 返回true-跳转成功 false-失败【没有登录要进真玩】
		tryToGame(gameID: any, bIntoGame = false, bDemo: any = null) {
			HallLog.log('tryToGame' + gameID)
			googleEvent({ sendType: 1, event: 'entrance_click', type: 'play', module: 'game_card', prop: { game_id: gameID } })
			this.gameErrorMsg = ''
			const configStore = useSysConfigStore()
			let data = configStore.gameAllMap['' + gameID]
			HallLog.log('tryToGame', data)
			if (!data) {
				HallLog.error('tryToGame' + gameID + ': no game data')
				data = { game_id: gameID, demo: true }
			}
			const user = useUserStore()
			const isLogin = user.isLogin

			if (bDemo && !data.demo) {
				//要试玩，但是游戏不支持试玩
				let bInGame = this.gameToHome()
				if (isMobile()) {
					//手机端 进游戏详情页面
					setTimeout(
						() => {
							openPopup(PopupEnum.gamedetail, { gid: gameID })
						},
						bInGame ? 1000 : 10
					)
				}
				return false
			}
			if (bDemo == null) {
				bDemo = data.demo
				if (!isLogin && !bDemo) {
					this.gameToHomeAndLogin(gameID)
					return false
				}
				if (isLogin) {
					bDemo = false
				}
			}
			if (bIntoGame) {
				//强制进游戏：根据登录状态 判断 试玩和真玩
				if (bDemo || isLogin) {
					this.goToOptionGame(data, bDemo)
					return true
				}
			} else {
				//非强制进游戏
				if (isMobile()) {
					//手机端 进游戏详情页面
					openPopup(PopupEnum.gamedetail, { gid: gameID })
					return true
				} else {
					//PC端 直接进游戏页面，游戏页面有 试玩和真玩的选项
					if (isPageInGame()) {
						//当前就在game页面
						const gamedetailStore = useGamedetailStore()
						gamedetailStore.mounted()
					}

					this.goToOptionGame(data, bDemo, data.demo)
					return true
				}
			}

			//未登录 且 真玩
			this.gameToHomeAndLogin(gameID)
			return false
		},

		//从游戏页返回，然后弹出登录
		gameToHomeAndLogin(gameID: number) {
			let bInGame = this.gameToHome()
			const urlGameID = useUrlGameID()
			urlGameID.value = gameID
			setTimeout(
				() => {
					openPopup(PopupEnum.login, null)
				},
				bInGame ? 1000 : 10
			)
		},

		async goToOptionGame(data: any, isDemo = false, bNotRequestIntoGame = false) {
			const user = useUserStore()
			if (!user.isLogin) {
				isDemo = true
			}
			const { demo, game_id, jump } = data
			if (!user.isLogin && !demo) {
				//未登录且游戏不支持试玩
				this.gameToHomeAndLogin(game_id)
				return
			}
			this.updateGameData(data)

			let reqLoading = 0
			this.jumpMode = 0
			if (useNuxtApp().$device.isMobile) {
				if (isApp()) {
					//部分马甲包使用官方工程，且阉割了gameWebview导致无法打开游戏，这里取消gameWebView的打开方式
					// this.jumpMode = 9
				} else if (jump > 0) {
					this.jumpMode = jump
				}
				reqLoading = 1
			}
			const gameDetail = useGamedetailStore()
			if (bNotRequestIntoGame && game_id != this.sportGameId) {
				HallLog.log('bNotRequestIntoGame:' + bNotRequestIntoGame)
				gameDetail.showOverlay = true
			} else {
				gameDetail.showOverlay = false
				this.demo = isDemo
				HallLog.log('demo:' + this.demo)

				let os_type = getSysOsNumber() //系统类型 0-未知 1-PC 2-安卓app 3-ios APP 4-安卓web 5-ios Web
				let params = {
					gid: game_id,
					demo: this.demo,
					lang: Number(selectLang().value),
					os_type,
					externalURL: <string | null>null,
				}
				//GA进游戏
				googleEvent({ event: 'goToOptionGame', gid: game_id, demo: this.demo })

				let winObj: any = null
				if (this.jumpMode == 1) {
					//新窗口打开
					winObj = window.open('', '_blank')
					if (winObj) {
						const loop = setInterval(() => {
							if (winObj.closed) {
								clearInterval(loop)
								this.leaveFromGame()
							}
						}, 500)
					} else {
						//url直接进游戏会因为浏览器安全策略，无法打开新窗口，就当成本iframe处理
						this.jumpMode = 0
					}
				}

				if (!data.isOringinal) {
					//外接游戏
					let externalURL = Helper.getGameBackUrl(this.jumpMode)
					if (externalURL) {
						params.externalURL = externalURL
					}

					if (game_id == this.sportGameId) {
						//betby sport
						const route = useRoute()
						let routeName = route.name?.toString()
						HallLog.log('gamejs goToBetbySport routeName:' + routeName)
						if (!routeName?.includes('sport')) {
							navigateTo('/sport')
							return
						} else if (window.btRender) {
							let obj = { url: this.sportPath }
							HallLog.log('btRender updateOptions:' + JSON.stringify(obj))
							window.btRender.updateOptions(obj)
							return
						}
					}
				}

				useEnterGame(
					{ loading: reqLoading, body: params },
					(res: any) => {
						if (res) {
							HallLog.log('useEnterGame suc,', res)
							if (res.betby_rsp) {
								//betby体育
								this.betbyParams = res.betby_rsp
								this.bShowBetByGame = true
								return
							} else if (res.url) {
								//成功
								let myToken = useUserStore().userInfo.token
								this.url = res.url.replace('{token}', myToken)
								HallLog.log('game url:' + this.url)
								this.gameUrl = new URL(this.url)
								// HallLog.error('gameUrl token:', this.gameUrl.searchParams.get('token'))
								this.intoGame({ win: winObj })
								return
							}
						}
						//进游戏失败
						if (winObj) {
							winObj.close()
							winObj = null
						} else {
							//返回上一页
							this.gameToHome()
						}
					},
					(err: any) => {
						this.gameErrorMsg = Helper.getErrnoStr(err)
						// HallLog.error('useEnterGame error', err)
					}
				)
			}

			if ((this.jumpMode == 0 || this.jumpMode == 2) && game_id != this.sportGameId) {
				this.PCGameBg =
					this.pcLimitGameList.indexOf(this.gid) >= 0
						? `${resConfig['root-res']}gamebg/${this.gid}.jpg?${useSysConfigStore().pageConfig.techConfig.game_bg_param}`
						: ''
				this.gname = this.gameData.name || ' '
				let gameName = this.gname.replace(/\s+/g, '-')

				this.bPCFullScreen = false
				if (game_id == this.polyGameId) {
					//PC端全屏显示
					this.bPCFullScreen = true
				}
				this.clearGameTimeOut()
				let demo = this.demo ? 1 : 0
				const path = `/game?gid=${game_id}&gname=${gameName}&demo=${demo}`
				navigateTo(path)
				if (isPageInGame()) {
					this.gameReload++
				}
				this.getTournamentToken()
			}
		},

		leaveFromGame() {
			HallLog.log('leaveFromGame')
			//请求更新余额
			const userStore = useUserStore()
			userStore.updateUserWallets()
			//后端统计用户离开游戏
			useQuitGame(
				{},
				(res: any) => {
					HallLog.log('useQuitGame')
				},
				(err: any) => {
					HallLog.error('useQuitGame error', err)
				}
			)

			let now = new Date().getTime()
			let gamePageTime = Math.floor(now - this.gameMountTime) / 1000
			if (gamePageTime < 60) {
				googleEvent({ event: 'clicked_game_not_play', sendType: 1, game_id: this.gid })
			}
		},

		intoGame(myParam: any = null) {
			if (!this.demo) {
				let bDone = getUserAction('first_game_enter')
				if (!bDone) {
					googleEvent({ event: 'first_game_enter', sendType: 1 })
					setUserAction('first_game_enter', '1')
				}
			}
			let self = this
			if (!window.toHome) {
				window.toHome = function () {
					self.leaveFromGame()
					HallLog.log('game window.toHome')
				}
			}

			HallLog.log('jumpMode:' + this.jumpMode)
			switch (this.jumpMode) {
				case 0: //iframe
				case 2: //iframe
					break
				case 1: //本窗口web跳转
				case 3: //新窗口打开
					if (myParam && myParam.win) {
						//新窗口
						const urlConfig = useUrlConfig()
						myParam.win.location = urlConfig.value.origin + '/' + 'gameclose.html?url===' + this.url
					} else {
						window.location.href = this.url
					}
					break
				case 9: //原生webview
					closePopup()

					let ret = NativeEvent.instance.getSubGameState('')
					if (ret && ret.isopen == 1) {
						let param = { gameid: this.gid, isopen: 0 }
						NativeEvent.instance.setSubGameState(JSON.stringify(param))
					}

					let param = {
						gameid: this.gid,
						url: this.url,
						name: this.gname,
						toplayout: 0,
						info: JSON.stringify({ cmd: 'getinfo', param: this.webInfoObj }),
						prepage: 0,
						allcache: 0,
					}

					NativeEvent.instance.openSubGameView(JSON.stringify(param))
					break
			}
		},

		goToSport(sportName: string, path = '/') {
			HallLog.log('goToSport:' + sportName)
			let game_id = 0
			this.sportPath = path
			switch (sportName) {
				case 'betby':
					game_id = this.sportGameId
					break
				case 'poly':
					game_id = this.polyGameId
					break
			}
			if (game_id > 0) {
				HallLog.log('goToSport:' + game_id)
				this.tryToGame(game_id, true)
			}
		},

		leaveFromSport() {
			HallLog.log('leaveFromSport start')
			let result = false
			if (window.btRender) {
				HallLog.log('leaveFromSport: kill bt')
				result = true
				window.btRender.kill()
				window.btRender = null
			}
			this.bShowBetByGame = false
			HallLog.log('leaveFromSport result:' + result)
			return result
		},

		//清理游戏化排行榜数据
		clearTournament() {
			this.tournamentObj.tournamentToken = ''
			this.tournamentObj.tournamentGameId = 0
		},

		//获取游戏化排行榜token
		getTournamentToken() {
			this.clearTournament()
			let tournamentGameList = resConfig['tournament-game-list']
			if (tournamentGameList && (tournamentGameList.indexOf(-1) >= 0 || tournamentGameList.indexOf(this.gid) >= 0)) {
				if (!this.demo) {
					let params = {
						game_id: this.gid,
						game_plat_id: this.gameData.gplat,
						key: 'codemodity',
					}
					useGetBoardToken(
						{ body: params },
						(res: any) => {
							HallLog.log('useGetBoardToken suc', res)
							if (isPageInGame()) {
								this.tournamentObj.tournamentGameId = this.gid
								this.tournamentObj.tournamentToken = res.token
							}
						},
						(err: any) => {
							HallLog.error('useGetBoardToken error', err)
						}
					)
				}
			}
		},
	},
	getters: {},
})
