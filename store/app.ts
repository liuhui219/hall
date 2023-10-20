import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'

export const useAppStore = defineStore({
	id: 'app-main-store',
	state: () => {
		return {
			notice: {
				is_open: false,
				tabIndex: 0,
			},
			ref: null as any,

			onlineCount: 0,
		}
	},
	actions: {
		setRef(ref: any) {
			this.ref = ref
		},
		changeNoticeByClick(index: number) {
			this.notice.tabIndex = index
			this.ref?.$el?.swiper?.slideTo(index + 1)
		},
		changeNoticeOpen(value: boolean) {
			this.notice.is_open = value
			if (value) {
				googleEvent({ event: 'notice_view_' + useNuxtApp().$pt(this.noticeContent[this.notice.tabIndex].title), sendType: 1 })
			}
		},
		changeNoticeAuto(event: any) {
			let activeIndex = event.activeIndex
			this.notice.tabIndex = (activeIndex - 1) % this.noticeContent.length

			googleEvent({ event: 'notice_view_' + useNuxtApp().$pt(this.noticeContent[this.notice.tabIndex].title), sendType: 1 })
		},
		clickNotice(clickObj: any) {
			pageConfigClick(clickObj.click_id, clickObj.click_params, 'notice_click_' + useNuxtApp().$pt(clickObj.title))
			if (clickObj.click_id) {
				this.changeNoticeOpen(false)
			}
		},
		updateOnlineCount(uc: number) {
			this.onlineCount = uc * resConfig.marqueeConfig.rate
		},

		initThirdLogin() {
			HallLog.log('initThirdLogin start')
			let thirdDom = document.getElementById('third-login')
			if (thirdDom) {
				window.thirdDom = thirdDom
				window.thirdParent = thirdDom.parentNode

				let bTelegram = false
				let telegramDom = document.getElementById('telegram-login')
				if (telegramDom) {
					let telegramConfig = sysConfig['telegramConfig']
					if (telegramConfig['status']) {
						for (let i = 0; i < telegramConfig.domainList.length; i++) {
							let obj = telegramConfig.domainList[i]
							if (window.location.hostname.indexOf(obj.domain) >= 0) {
								telegramConfig.botName = obj.botName
								break
							}
						}
						if (telegramConfig.botName) {
							HallLog.log('telegramConfig.botName', telegramConfig.botName)

							bTelegram = true
							window.onTelegramAuth = function (user: any) {
								HallLog.error('onTelegramAuth', user)
								user.bot_name = telegramConfig.botName
								let thirdLoginObj = { methods: 'UserTelegramLogin', sub_type: 3, code: JSON.stringify(user) }
								useLoginStore().doLoginRequest({ body: {}, thirdLoginObj }, {}, false)
							}
							let telegramScript = document.createElement('script')
							telegramScript.setAttribute('src', 'https://telegram.org/js/telegram-widget.js?22')
							telegramScript.setAttribute('async', 'true')
							telegramScript.setAttribute('data-telegram-login', telegramConfig['botName'])
							telegramScript.setAttribute('data-size', 'large')
							telegramScript.setAttribute('data-onauth', 'onTelegramAuth(user)')
							telegramScript.setAttribute('data-userpic', 'false')
							// telegramScript.setAttribute('data-request-access', 'write');//机器人是否发消息
							telegramDom.appendChild(telegramScript)
						}
					}
				}

				let oneallDom = document.getElementById('oneall-login')
				if (oneallDom) {
					let oneAllConfig = sysConfig['oneAllConfig']
					if (oneAllConfig['status'] && oneAllConfig.callbackUrl) {
						if (!bTelegram) {
							for (let i = 0; i < oneAllConfig.socialList.length; i++) {
								if (oneAllConfig.socialList[i] == sysConfig.telegramConfig.oneAllSocial) {
									//注意：这里是用facebook代替了 telegram的位置
									oneAllConfig.socialList.splice(i, 1)
									break
								}
							}
						}
						/* Replace #callback_uri# by the url to your own callback script */
						let newParam = 'oneall=1'
						let newUrl = Helper.urlAddParam(useUrlConfig().value.href, newParam, false)
						// let clientUrl = Base64.encode(newUrl)
						let clientUrl = newUrl
						HallLog.log('clientUrl', clientUrl)
						let callback_uri = oneAllConfig['callbackUrl'] + '?url=' + clientUrl
						/* Embeds the buttons into the container oa_social_login_container */
						window._oneall = []
						window._oneall.push(['social_login', 'set_providers', oneAllConfig.socialList])
						window._oneall.push(['social_login', 'set_callback_uri', callback_uri])
						window._oneall.push(['social_login', 'do_render_ui', 'oneall-login'])
						/* Replace #your_subdomain# by the subdomain of a Site in your OneAll account */
						let oneall_subdomain = oneAllConfig['subdomain']
						/* The library is loaded asynchronously */
						useHead({
							script: [
								{
									src: 'https://' + oneall_subdomain + '.api.oneall.com/socialize/library.js',
								},
							],
						})
					}
				}
			}
		},
	},
	getters: {
		noticeList: (state) => {
			let from: any = resConfig['notice-config'] || {}
			return (from.content || []).filter((el: any) => el.allowed)
		},
		hasNotice: (state) => {
			return state.noticeList.length
		},
		noticeContent: (state) => {
			let list = state.noticeList
			const userStore = useUserStore()

			list.forEach((el: any, index: number) => {
				el.index = index

				if (el.url) {
					el.img = useNuxtApp().$pt(el.url) || el.img
				}
				//通过用户渠道或总代 覆盖默认公告数据
				let obj = null
				if (el.channel && el.channel['' + userStore.data.pack_no]) {
					obj = el.channel['' + userStore.data.pack_no]
				} else if (el.general && el.general['' + userStore.data.general]) {
					obj = el.general['' + userStore.data.general]
				}

				if (obj) {
					Helper.assignObj(el, obj)
				}
			})
			return list
		},
	},
})
