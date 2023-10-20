import { sysConfig } from './../composables/sysConfig'
import { errorMessage, mapFace, platConfig } from './../apis/types/index'
import Helper from '~~/apis/tool/Helper'
import HallLog from '~~/apis/debug/HallLog'
import { defineStore } from 'pinia'
import { resConfig } from '~~/composables/resConfig'
import { isArray } from '@vue/shared'
import Global from '~~/core/Global'
import StorageKey from '~~/apis/tool/StorageKey'

export const useSysConfigStore = defineStore({
	id: 'sys-config',
	state: () => {
		return {
			timeOffset: 0,
			currentTimestamp: parseInt(`${Date.now() / 1000}`),
			// 5015
			menuOriginalsGameList: [5009, 5018, 1027, 5008, 5019, 5012, 1026, 5015],
			config: <mapFace>{
				vip_config: {
					turnover_rate: {},
					levels: [],
				},
				offine_activity_config: [], //线下活动
				account_verify_config: {
					email: true,
					phone: true,
				},
				third_minpoint: 0,
				vip_stage_list: <Array<mapFace>>[],
				commi_config_list: <Array<mapFace>>[],
				activity_cfg_list: <Array<mapFace>>[],
				game_plat_map: <mapFace>{}, //游戏厂商map: plat: object
				game_plat_list: <Array<mapFace>>[], // 游戏厂商列表
				server_plat_map: <mapFace>{}, //游戏厂商map: serverPlatId: object //服务端的全部厂商id（一个厂商下 根据游戏类型分多个厂商游戏id）
				time_zone: 0,
				currency: 'BRL',
				lang: [1, 11],
				point_ratio: 10000,
			},
			checkVersionConfig: {
				general_ext_code: '',
				pack_ext_code: '',
				pay_version: 1,
				put_version: 1,
			},
			rouletteCfg: <any>{
				status: false,
				cfg: { general_cfg: <any[]>[] },
				deny_pack: <number[]>[],
				deny_pack_type: 0,
			},
			//vip返水数据
			vipRebateCfg: {
				status: false,
				cfg: { vip_cfg: <any[]>[] },
			},
			//vip升级数据
			vipUpgradeCfg: {
				status: false,
				cfg: { general_cfg: <any[]>[] }, //后台配置列表
				data: { levels: <any[]>[], general: null }, //用户当前总代配置
			},
			//vip周福利
			vipWeeklyCfg: {
				status: false,
				cfg: { general_cfg: <any[]>[] }, //后台配置列表
				data: { vip_cfg: <any[]>[], general: null }, //用户当前总代配置
			},

			//vip月福利
			vipMonthCfg: {
				status: false,
				cfg: { general_cfg: <any[]>[] }, //后台配置列表
				data: { vip_cfg: <any[]>[], general: null }, //用户当前总代配置
			},
			//vip日福利
			vipDayCfg: {
				status: false,
				cfg: { general_cfg: <any[]>[] }, //后台配置列表
				data: { vip_cfg: <any[]>[], general: null }, //用户当前总代配置
			},
			//vip回归福利
			vipReturnCfg: {
				status: false,
				cfg: { general_cfg: <any[]>[] }, //后台配置列表
				data: { vip_cfg: <any[]>[], general: null }, //用户当前总代配置
			},
			//VIP亏损返利
			vipLossRebateCfg: {
				status: false,
				cfg: { general_cfg: <any[]>[] }, //后台配置列表
				data: { vip_cfg: <any[]>[], general: null }, //用户当前总代配置
				rules: {},
			},
			// 代理模块
			proxyAwardCfg: {
				status: false,
				rules: {},
				cfg: { general_cfg: <any[]>[] },
				data: { levels: <any[]>[], list: <any[]>[], general: null, check: null },
			},
			disCommission3Cfg: {
				status: false,
				rules: {},
				cfg: { general_cfg: <any[]>[] },
				data: { reward_items: <any[]>[], general_cfg: <any[]>[], list: <any[]>[], general: null, check: null },
			},
			disRecharge3Cfg: {
				status: false,
				rules: {},
				cfg: { general_cfg: <any[]>[] },
				data: { activity_days: <any[]>[], reward_items: <any[]>[], general: null, check: null },
			},
			inviteUsersCfg: {
				status: false,
				rules: {},
				cfg: { general_cfg: <any[]>[] },
				data: { awards: <any[]>[], general: null, check: null, status: null },
			},
			inviteUsersVipCfg: {
				status: false,
				rules: {},
				cfg: { general_cfg: <any[]>[] },
				data: { levels: <any[]>[], general: null, check: null },
			},
			inviteChestCfg: {
				status: false,
				rules: {},
				cfg: { general_cfg: [], reset_period: 0 },
				data: { reset_period: 0, list: [] }, //用户当前总代配置
				deny_pack: <number[]>[],
				deny_pack_type: 0,
			},
			checkinCfg: <any>{
				cfg: {
					List: {},
				},
				status: false,
				deny_pack: <number[]>[],
				deny_pack_type: 0,
			},
			agencyCfg: {
				cfg: { general_cfg: [] },
				status: false,
				data: { list: [], general: null }, //用户当前总代配置
				deny_pack: <number[]>[],
				deny_pack_type: 0,
			},
			paytimeCfg: <mapFace>{
				status: false,
				active_text: {},
				deny_pack: <number[]>[],
				deny_pack_type: 0,
			},
			afunphoto: 'https://www.afun.com/res/afun.html',
			maxVip: 1,
			jackpot: 0,
			gameGlobalMap: <mapFace>{}, //所有的游戏列表【后端下发的所有游戏，可能包括下架的（厂商）无效游戏】 { game_id: gamedata, game_id: gamedata}
			gameAllMap: <mapFace>{}, //有效游戏列表【允许展示出来的游戏】 { game_id: gamedata, game_id: gamedata}
			gameList: <any>[], //有效游戏集合 [gamedata,gamedata]
			gameBonusList: <any>[], //彩金游戏集合 [gamedata,gamedata]
			game_type_map: <mapFace>{}, //游戏分类顺序map: type: index
			gameGclassMap: <mapFace>{}, //按分类分游戏列表 { gclass: [gamedata,gamedata]}
			gameGclassList: <Array<any>>[], //有origrin顺序列表
			gamePlatMap: <mapFace>{}, //按厂商分游戏列表  { gplat: [gamedata, gamedata]}
			gclassGplatMap: <mapFace>{}, //分类下得厂商列表 {gclass: [gplat,gplat]}
			gplatList: <Array<any>>[], //所有厂商ID列表 [gplat,gplat]
			gplatValidSortList: <Array<any>>[], //排序后的有效厂商列表
			errorMessageList: <errorMessage[]>[],
			//start 前端通过pack_ext_code计算得到的
			sdkConfig: <mapFace>{},
			//end

			pageConfig: {
				index: <mapFace>{},
				sysConfig: <mapFace>{
					//这里的默认值配置在sysConfig.ts文件
				},
				brandConfig: { page_hide: '' },
				appConfig: { css_config: {} },
				textConfig: <mapFace>{
					//大型文案配置：【联系我们】
				},

				//技术配置
				techConfig: {
					sign_key: 'LDlWBqBzC3sKfc1/YtisSw==',
					routes: '[{"host":"hw-game-test.ncjimmy.com","port":443}]',
					chatRoutes: '[{"host":"api.kapok.net","port":443}]',
					log_enable: false,
					img_param: '',
					game_img_param: '',
					plat_icon_param: '20230628',
					game_bg_param: '20230713',
				},
			},
			referAndEarnData: {
				deposit_data: <any>[],
				reward_point: 0, //第一级返利提示比例没有时使用金额
				reward_three_point: 0, //第二级返利提示的比例
				reward_four_point: 0, //第三级返利提示的比例
				reward_rate: '', //第一级返利提示的比例
				reward_three_rate: '', //第二级返利提示的比例
				reward_four_rate: '', //第三级返利提示的比例
				commi_rate: '', //佣金比例一级
				commi_three_rate: '', //佣金比例二级
				commi_four_rate: '', //佣金比例三级
				title_commi: '',
				title_reward: '',
				title_point: 0,
			},
			notice_is_open: true, //公告状态
			wallet_type: 0, // 单/双钱包
		}
	},
	actions: {
		//设置后端配置系统数据
		setData(data: any) {
			if (!data) return
			if (data._errno) return
			//系统配置
			delete data.data //老版的data数据，无用了
			this.timeOffset = (-(new Date().getTimezoneOffset() / 60) - data.time_zone) * 60 * 60 //客户端和服务端秒数差
			if (data.activity_cfg_list) {
				this.rouletteDataProcess(data)
				this.proxyDataProcess(data)
				this.updateCheckin(data)
				this.paytimeDataProcess(data)
				//vip相关活动处理 先处理VIP等级
				this.updateVipData(data)
				this.vipUpgradeDataProcess(data)
				this.vipRebateDataProcess(data)
				this.vipweeklyDatProcess(data)
				this.vipdayDataProcess(data)
				this.vipmonthDataProcess(data)
				this.vipreturnDataProcess(data)
				this.vipLossRebateDataProcess(data)
				//vip处理结束
				this.inviteChestDataProcess(data)
				this.agencyDataProcess(data)
				// 代理模块
				this.agencyModelDataProcess(data)
			}

			if (data.login_sign_key) {
				useAfunFront().value = data.login_sign_key['before_key']
				useAfunBack().value = data.login_sign_key['after_key']
			}
			//正式服删除该数据
			if (useRelease().value) {
				HallLog.logObj('delete activity cfg list:', data.activity_cfg_list)
				delete data.activity_cfg_list
				delete data.login_sign_key
			}
			const { $cp } = useNuxtApp() as any

			//积分除100
			data.vip_config.levels.forEach((el: any) => {
				if (el.vip > this.maxVip) {
					this.maxVip = el.vip
				}

				if (el.reward) {
					if (el.reward.point) {
						el.reward.point = $cp(el.reward.point)
					}
					if (el.reward.props && el.reward.props.length) {
						el.reward.props.forEach((item: any) => {
							try {
								item.item_lang = JSON.parse(item.item_lang)
							} catch (error) {
								item.item_lang = { ...langConf }
							}
						})
					}
				}
			})
			//前端设置厂商map
			let game_plat_map: mapFace = {}
			let server_plat_map: mapFace = {}
			data.game_plat_list = data.game_plat_list || []
			data.game_plat_list = data.game_plat_list.filter((el: any) => {
				if (!el.status) {
					HallLog.error(`gplat ${el.PlatId} status: ${el.status}`)
					return false
				}
				el.serverPlatId = el.PlatId
				el.PlatId = el.PlatId % 1000
				//处理厂商图标
				let platid = el.PlatId
				if (platid != null) {
					let icon = el.logo || ''
					if (platid == 0) {
						icon = resConfig['plat-logo']
					}
					try {
						if (icon) {
							if (!icon.startsWith('http')) {
								icon = `${resConfig['root-res']}platicon/${icon}.png?${this.pageConfig.techConfig.plat_icon_param}`
							}
						}
					} catch (error) {}
					el.logo = icon
				}
				game_plat_map[platid] = el
				server_plat_map[el.serverPlatId] = el
				return true
			})
			data.game_plat_map = game_plat_map
			data.server_plat_map = server_plat_map
			HallLog.logObj('game_plat_map', game_plat_map)
			HallLog.logObj('server_plat_map', server_plat_map)
			if (data.offine_activity_config?.length) {
				data.offine_activity_config.sort((a: any, b: any) => (a.sort < b.sort ? -1 : 1))

				data.offine_activity_config.forEach((el: any) => {
					el.content = el.content || {}
					for (let key in el.content) {
						if (el.content[key].activity_text) {
							try {
								el.content[key].activity_text = Global.AESUtil.getDecString(el.content[key].activity_text)
							} catch (error) {
								HallLog.error('activity_text parse error:', el.content[key].activity_text)
							}
						}
					}
				})
			}
			if (!data.account_verify_config) {
				data.account_verify_config = {
					email: true,
					phone: true,
				}
			}
			this.config = data || {}
			if (!this.config.point_ratio) {
				this.config.point_ratio = 10000
			}

			if (this.config.one_all_callback_uri) {
				sysConfig.oneAllConfig.callbackUrl = this.config.one_all_callback_uri
			}

			this.wallet_type = data.wallet_type || 0
		},
		//设置后端配置游戏模块数据到游戏模块
		setGameTemplateToGameModule(key: any) {
			let data: any
			if (this.config && this.config.game_template) {
				if (key) {
					data = this.config.game_template.find((el: any) => el.key == key)
				}
				if (!data) {
					data = this.config.game_template.find((el: any) => el.is_default)
				}
				if (data) {
					if (data.content?.list) {
						let find = data.content.list.find((el: any) => el.list.some((item: any) => item.provider))
						if (find) {
							if (this.pageConfig.index?.provider) {
								this.pageConfig.index.provider.hide = true
							}
						}
					}
					data.content.other_disabled = data.content.other_disabled || 0
					this.pageConfig.index.game = this.pageConfig.index.game || {}
					Object.assign(this.pageConfig.index.game, data.content)
				}
			}
		},
		//设置全部游戏数据
		setGameList(res: any) {
			res = res || {}
			res.game_list = res.game_list || []
			HallLog.logObj('setGameList start=======>', res)
			if (!res || !res.game_list) {
				HallLog.error('setGameList error: no game_list')
				return
			}
			const configStore = this
			let games = res.game_list
			const gameGlobalMap: any = {} //key:value => game_id: 游戏数据
			const gameAllMap: any = {} //key:value => game_id: 游戏数据
			const gamePlatMap: any = {} //key:value => 厂商ID： 游戏列表
			const gplatList: any = [] //厂商列表
			const gplatValidSortList: Array<any> = []

			const gameGclassMap: any = {} //key:value => 分类ID： 游戏列表
			const gclassAndGplatMap: any = {} //key: value => 分类ID： 厂商ID列表
			let gplatListTemp: any = {} //gplatlist临时数据
			let gclassAndGplatMapTemp: any = {} //gclassAndGplatMap临时数据
			const gameList: any = [] //过滤 分类和厂商 后的游戏列表

			//游戏排序从大到小
			games.sort((a: any, b: any) => {
				let result = (b.power || 0) - (a.power || 0)
				if (result == 0) {
					if (a.name < b.name) {
						result = -1
					} else if (a.name > b.name) {
						result = 1
					}
				}
				return result
			})
			games.forEach((el: any) => {
				el.serverPlatId = el.gplat || 0
				el.gplat = (el.gplat || 0) % 10000
				el.gclass = el.gclass || 0
				el.isOringinal = el.game_id < 100000

				const gclass: number = el.gclass
				const gplat: number = el.gplat
				const serverPlatId: number = el.serverPlatId

				el.src = this.getGameIcon(el)
				delete el.icon
				delete el.special_icon
				el.p = Number(el.p) > 0
				gameGlobalMap[el.game_id] = el
				if (configStore.config.server_plat_map[serverPlatId]) {
					gameAllMap[el.game_id] = el
					//过滤厂商和分类
					if (el.status && !!configStore.game_type_map[gclass]) {
						gameList.push(el)
						if (el.p) {
							this.gameBonusList.push(el)
						}
						if (!gplatListTemp[gplat]) {
							gplatListTemp[gplat] = true
							gplatList.push(gplat)
							gplatValidSortList.push(this.getProviderByPlat(gplat))
						}
						if (gamePlatMap[gplat]) {
							gamePlatMap[gplat].push(el)
						} else {
							gamePlatMap[gplat] = [el]
						}

						if (gameGclassMap[gclass]) {
							gameGclassMap[gclass].push(el)
						} else {
							gameGclassMap[gclass] = [el]
						}
						//分类得厂商列表
						if (gclassAndGplatMap[gclass]) {
							if (!gclassAndGplatMapTemp[gclass][gplat]) {
								gclassAndGplatMap[gclass].push(gplat)
								gclassAndGplatMapTemp[gclass][gplat] = true
							}
						} else {
							gclassAndGplatMap[gclass] = [gplat]
							gclassAndGplatMapTemp[gclass] = { [gplat]: true }
						}
					} else {
						HallLog.error(
							`\ngame ${el.game_id} is not open by:\ngame status is ${el.status}.\ngame gclass ${gclass} is ${
								configStore.game_type_map[gclass] ? '' : 'not'
							} in gclassConfg.`
						)
					}
				} else {
					HallLog.error(`\ngame ${el.game_id} is not open by:\nserverPlatId ${serverPlatId} is not in server_plat_map;`)
				}
			})
			configStore.gameGlobalMap = gameGlobalMap
			configStore.gameList = gameList
			configStore.gameAllMap = gameAllMap
			configStore.gameGclassMap = gameGclassMap
			let list = Object.keys(gameGclassMap)
			list.sort((a, b) => {
				let f = configStore.game_type_map[a]
				let m = configStore.game_type_map[b]
				return f > m ? 1 : -1
			})
			configStore.menuOriginalsGameList = configStore.menuOriginalsGameList.filter((el: any) => configStore.gameAllMap[el])
			let gameGclassList: any = list.map((el) => configStore.pageConfig.sysConfig?.gclass_item_map[el]).filter((el) => el)
			configStore.gameGclassList = gameGclassList
			configStore.gamePlatMap = gamePlatMap
			configStore.gplatList = gplatList
			gplatValidSortList.sort((a: any, b: any) => {
				let result = b.power - a.power
				if (result == 0) {
					if (a.name < b.name) {
						result = -1
					} else if (a.name > b.name) {
						result = 1
					}
				}
				return result
			})
			this.gplatValidSortList = gplatValidSortList

			configStore.gclassGplatMap = gclassAndGplatMap
			gclassAndGplatMapTemp = null
			gplatListTemp = null
			//搜索推荐游戏 过滤+排序
			if (this.pageConfig.index && this.pageConfig.index.search) {
				this.pageConfig.index.search.list = this.pageConfig.index.search.list.filter((el: any) => this.gameAllMap[el.game_id])
				this.pageConfig.index.search.list.sort((a: any, b: any) => {
					return a.sort - b.sort
				})
			}
			//游戏模块处理无效游戏
			if (this.pageConfig.index && this.pageConfig.index.game && this.pageConfig.index.game.list) {
				this.pageConfig.index.game.list = this.pageConfig.index.game.list.filter((el: any) => {
					if (el.list && el.list.length) {
						let count = 0
						el.list.filter((item: any) => {
							item.list = item.list.filter((temp: any) => !!this.gameAllMap[temp?.game_id])
							count += item.list.length
							return item.list.length
						})
						return !!count
					} else {
						return false
					}
				})
			}
			//pickgame模块处理无效游戏
			if (this.pageConfig.index && this.pageConfig.index.pickgame && this.pageConfig.index.pickgame.list) {
				this.pageConfig.index.pickgame.list = this.pageConfig.index.pickgame.list.filter(
					(item: any) => !Number(item.hide) && !!this.gameAllMap[item?.game_id]
				)
			}
			//厂商模块处理无效厂商
			if (
				this.pageConfig.index &&
				this.pageConfig.index.provider &&
				!this.pageConfig.index.provider.hide &&
				this.pageConfig.index.provider.list
			) {
				this.pageConfig.index.provider.list = this.pageConfig.index.provider.list.filter(
					(item: any) => !Number(item.hide) && !!this.config?.game_plat_map[item?.plat_id]
				)
			}
			//处理系统配置游戏列表无用数据 重新设置首页数据
			this.config.game_template = this.config.game_template || []
			if (this.config.game_template && this.config.game_template.length) {
				try {
					this.config.game_template.forEach((el: any) => {
						el.content = JSON.parse(el.content)
						el.content.list = el.content.list.filter((item: any) => {
							let len = 0
							if (item.status) {
								item.list = item.list.filter((temp: any) => {
									if (temp.status) {
										temp.list = temp.list.filter((ids: any) => !!this.gameAllMap[ids.game_id])
										len += temp.list.length
										return !!temp.list.length || temp.provider
									} else {
										return false
									}
								})
								return !!len
							} else {
								return false
							}
						})
					})
				} catch (error) {
					HallLog.error('set system game template error', error)
				}
			}

			HallLog.logObj('setGameList end=======>', res)
		},
		getGameIcon(game: mapFace) {
			let game_id = game.game_id
			let folder = resConfig['game-icon-folder']
			const gameIconDomin = resConfig['game-icon']
			let domain = gameIconDomin[game_id % gameIconDomin.length]
			game.icon = '' //新版暂时不走配置，直接用计算得默认icon
			let icon = game.icon ?? ''
			let src = ''
			if (icon && icon != '') {
				if (!icon.startsWith('http')) {
					if (icon.indexOf(folder) < 0) {
						icon = folder + '/' + icon
					}
					icon = domain + icon
				}
				src = icon
			} else {
				let o_id = game.isOringinal ? '0' : `${game_id}`.substring(1, 4) //外接游戏 取游戏id 第234位 为目录，自研游戏目录为 0
				src = `${domain}${folder}/${o_id}/${game_id}.jpg`
			}
			let reqParam = this.pageConfig?.techConfig?.game_img_param
			src = Helper.urlAddParam(src, reqParam)
			return src
		},
		setCurrentTimestamp() {
			this.currentTimestamp = parseInt(`${Date.now() / 1000}`)
		},
		deleteHide(data: any) {
			let el: any = null
			try {
				let list = Object.keys(data)
				const device = useNuxtApp().$device as any
				//存在sort_pc时根据设备排序
				const sortKey = device.isDesktop ? 'sort_pc' : 'sort'
				list.forEach((key, index) => {
					el = data[key]
					if (typeof el == 'object') {
						if (isArray(el)) {
							data[key] = el = el.filter((item) => !Number(item.hide))
							if (el && el[0] && (Number(el[0].sort) || Number(el[0].sort_pc))) {
								if (Number(el[0].sort_pc)) {
									el.sort((a: any, b: any) => (Number(a[sortKey]) > Number(b[sortKey]) ? 1 : -1))
								} else {
									el.sort((a: any, b: any) => (Number(a.sort) > Number(b.sort) ? 1 : -1))
								}
							}
							el.forEach((item: any) => {
								if (el.hide != null) {
									el.hide = false
									this.deleteHide(item)
								} else {
									this.deleteHide(item)
								}
							})
						} else if (el) {
							if (el.hide != null) {
								el.hide = !!Number(el.hide)
								if (el.hide) {
									delete data[key]
								} else {
									this.deleteHide(el)
								}
							} else {
								this.deleteHide(el)
							}
						}
					}
				})
			} catch (error) {
				HallLog.error('deleteHide error', error)
				HallLog.error('deleteHide error', el)
			}
		},
		setPageConfig(data: any) {
			if (!data) return
			if (data._errno) return
			delete data.ret
			this.deleteHide(data)
			//修改一些特殊hide字段
			if (data?.index?.footer?.config?.icon_hide) {
				data.index.footer.config.icon_hide = !!Number(data.index.footer.config.icon_hide)
			}
			data.sysConfig = Helper.assignObj(sysConfig, data.sysConfig || {})
			data.sysConfig = Helper.assignObj(sysConfig, sysConfig[useAppId().value])
			if (data.sysConfig) {
				if (data.sysConfig['front-key']) {
					useAfunFront().value = data.sysConfig['front-key']
				}
				if (data.sysConfig['back-key']) {
					useAfunBack().value = data.sysConfig['back-key']
				}
				data.sysConfig.reward_types_map = (data.sysConfig?.reward_types || []).reduce((res: any, cur: any) => {
					res[cur.type] = cur
					return res
				}, {})
				if (data.sysConfig.gclass_name_list) {
					data.sysConfig.gclass_name_list = data.sysConfig.gclass_name_list.filter((el: any) => !Number(el.hide))
					data.sysConfig.gclass_name_list.sort((a: any, b: any) => (Number(a.sort) >= Number(b.sort) ? 1 : -1))
					let values: mapFace = {}
					let index = 1
					this.game_type_map = {}
					data.sysConfig.gclass_name_list.forEach((el: any) => {
						values[el.gclass] = el
						this.game_type_map[el.gclass] = index
						index++
					})
					data.sysConfig.gclass_item_map = values
				}
				//设置默认区号
				if (data.sysConfig.default_acode) {
					const acode = useAcode()
					acode.value = data.sysConfig.default_acode
				}
				//设置任务类型
				if (data.sysConfig.task_rate_list) {
					data.sysConfig.task_rate_map = data.sysConfig.task_rate_list.reduce((result: any, current: any) => {
						result[current.id] = true
						return result
					}, {})
				}
				//分享排序
				if (data.sysConfig.share_list) {
					data.sysConfig.share_list = data.sysConfig.share_list.filter((el: any) => !Number(el.hide))
					data.sysConfig.share_list.sort((a: any, b: any) => (Number(a.sort) >= Number(b.sort) ? 1 : -1))
				}
			}

			data.appConfig = Helper.assignObj(appConfig, data.appConfig)
			Helper.assignObj(this.pageConfig, data)
			if (this.pageConfig.appConfig && this.pageConfig.appConfig.css_config) {
				for (let key in this.pageConfig.appConfig.css_config) {
					Helper.setStyleProperty(key, data.appConfig.css_config[key])
				}
			}

			//技术配置
			HallLog.setLogEnable(this.pageConfig.techConfig.log_enable)

			Global.Setting.signKey = this.pageConfig.techConfig.sign_key

			let routesObject = JSON.parse(this.pageConfig.techConfig.routes)
			Global.Setting.Urls.setRoutes({ routes: routesObject })
		},
		//根据总代和渠道 覆盖配置数据
		SetDataByGeneralAndChannel(general: any, channel: any) {
			if (resConfig['general']) {
				Helper.assignObj(resConfig, resConfig['general']['' + general])
			}
			if (resConfig['channel']) {
				Helper.assignObj(resConfig, resConfig['channel']['' + channel])
			}

			if (sysConfig['general']) {
				Helper.assignObj(sysConfig, sysConfig['general']['' + general])
			}
			if (sysConfig['channel']) {
				Helper.assignObj(sysConfig, sysConfig['channel']['' + channel])
			}
			//处理轮播图总代配置数据
			this.pageConfig?.index?.banner?.list?.forEach((el) => {
				if (!el.general || !el.general.length) {
					el.allowed = true
				} else {
					el.allowed = el.general.includes(general)
				}
			})
			//弹出总代配置数据处理
			let from: any = resConfig['notice-config'] || { content: [] }
			from.content.forEach((el) => {
				if (!el.general_list || !el.general_list.length) {
					el.allowed = true
				} else {
					el.allowed = el.general_list.includes(general)
				}
			})
		},

		vipweeklyDatProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.vipWeekly && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				this.vipWeeklyCfg = { ...item, data: item.cfg.general_cfg.find((el: any) => el.general == -1) || { general: null, vip_cfg: [] } }
				HallLog.logObj('vip weekly', this.vipWeeklyCfg)
			}
		},
		vipmonthDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.vipMonth && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				this.vipMonthCfg = { ...item, data: item.cfg.general_cfg.find((el: any) => el.general == -1) || { general: null, vip_cfg: [] } }
				HallLog.logObj('vip month', this.vipMonthCfg)
			}
		},
		vipdayDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.vipDay && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				this.vipDayCfg = { ...item, data: item.cfg.general_cfg.find((el: any) => el.general == -1) || { general: null, vip_cfg: [] } }
				HallLog.logObj('vip day', this.vipDayCfg)
			}
		},
		vipreturnDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.vipReturn && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				this.vipReturnCfg = { ...item, data: item.cfg.general_cfg.find((el: any) => el.general == -1) || { general: null, vip_cfg: [] } }
				HallLog.logObj('vip return', this.vipRebateCfg)
			}
		},
		vipLossRebateDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.vipLossRebate && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				try {
					for (let key in item.rules) {
						item.rules[key] = Global.AESUtil.getDecString(item.rules[key])
					}
				} catch (error) {
					HallLog.error('vip lossrebate rules error', item)
				}
				this.vipLossRebateCfg = { ...item, data: item.cfg.general_cfg.find((el: any) => el.general == -1) || { general: null, vip_cfg: [] } }
				HallLog.logObj('vip loss rebate', this.vipRebateCfg)
			}
		},
		//系统升级配置
		vipUpgradeDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.vipUpgrade && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				this.vipUpgradeCfg = {
					...item,
					data: item.cfg.general_cfg.find((item: any) => item.general == -1) || { levels: [], general: null },
				}
				HallLog.logObj('vip upgrade', this.vipUpgradeCfg)
			}
		},
		vipRebateDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.vipRebate)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				this.vipRebateCfg = { ...item }
				HallLog.logObj('vip rebate', this.vipRebateCfg)
			}
		},
		updateVipData(data: any) {
			//处理VIP数据
			data.vip_config = data.vip_config || {}
			data.vip_config.levels = data.vip_config.levels || []

			if (data.vip_config.turnover_rate) {
				data.vip_config.turnover_rate.coin = parseFloat((data.vip_config.turnover_rate.coin / 100).toFixed(2)) || 1
				if (data.vip_config.turnover_rate.coin < 1) {
					data.vip_config.turnover_rate.turnover = data.vip_config.turnover_rate.turnover / data.vip_config.turnover_rate.coin
					data.vip_config.turnover_rate.coin = 1
				}
			}
		},
		inviteChestDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.inviteChest && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.list = item.cfg.list || []
				try {
					for (let key in item.rules) {
						item.rules[key] = Global.AESUtil.getDecString(item.rules[key])
					}
				} catch (error) {
					HallLog.error('parse checkincfg error', item, JSON.stringify(item))
				}
				this.inviteChestCfg = {
					cfg: item.cfg,
					rules: item.rules,
					status: item.status,
					data: item.cfg.general_cfg.find((el: any) => el.general == -1) || { reset_period: 0, list: [] },
					deny_pack: item.deny_pack || [],
					deny_pack_type: item.deny_pack_type,
				}
				HallLog.logObj('inviteChestCfg =================>', this.inviteChestCfg)
			}
		},
		agencyDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.proxyAward && el.status)
			if (index != -1) {
				let item: any = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				this.agencyCfg = { ...item }
				let find = item.cfg.general_cfg.find((el: any) => el.general == -1) || { list: [] }
				this.updateAgencyData(find)
			}
		},
		agencyModelDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.proxyAward && el.status)
			if (index != -1) {
				let item: any = data.activity_cfg_list[index]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				try {
					for (let key in item.rules) {
						item.rules[key] = Global.AESUtil.getDecString(item.rules[key])
					}
					useReferAndEarnStore().activetyRules.activity33 = item.rules
				} catch (error) {
					HallLog.error('parse checkincfg error', item, JSON.stringify(item))
				}
				this.proxyAwardCfg = { ...item }
				this.proxyAwardCfg.data = item.cfg.general_cfg.find((el: any) => el.general == -1) || { levels: [], check: 0 }
				let find = item.cfg.general_cfg.find((el: any) => el.general == -1) || { list: [] }
				this.updateAgencyData(find)
			}

			let index2 = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.disCommission3 && el.status)
			if (index2 != -1) {
				let item: any = data.activity_cfg_list[index2]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				this.disCommission3Cfg = { ...item }
				this.disCommission3Cfg.data = item.cfg.general_cfg.find((el: any) => el.general == -1) || { reward_items: [], check: 0 }
				let find = item.cfg.general_cfg.find((el: any) => el.general == -1) || { list: [] }
				this.updateAgencyData(find)
			}

			let index3 = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.disRecharge3 && el.status)
			if (index3 != -1) {
				let item: any = data.activity_cfg_list[index3]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				try {
					for (let key in item.rules) {
						item.rules[key] = Global.AESUtil.getDecString(item.rules[key])
					}
					useReferAndEarnStore().activetyRules.activity36 = item.rules
				} catch (error) {
					HallLog.error('parse checkincfg error', item, JSON.stringify(item))
				}
				this.disRecharge3Cfg = { ...item }
				this.disRecharge3Cfg.data = item.cfg.general_cfg.find((el: any) => el.general == -1) || {
					reward_items: [],
					activity_days: [],
					check: 0,
				}
				let find = item.cfg.general_cfg.find((el: any) => el.general == -1) || { list: [] }
				this.updateAgencyData(find)
			}

			let index4 = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.inviteUsers && el.status)
			if (index4 != -1) {
				let item: any = data.activity_cfg_list[index4]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				try {
					for (let key in item.rules) {
						item.rules[key] = Global.AESUtil.getDecString(item.rules[key])
					}
					useReferAndEarnStore().activetyRules.activity37 = item.rules
				} catch (error) {
					HallLog.error('parse checkincfg error', item, JSON.stringify(item))
				}
				this.inviteUsersCfg = { ...item }
				this.inviteUsersCfg.data = item.cfg.general_cfg.find((el: any) => el.general == -1) || { reward_items: [], awards: [], check: 0 }
				let find = item.cfg.general_cfg.find((el: any) => el.general == -1) || { list: [] }
				this.updateAgencyData(find)
			}

			let index5 = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.inviteUsersVip && el.status)
			if (index5 != -1) {
				let item: any = data.activity_cfg_list[index5]
				item.cfg = item.cfg || {}
				item.cfg.general_cfg = item.cfg.general_cfg || []
				try {
					for (let key in item.rules) {
						item.rules[key] = Global.AESUtil.getDecString(item.rules[key])
					}
					useReferAndEarnStore().activetyRules.activity38 = item.rules
				} catch (error) {
					HallLog.error('parse checkincfg error', item, JSON.stringify(item))
				}
				this.inviteUsersVipCfg = { ...item }
				this.inviteUsersVipCfg.data = item.cfg.general_cfg.find((el: any) => el.general == -1) || { reward_items: [], levels: [], check: 0 }
				let find = item.cfg.general_cfg.find((el: any) => el.general == -1) || { list: [] }
				this.updateAgencyData(find)
			}
		},
		updateAgencyData(data: any) {
			this.agencyCfg.data = data
			const list = this.agencyCfg.data.list || []
			let commi_rate = 0
			let commi_three_rate = 0
			let commi_four_rate = 0
			list.map((item: any) => {
				let value = (item.reward?.flow_pro || 0) / 100
				if (item.level == 1) {
					commi_rate = value
				} else if (item.level == 2) {
					commi_three_rate = value
				} else if (item.level == 3) {
					commi_four_rate = value
				}
			})
			this.referAndEarnData.commi_three_rate = parseFloat(commi_three_rate.toFixed(2)) + '%'
			this.referAndEarnData.commi_rate = parseFloat(commi_rate.toFixed(2)) + '%' //LAT 3-17 这里数据与后端不一致，后端是万分比，前端是百分比，所以要 /100
			this.referAndEarnData.commi_four_rate = parseFloat(commi_four_rate.toFixed(2)) + '%' //LAT 3-17 这里数据与后端不一致，后端是万分比，前端是百分比，所以要 /100
			let title_commi = this.referAndEarnData.commi_rate
			if (commi_rate < commi_three_rate) {
				title_commi = this.referAndEarnData.commi_three_rate
			}
			if (commi_rate < commi_four_rate) {
				title_commi = this.referAndEarnData.commi_four_rate
			}
			this.referAndEarnData.title_commi = title_commi
		},
		//处理转盘数据
		rouletteDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.roulette && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				this.rouletteCfg = { ...item, data: item.cfg.general_cfg?.find((item: any) => item.general == -1) || { list: [], general: null } }
				this.rouletteCfg.data.list.forEach((el: any) => {
					el.items?.sort((a: any, b: any) => (a.sort > b.sort ? 1 : -1))
				})
			}
		},
		//处理签到数据
		updateCheckin(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.checkIn && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				try {
					for (let key in item.rules) {
						item.rules[key] = Global.AESUtil.getDecString(item.rules[key])
					}
				} catch (error) {
					HallLog.error('parse checkincfg error', item, JSON.stringify(item))
				}
				this.checkinCfg = item
				HallLog.log('checkin=============================>', item)
			}
		},
		//处理代理数据
		proxyDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.shareCommi && el.status)
			if (index != -1) {
				let firstDepositRewardsData: any = []
				let list = data.activity_cfg_list[index].cfg.list || []
				HallLog.log('proxy commi data:', list)
				if (list.length) {
					let pointArray: any = []
					let rateArray: any = []
					let threePointArray: any = []
					let fourPointArray: any = []
					let threeRateArray: any = []
					let fourRateArray: any = []
					list.map((item: any) => {
						let obj = { rule: item.pay_point, bonus: item.point }
						firstDepositRewardsData.push(obj)
						if (item.reward) {
							if (item.reward.point) {
								pointArray.push(item.reward.point)
							}
							if (item.reward.pay_pro) {
								rateArray.push(item.reward.pay_pro)
							}
						}
						if (item.three_reward) {
							if (item.three_reward.point) {
								threePointArray.push(item.three_reward.point)
							}
							if (item.three_reward.pay_pro) {
								threeRateArray.push(item.three_reward.pay_pro)
							}
						}
						if (item.four_reward) {
							if (item.four_reward.point) {
								fourPointArray.push(item.four_reward.point)
							}
							if (item.four_reward.pay_pro) {
								fourRateArray.push(item.four_reward.pay_pro)
							}
						}
					})
					this.referAndEarnData.deposit_data = firstDepositRewardsData
					let point1 = 0
					if (pointArray.length) {
						point1 = Math.max(...pointArray)
					}
					let point2 = 0
					if (threePointArray.length) {
						point2 = Math.max(...threePointArray)
					}
					let point3 = 0
					if (fourPointArray.length) {
						point3 = Math.max(...fourPointArray)
					}
					this.referAndEarnData.reward_point = point1
					this.referAndEarnData.reward_three_point = point2
					this.referAndEarnData.reward_four_point = point3
					this.referAndEarnData.title_point = Math.max(point1, point2, point3)
					let title_reward = ''
					let rate = 0
					if (rateArray.length) {
						rate = Math.max(...rateArray)
					}
					this.referAndEarnData.reward_rate = rate ? parseFloat((rate / 100).toFixed(2)) + '%' : ''
					if (rate) {
						title_reward = this.referAndEarnData.reward_rate
					}
					let three_rate = 0
					if (threeRateArray.length) {
						three_rate = Math.max(...threeRateArray)
					}
					this.referAndEarnData.reward_three_rate = three_rate ? parseFloat((three_rate / 100).toFixed(2)) + '%' : ''
					if (rate < three_rate) {
						title_reward = this.referAndEarnData.reward_three_rate
					}
					let four_rate = 0
					if (fourRateArray.length) {
						four_rate = Math.max(...fourRateArray)
					}
					this.referAndEarnData.reward_four_rate = four_rate ? parseFloat((four_rate / 100).toFixed(2)) + '%' : ''
					if (rate < four_rate) {
						title_reward = this.referAndEarnData.reward_four_rate
					}
					this.referAndEarnData.title_reward = title_reward
				}
			}
		},
		paytimeDataProcess(data: any) {
			let index = data.activity_cfg_list.findIndex((el: any) => el.atype == ActivityTypeEnum.payTime && el.status)
			if (index != -1) {
				let item = data.activity_cfg_list[index]
				try {
					for (let key in item.rules) {
						item.rules[key] = Global.AESUtil.getDecString(item.rules[key])
					}
				} catch (error) {
					HallLog.error('paytime parse error:', error)
				}
				this.paytimeCfg = {
					status: item.status,
					active_text: item.rules,
					deny_pack: item.deny_pack || [],
					deny_pack_type: item.deny_pack_type,
				}
				HallLog.logObj('paytime cfg:', this.paytimeCfg)
				data.activity_cfg_list.splice(index, 1)
			}
		},

		addErrorMessage(message: errorMessage) {
			let find = this.errorMessageList.find((el: any) => el.id == message.id)
			if (!find) {
				message.type = message.type || TipsTypeEnum.error
				this.errorMessageList.push(message)
			}
		},
		delErrorMessage(msgId: string) {
			this.errorMessageList = this.errorMessageList.filter((msg: any) => msg.id !== msgId)
		},
		clickApg(event: any) {
			if (event.target.id == 'apg-text') {
				Helper.toOutLink(useUrlApgSel().value.sel_url)
			}
		},
		//点击关闭下载tip
		clickDownloadTipClose() {
			const downloadTipVs = vueStorage(StorageKey.DownloadTipKey, 0)
			downloadTipVs.value = 1
		},
		async useUpdateLang(key: string) {
			// const userLang = vueStorage(StorageKey.UserLang, this.pageConfig?.sysConfig?.lang)
			const i18n = langConf[key] || langConf[this.pageConfig?.sysConfig?.lang]
			// userLang.value = i18n.value
			betbyLang().value = i18n.betby
			selectLang().value = i18n.value as string
			getLangText(i18n.i18n)
		},
	},
	getters: {
		//根据游戏数据筛选过滤前端配置数据
		getGameListFilter: (state) => (list: any) =>
			(list || []).filter((el: any) => state.gameAllMap[el.game_id] && state.gameAllMap[el.game_id].status),
		//根据游戏ID获取游戏信息
		getGameByGameId: (state) => {
			return (game_id: number | string) => {
				let gameObj = state.gameGlobalMap[game_id]
				if (!gameObj) {
					gameObj = { game_id, name: `G-${game_id}`, isOringinal: Number(game_id) < 100000 }
					gameObj.src = useSysConfigStore().getGameIcon(gameObj)
				}
				return gameObj
			}
		},
		//根据厂商id获取厂商信息
		getProviderByPlat:
			(state) =>
			(plat: any): platConfig => {
				if (plat == -1) {
					const { $t } = useNuxtApp() as any
					return { name: $t('AF0013'), logo: '' }
				}
				return state.config.game_plat_map[plat] || {}
			},
		//根据游戏ID获取厂商名称
		getProviderNameByGameId:
			(state: any) =>
			(game_id: number): string =>
				state.getProviderByPlat((state.gameAllMap[game_id] || {}).gplat ?? 0).name ?? '',
		//获取游戏分类名称
		getGclassName: (state) => (gclass: any) => {
			if (!gclass && gclass != 0) {
				return {}
			}
			return (state.pageConfig.sysConfig?.gclass_item_map ?? { [gclass]: { name: {} } })[gclass]?.name
		},
		//搜索游戏过滤
		searchGameByText:
			(state: any) =>
			(text: any, list: any = null, num = 3) => {
				if (!text) return []
				if (text.length < num) return []
				const lowSearchText = text.toLowerCase()
				let searchFrom = list || state.gameList
				HallLog.log('search games', searchFrom)
				let result = searchFrom.filter((item: any) => {
					let lang_name = Object.values(item.lang_name || {})
					let name = (item.name || '').toLowerCase()
					let gplat = state.getProviderNameByGameId(item.game_id).toLowerCase()
					return (
						gplat.includes(lowSearchText) ||
						name.includes(lowSearchText) ||
						lang_name.some((temp) => ((temp || '') as string).toLowerCase().includes(lowSearchText))
					)
				})
				return result
			},
		//获取分类下的厂商ID列表 所有传-1
		gclassGplatList: (state) => (gclass: any) => {
			if (gclass == -1 || gclass == null) {
				return state.gplatList
			} else {
				return state.gclassGplatMap[gclass]
			}
		},
		//货币符号
		currency_symbol: (state) => state.pageConfig?.sysConfig?.currency_symbol ?? 'R$',
		//货币简称
		currency_abbr: (state) => state.config?.currency || sysConfig.currency_abbr,
		//密码规则验证
		passwordError: (state) => (value: string) => {
			value = value + ''
			if (!value) return true
			const passwordMin = state.pageConfig.sysConfig.password_min_len || 6
			if (value.length < passwordMin) return true
			const passwordMax = state.pageConfig.sysConfig.password_max_len || 30
			if (value.length > passwordMax) return true
			let passwrodRegExp: any = state.pageConfig.sysConfig.password_regexp
			if (passwrodRegExp) {
				passwrodRegExp = new RegExp(passwrodRegExp)
				return !passwrodRegExp.test(value)
			}
			return false
		},
		//密码错误提示
		passwordTip: (state) => {
			const passwordMin = state.pageConfig.sysConfig.password_min_len || 6
			const passwordMax = state.pageConfig.sysConfig.password_max_len || 30
			return useNuxtApp().$t('U0016', { min: passwordMin, max: passwordMax })
		},
		nameError: (state) => (name: string) => {
			if (!name) return true
			const min = Number(state.pageConfig.sysConfig.name_min_len) || 1
			if (name.trim().length < min) return true
			const max = Number(state.pageConfig.sysConfig.name_max_len) || 15
			if (name.length > max) return true
			if (state.pageConfig.sysConfig.name_regexp) {
				const regExp = new RegExp(state.pageConfig.sysConfig.name_regexp)
				return !regExp.test(name)
			}
			return false
		},
		nameTip: (state) => {
			const min = Number(state.pageConfig.sysConfig.name_min_len) || 1
			const max = Number(state.pageConfig.sysConfig.name_max_len) || 15
			return useNuxtApp().$t('U0030', { min, max })
		},
		accountError: (state) => (account: string) => {
			if (!account) return true

			const min = Number(state.pageConfig.sysConfig.account_min_len) || 6
			if (account.trim().length < min) return true
			if (account.indexOf(' ') != -1) return true
			const max = Number(state.pageConfig.sysConfig.account_max_len) || 16
			if (account.length > max) return true
			if (account.includes('@')) return true
			if (/^[0-9]+$/g.test(account)) return true
			if (!/[0-9]/g.test(account)) return true
			if (state.pageConfig.sysConfig.account_regexp) {
				const regExp = new RegExp(state.pageConfig.sysConfig.account_regexp)
				return !regExp.test(account)
			}
			return false
		},
		accountTip: (state) => {
			const min = Number(state.pageConfig.sysConfig.account_min_len) || 6
			const max = Number(state.pageConfig.sysConfig.account_max_len) || 16
			return useNuxtApp().$t('L1027', { min, max })
		},
		nicknameError: (state) => (name: string) => {
			if (!name) return true
			const nicknameMin = state.pageConfig.sysConfig.nickname_min_len || 1
			if (name.trim().length < nicknameMin) return true
			const nicknameMax = state.pageConfig.sysConfig.nickname_max_len || 15
			if (name.length > nicknameMax) return true
			let nicknameRegExp: any = state.pageConfig.sysConfig.nickname_regexp
			if (nicknameRegExp) {
				nicknameRegExp = new RegExp(nicknameRegExp)
			}
			if (nicknameRegExp) {
				return !nicknameRegExp.test(name)
			} else {
				return false
			}
		},
		realnameError: (state) => (name: string) => {
			if (!name) return true
			const realnameMin = state.pageConfig.sysConfig.realname_min_len || 1
			if (name.trim().length < realnameMin) return true
			const realnameMax = state.pageConfig.sysConfig.realname_max_len || 15
			if (name.length > realnameMax) return true
			let realnameRegExp: any = state.pageConfig.sysConfig.realname_regexp
			if (realnameRegExp) {
				realnameRegExp = new RegExp(realnameRegExp)
			}
			if (realnameRegExp) {
				return !realnameRegExp.test(name)
			} else {
				return false
			}
		},
		emailError: (state) => (email: string) => {
			if (!email) return true
			if (email.indexOf(' ') != -1) return true
			if (state.pageConfig.sysConfig.email_regexp) {
				const regExp = new RegExp(state.pageConfig.sysConfig.email_regexp)
				return !regExp.test(email)
			}
			return false
		},
		emailTip: (state) => useNuxtApp().$t('E0008'),
		phoneError: (state) => (phone: string) => {
			if (!phone) return true
			if (phone.indexOf(' ') != -1) return true
			return !Helper.validPhone(useAccountStore().editAcode, phone)
		},
		phoneTip: (state) => {
			return useNuxtApp().$t('E0009')
		},
		nicknameTip: (state) => {
			const nicknameMin = state.pageConfig.sysConfig.nickname_min_len || 1
			const nicknameMax = state.pageConfig.sysConfig.nickname_max_len || 15
			return useNuxtApp().$t('U0016', { min: nicknameMin, max: nicknameMax })
		},
		realnameTip: (state) => {
			const realnameMin = state.pageConfig.sysConfig.realname_min_len || 1
			const realnameMax = state.pageConfig.sysConfig.realname_max_len || 15
			return useNuxtApp().$t('U0030', { min: realnameMin, max: realnameMax })
		},
		//分享列表
		shareList: (state) => state.pageConfig.sysConfig.share_list,
		//获取验证码时间间隔
		getCodeDuration: (state): mapFace => ({
			0: Number(state.pageConfig.sysConfig.email_duration),
			1: Number(state.pageConfig.sysConfig.phone_duration),
		}),
		//国家信息
		countrys: (state) => resConfig.country || [],
		//国家名称列表
		countryNameList: (state: any) => state.countrys.map((el: any) => el.name) || [],
		//奖励类型
		rewardTypes: (state) => state.pageConfig.sysConfig?.reward_types || [],
		rewardTypesMaps: (state) => state.pageConfig.sysConfig?.reward_types_map || {},
		gameDisabled: (state) => !!state.pageConfig?.index?.game?.other_disabled,
		vip_list: (state) => state.config?.vip_config?.levels || [],
		modelConfig() {
			return resConfig.modelConfig[useAppModel().value] || {}
		},
		renderVHtmlNumber:
			(state) =>
			(value: number | string, classes = '') => {
				return `<em class='text-number ${classes}'>${value}</em>`
			},
		getAvatarSrc: (state) => (avatar: any) => {
			return getResConfigImage(Helper.moldHeadImg(avatar), ImageKeyEnum.userinfo)
		},
	},
})
