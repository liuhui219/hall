import { Timeout } from 'nats/lib/nats-base-client/util'
import { defineStore } from 'pinia'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
import EmojiList from '~~/core/utils/Emoji.json'
import GameControl from '~~/core/GameControl'
import GameServer, { GameCommand } from '~~/core/apis/game/GameServer'
import BaseHandler from '~~/core/apis/game/handlers/BaseHandler'
import ServerRoutes from '~~/core/net/route/ServerRoutes'
import StorageKey from '~~/apis/tool/StorageKey'

export const useChatStore = defineStore({
	id: 'chat-store',
	state: () => {
		return {
			chatHide: <boolean>false,
			serverRoutes: <any>null,
			chatGameControl: <any>null,
			bShowLoading: <boolean>true,
			changeRoomTime: <Timeout>null,
			showSendButton: <boolean>false,
			showHelp: <boolean>false,
			showEmoji: <boolean>false,
			showGif: <boolean>false,
			isFocus: <boolean>true,
			showMb: <boolean>false,
			selfSend: <boolean>false,
			editScroll: <boolean>false,
			newMessage: <number>0,
			currRoomIndex: <number>0,
			roomList: <Array<any>>[],
			gifList: <Array<any>>[],
			sendMsg: <string>'',
			editorText: <string>'',
			scrollBoxHeight: <number>0,
			markPosition: <number>0,
			vip_msg: <number>0,
			vip_gif: <number>0,
			selection: getSelection(),
			lastEditRangeNum: <number>0,
			list: <Array<any>>[],
			EmojiList: EmojiList,
			iosClientRect: <any>null,
			messageId: <any>null,
			messageNum: <number>0,
			scrollBoxTop: <number>0,
			chatIsShow: <boolean>false,
			helpRecord: <boolean>false,
			addScrollTop: <number>0,
			imgLoadList: <Array<any>>[],
			imgLoadNum: <number>0,
			// badLanguageList: <any>{
			// 	en:['fuck1','jerk1','bitch1','Asshole1','Get lost1'],
			// 	pt:['fuck2','jerk2','bitch2','Asshole2','Get lost2'],
			// 	es:['fuck3','jerk3','bitch3','Asshole3','Get lost3'],
			// },
		}
	},
	actions: {
		closeMb() {
			this.chatIsShow = true
			this.showMb = false
			this.showHelp = false
			setTimeout(() => {
				this.chatIsShow = false
			}, 3)
		},
		switchHelp() {
			if (!this.showHelp && this.showMb) {
				this.showMb = true
			} else {
				this.showMb = !this.showMb
			}
			this.showHelp = !this.showHelp
			this.chatIsShow = true
			setTimeout(() => {
				this.chatIsShow = false
			}, 3)
		},
		setMobileNavShow(value?: any) {
			if (value != null) {
				this.chatHide = value
			} else {
				this.chatHide = !this.chatHide
				if (this.chatHide === false) {
					setTimeout(() => {
						this.newMessage = 0
						this.messageNum = 0
						this.messageId = null
						this.scrollDown()
					}, 3)
				} else if (this.chatHide === true) {
					// this.recordInfo()
				}
			}
		},
		closeAll() {
			this.showMb = false
			this.showEmoji = false
			this.showGif = false
			this.showHelp = false
		},
		changeEditTab(index: number) {
			if (index === 1) {
				this.showEmoji = !this.showEmoji
				// chatStore.showMb = true;
			} else if (index === 2) {
				this.showEmoji = false
				const ctrl = document.querySelector('.editorss')
				ctrl.focus()
				this.txtTap()
			}
			this.showGif = false
		},
		switchEditTab(i: number) {
			if (i == 1) {
				this.showEmoji = true
				this.showGif = false
			} else {
				this.showEmoji = false
				this.showGif = true
				this.getGifList()
			}
		},
		// 保存光标位置
		saveEditRange(isEmo: boolean, deleteEmoji: boolean, type?: string) {
			const ctrl = document.querySelector('.editorss')
			if (isEmo) {
				this.lastEditRangeNum = ctrl.selectionStart + 2
			} else if (deleteEmoji) {
				if (type == 'emoji') {
					this.lastEditRangeNum = ctrl.selectionStart - 2
				} else {
					this.lastEditRangeNum = ctrl.selectionStart - 1
				}
			} else {
				this.lastEditRangeNum = ctrl.selectionStart
			}
		},
		// 加载光标
		loadEditRange() {
			const ctrl = document.querySelector('.editorss')
			ctrl.focus()
			setTimeout(() => {
				ctrl.setSelectionRange(this.lastEditRangeNum, this.lastEditRangeNum)
			}, 10)
			// this.txtTap()
		},
		// 选择表情后弹出编辑框 ios额外做软键盘遮挡
		txtTap() {
			if (isIos()) {
				let _this = this
				const ctrl = document.querySelector('.editorss')
				setTimeout(() => {
					ctrl.setSelectionRange(this.lastEditRangeNum, this.lastEditRangeNum)
					// 苹果软键盘遮挡屏幕
					setTimeout(function () {
						// 避免多次点击表情弹出软键盘出现的bug
						// if (_this.iosClientRect) {
						// 	window.scroll(0, _this.iosClientRect)
						// } else {
						_this.iosClientRect = ctrl.getBoundingClientRect().top - 260
						window.scroll(0, _this.iosClientRect)
						// }
					}, 300)
				}, 10)
			}
		},
		txtClick() {
			this.saveEditRange(false, false)
			if (!isPC()) {
				if (this.showEmoji || this.showGif) {
					this.showEmoji = false
					this.showGif = false
					this.txtTap()
				}
			}
		},
		txtInput(e: any) {
			this.saveEditRange(false, false)
		},
		txtFocus() {
			this.showSendButton = true
			// if (this.showEmoji || this.showGif) {
			// 	this.showEmoji = false
			// 	this.showGif = false
			// }
		},
		txtBlur() {
			// 定时器防止 当输入内容为空且聚焦时，点击图标无法触发显示表情tab
			if (!this.editorText && !this.showEmoji) {
				setTimeout(() => {
					this.showSendButton = false
					this.markPosition = this.selection.anchorOffset
				}, 200)
			}
		},
		tabOpen() {
			this.showEmoji = true
			this.showSendButton = true
		},
		tabClose() {
			this.showEmoji = false
			this.showGif = false
			this.setRange()
		},
		selectEmoji(emoji: any) {
			let txt = this.editorText
			let newEmoji = ''
			if (isPC()) {
				newEmoji = emoji.i
			} else {
				newEmoji = emoji
			}
			this.editorText = txt.slice(0, this.lastEditRangeNum) + newEmoji + txt.slice(this.lastEditRangeNum, this.editorText.length)
			// this.showEmoji = false
			this.showMb = false
			this.saveEditRange(true, false)
			if (isPC()) {
				this.loadEditRange()
			} else {
				this.showSendButton = true
			}
			this.txtTap()
			this.textareaHeight()
			// document.activeElement.blur();
		},
		deleteEmoji() {
			let txt = this.editorText

			const EMOJI =
				/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi
			// 如果是emoji表情，删除两个字符
			if (EMOJI.test(txt.slice(this.lastEditRangeNum - 2, this.lastEditRangeNum))) {
				this.editorText = txt.slice(0, this.lastEditRangeNum - 2) + txt.slice(this.lastEditRangeNum, this.editorText.length)
				this.saveEditRange(false, true, 'emoji')
			} else {
				// 从当前光标位置删除一个字符
				this.editorText = txt.slice(0, this.lastEditRangeNum - 1) + txt.slice(this.lastEditRangeNum, this.editorText.length)
				this.saveEditRange(false, true, 'text')
			}

			// this.loadEditRange()
			this.textareaHeight()

			if (this.editorText.length == 0) {
				this.showSendButton = false
			}
		},
		sendMessage(type: Number, msg: string) {
			// 判断用户是否登录
			if (!useUserStore().isLogin) {
				// const $t = useNuxtApp().$t
				// useSysConfigStore().addErrorMessage({
				// 	id: 'chat_login_tips',
				// 	msg: $t('D0029'),
				// 	type: 'error',
				// })
				openLoginOrRegister()
				return
			}

			// 会员等级是否符合
			const $t = useNuxtApp().$t
			if (type == 0 && useUserStore().vip_level < this.vip_msg) {
				useSysConfigStore().addErrorMessage({
					id: 'chat_vip_msg',
					msg: $t('CH009', { value: this.vip_msg }),
					type: TipsTypeEnum.error,
				})
				return
			} else if (type == 1 && useUserStore().vip_level < this.vip_gif) {
				useSysConfigStore().addErrorMessage({
					id: 'chat_vip_msg',
					msg: $t('CH010', { value: this.vip_gif }),
					type: TipsTypeEnum.error,
				})
				return
			}

			// 脏话筛选
			let chatLang = ''
			let isBadLanguage = false
			switch (this.currRoomIndex) {
				case 0:
					chatLang = 'en'
					break
				case 1:
					chatLang = 'pt'
					break
				case 2:
					chatLang = 'es'
					break
				default:
					chatLang = 'en'
					break
			}
			// this.badLanguageList[chatLang].forEach((item: any) => {
			// if (this.editorText.indexOf(item) != -1) {
			// const $t = useNuxtApp().$t
			// useSysConfigStore().addErrorMessage({
			// 	id: 'chat_login_tips',
			// 	msg: $t('D0029'),
			// 	type: 'error',
			// })
			// HallLog.log('脏话')
			// 删除回车符(保留输入框内容;方案2：直接清空输入框)
			// 		this.editorText = this.editorText.replace(/\n/g, '')
			// 		isBadLanguage = true
			// 		return
			// 	}
			// })
			// if (isBadLanguage) {
			// 	return
			// }

			// 发送消息的示例 type 0-文本 1-图片
			let _param = { type: type, msg: msg }
			if (this.chatGameControl) {
				this.selfSend = true
				this.chatGameControl.gameServer.send('send', _param)
			}

			//发送成功后
			this.editorText = ''
			this.showEmoji = false
			this.showGif = false
			this.showSendButton = false
			const textarea = document.querySelector('.editorss')
			textarea.style.height = '20px'
			if (isPC()) {
				document.querySelector('.chat__content')!.style.height = this.scrollBoxHeight + 'px'
			}
		},
		selectGif(url: string) {
			this.showMb = false
			this.sendMessage(1, url)
		},
		sendText() {
			// 是否为回车符
			if (this.editorText == '\n') {
				this.editorText = ''
				return
			}
			// 是否有内容
			if (!this.editorText) {
				return
			}

			// 是否超过200字符
			if (this.editorText.length > 200) {
				useSysConfigStore().addErrorMessage({
					id: 'chat_msg_length',
					msg: useNuxtApp().$t('CH011'),
					type: 'error',
				})
				return
			}
			this.sendMessage(0, this.editorText)
		},
		toNewMessage() {
			this.scrollDown()
			this.newMessage = 0
			this.messageNum = 0
			this.messageId = null
		},
		listFilter() {
			this.list.forEach((item, index) => {
				if (index != 0) {
					// 是否为第二天的消息  同人第二天发的重复消息依然显示发信人
					if (Helper.formatDate(item.itime, 5).split('-')[1] == Helper.formatDate(this.list[index - 1].itime, 5).split('-')[1]) {
						this.list[index].isNextDay = false
						//发信人是否重复
						if (item.uid == this.list[index - 1].uid) {
							this.list[index].isRepeat = true
							// 同一人信息相差时间是否在2分钟以内 2分钟以内不显示时间
							// if(item.itime-this.list[index - 1].itime<120){
							// 	this.list[index].isTime = false
							// }else{
							// 	this.list[index].isTime = true
							// }
						} else {
							this.list[index].isRepeat = false
						}
					} else {
						this.list[index].isNextDay = true
					}
				} else {
					this.list[index].isRepeat = false
					this.list[index].isNextDay = true
					this.list[index].isTime = true
				}

				if (item.type == 1) {
					this.imgLoadList.push('chatImg' + index)
				}
			})
		},
		scrollDown() {
			const scrollBox = document.querySelector('.chat__content')
			scrollBox?.scrollTo({
				top: scrollBox.scrollHeight,
				// behavior: 'smooth',
			})
		},
		// 光标到最后
		setRange() {
			document.getElementById('editorId').focus()
			// // 光标
			let _editorDoc = document.getElementById('editorId')
			let range = document.createRange()
			//返回用户当前的选区
			let sel = document.getSelection()
			range.setStart(_editorDoc, 1)
			range.collapse(true)
			this.selection?.removeAllRanges()
			this.selection?.addRange(range)
			document.getElementById('editorId').scrollIntoView()
		},
		getGifList() {
			if (this.gifList.length) {
				return
			}
			$fetch('https://api.giphy.com/v1/gifs/trending?api_key=lby8PbQ7lB8ZiYue7EULMOGF426pgbAo&limit=30&fixed_height=200', {
				method: 'get',
			})
				.then((res: any) => {
					res.data.forEach((item: any, index: number) => {
						if (item.images.preview_gif.url == null) {
							res.data.splice(index, 1)
						}
					})
					this.gifList = res.data
				})
				.catch((err: any) => {
					HallLog.error('giphyApi error', err)
				})
		},
		// scrollBox滚动到顶部或底部后，禁止滚动
		removeScroll() {
			const dom = document.querySelector('.chat__content')
			let eventType = 'mousewheel'
			if (document.mozFullScreen !== undefined) {
				eventType = 'DOMMouseScroll'
			}
			if (dom) {
				dom.addEventListener(eventType, function (event) {
					if (event) {
						let scrollTop = this.scrollTop,
							scrollHeight = this.scrollHeight,
							height = this.clientHeight

						const delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0)

						if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
							// IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
							this.scrollTop = delta > 0 ? 0 : scrollHeight
							// 向上滚 || 向下滚
							event.preventDefault()
						}
					}
				})
			}
		},
		//输入框自动适配高度
		textareaHeight() {
			const textarea = document.querySelector('.editorss')
			const hideText = document.querySelector('.hide-text')
			const scrollBox = document.querySelector('.chat__content')
			// 使用隐藏div的宽度判断是否为第二行
			hideText!.innerHTML = this.editorText

			// 输入框超过5行，高度固定
			if (textarea.scrollHeight > 100) {
				textarea.style.height = '100px'
				this.editScroll = true
				scrollBox!.style.height = 'calc(100vh - 230px)'
				return
			} else {
				this.editScroll = false
			}
			textarea.style.height = 'auto'
			if (hideText?.clientWidth < textarea?.clientWidth) {
				textarea.style.height = textarea.scrollHeight - 20 + 'px'
				if (isPC()) {
					document.querySelector('.chat__content')!.style.height = this.scrollBoxHeight + 'px'
				}
			} else {
				textarea.style.height = textarea.scrollHeight + 'px'
				document.querySelector('.chat__content')!.style.height = 'calc(100vh - ' + (130 + textarea.scrollHeight) + 'px)'
			}
		},
		// 安卓轮询等待图片加载完成
		imgLoad(img) {
			if (img) {
				img.addEventListener('load', () => {
					this.imgLoadNum++
					if (this.imgLoadNum == this.imgLoadList.length) {
						setTimeout(() => {
							this.scrollDown()
						}, 300)
					}
				})
			} else {
				// 开启定时器
				setTimeout(() => {
					this.imgLoad(img)
				})
			}
		},
		mounted() {
			if (!sysConfig.chatConfig.status) {
				return
			}
			const scrollBox = document.querySelector('.chat__content')
			this.scrollBoxHeight = scrollBox?.clientHeight ? scrollBox.clientHeight : 0
			// pc和h5 输入框自动适配高度
			const textarea = document.querySelector('.editorss')
			const hideText = document.querySelector('.hide-text')
			textarea.addEventListener('input', () => {
				this.textareaHeight()
				// // 使用隐藏div的宽度判断是否为第二行
				// hideText!.innerHTML = this.editorText
				// textarea.style.height = 'auto'
				// if (hideText?.clientWidth < textarea?.clientWidth) {
				// 	textarea.style.height = textarea.scrollHeight - 20 + 'px'
				// 	if (isPC()) {
				// 		document.querySelector('.chat__content')!.style.height = this.scrollBoxHeight + 'px'
				// 	}
				// } else {
				// 	textarea.style.height = textarea.scrollHeight + 'px'
				// 	document.querySelector('.chat__content')!.style.height = 'calc(100vh - ' + (130 + textarea.scrollHeight) + 'px)'
				// }
			})
			if (!this.roomList.length) {
				if (sysConfig.chatConfig.bOnlyOneRoom) {
					let oneRoomConfig = sysConfig.chatConfig.roomList.find((el: any) => el.lang == selectLang().value)
					if (oneRoomConfig) {
						sysConfig.chatConfig.roomList = [oneRoomConfig]
					}
				}
				sysConfig.chatConfig.roomList.forEach((el: any) => {
					this.roomList.push(el.text)
				})
				const chatRoomIndex = vueStorage(StorageKey.CHAT_ROOM, -1)
				if (chatRoomIndex.value >= 0 && sysConfig.chatConfig.roomList.length > chatRoomIndex.value) {
					this.currRoomIndex = chatRoomIndex.value
				} else {
					this.currRoomIndex = 0
					let selectIndex = 0
					sysConfig.chatConfig.roomList.forEach((el: any) => {
						if (el.lang == selectLang().value) {
							this.currRoomIndex = selectIndex
						} else {
							selectIndex++
						}
					})
				}
			}
			if (!this.serverRoutes) {
				this.serverRoutes = new ServerRoutes()
				let routesObj = JSON.parse(useSysConfigStore().pageConfig.techConfig.chatRoutes)
				this.serverRoutes.parse(routesObj)
			}
			if (this.chatGameControl == null) {
				this.connectCurRoom()
			}
			// 滚动到最下方
			setTimeout(() => {
				const scrollBox = document.querySelector('.chat__content')
				if (isIos()) {
					setTimeout(() => {
						if (this.messageId == this.list[this.list.length - 1].id) {
							scrollBox?.scrollTo({
								top: this.scrollBoxTop,
							})
						}
					}, 500)
				} else {
					this.scrollDown()
					setTimeout(() => {
						scrollBox?.scrollTo({
							top: this.addScrollTop,
						})
					}, 300)
				}
			}, 5)
			// 监听滚动到底部时 隐藏新消息通知
			scrollBox.addEventListener('scroll', (e) => {
				if (Math.round(scrollBox?.scrollTop) == scrollBox.scrollHeight - scrollBox.clientHeight) {
					this.newMessage = 0
				}
				this.addScrollTop = scrollBox?.scrollHeight || 0
			})
			if (isPC()) {
				this.removeScroll()
			}
		},
		// 记录滚动位置与未读消息
		recordInfo() {
			// 记录滚动位置
			const scrollBox = document.querySelector('.chat__content')
			this.scrollBoxTop = scrollBox?.scrollTop
			// 记录消息条数 当前页面未读+最后一条消息的id
			this.messageNum = 0
			this.messageId = null
			this.messageNum = this.newMessage
			if (this.list.length > 0) {
				this.messageId = this.list[this.list.length - 1].id
			}
		},
		unmounted() {
			// 需求：离开聊天室页面不断链接
			// this.changeRoom(-1)
			this.recordInfo()
		},

		onConnectServer() {
			HallLog.log('zPageChat onConnectServer')
			this.bShowLoading = false
		},

		onForceLeaveGame() {
			HallLog.warn('zPageChat onForceLeaveGame')
		},

		onErrorMsg(err: any) {
			HallLog.error('zPageChat onErrorMsg', err)
			let option = { vip_msg: this.vip_msg, vip_gif: this.vip_gif }
			useSysConfigStore().addErrorMessage({ id: err._errno, msg: Helper.getErrnoStr(err, null, option), type: TipsTypeEnum.error })
			/*
			const $t = useNuxtApp().$t
			if(err._errno == 17303){
				let dialog = {
					title: $t('D0029'),
					// 必须升级到VIP{量}才能发送文本信息，请问是否查看VIP详情？
					text: $t('D0027'),
					ok_text: $t('D0028'),
					cancel_text: $t('L1023'),
					ok: () => {
						navigateTo('/vip')
					}
				}
				useDialogStore().open(dialog)
			}else if(err._errno == 17304){
				let dialog = {
					title: $t('D0029'),
					// 必须升级到VIP{量}才能发送gif，请问是否查看VIP详情？
					text: $t('D0027'),
					ok_text: $t('D0028'),
					cancel_text: $t('L1023'),
					ok: () => {
						navigateTo('/vip')
					}
				}
				useDialogStore().open(dialog)
			}
			*/
		},

		onReconnecting() {
			HallLog.warn('zPageChat onReconnecting')
			this.bShowLoading = true
		},

		connectCurRoom() {
			this.bShowLoading = true
			this.closeCurRoom()

			this.chatGameControl = new GameControl('1000')

			this.chatGameControl.gameServer.on(GameServer.EVENT_SOCKET_OPEN, this, this.onConnectServer)
			this.chatGameControl.gameServer.on(GameServer.EVENT_FORCE_LEAVE_GAME, this, this.onForceLeaveGame)
			this.chatGameControl.gameServer.on(GameServer.EVENT_SOCKET_ERROR_MSG, this, this.onErrorMsg)
			this.chatGameControl.gameServer.on(GameServer.Event_GameSocketCallReconnect, this, this.onReconnecting)

			//以下是通用协议
			this.chatGameControl.registHandler(GameCommand.Enter, new ChatEnterHandler(this.chatGameControl.gameServer)) //*en1*
			this.chatGameControl.registHandler(GameCommand.Leave, new ChatLeaveHandler(this.chatGameControl.gameServer)) //*lee*
			this.chatGameControl.registHandler(GameCommand.GameCfg, new ChatGameCfgHandler(this.chatGameControl.gameServer)) //a

			//以下是 单个游戏独立协议
			this.chatGameControl.registHandler('fetch_msg', new ChatFetchMsgHandler(this.chatGameControl.gameServer))
			this.chatGameControl.registHandler('send', new ChatSendMsgHandler(this.chatGameControl.gameServer))

			//链接服务器
			let socketFuncName = 'event'
			if (!useUserStore().isLogin) {
				socketFuncName = 'NA.' + socketFuncName
			}
			this.chatGameControl.enterGame(
				{
					serverRoutes: this.serverRoutes,
					gid: 1000,
					glv: sysConfig.chatConfig.roomList[this.currRoomIndex].glv,
					mod: sysConfig.chatConfig.mod,
					bNoUrlMod: sysConfig.chatConfig.bNoUrlMod,
				},
				socketFuncName
			)
		},

		closeCurRoom() {
			if (this.changeRoomTime) {
				clearTimeout(this.changeRoomTime)
				this.changeRoomTime = null
			}
			if (this.chatGameControl) {
				this.chatGameControl.shutDown()
				this.chatGameControl = null
			}
		},

		changeRoom(index: number) {
			if (this.chatGameControl == null) {
				this.connectCurRoom()
			}
			setTimeout(() => {
				this.showMb = false
			}, 3000)

			this.scrollBoxTop = 0
			let delayTime = 0
			if (this.chatGameControl && this.chatGameControl.gameServer.isRunning) {
				this.bShowLoading = true
				this.chatGameControl.gameServer.send(GameCommand.Leave)
				delayTime = 3000
			}
			if (index >= 0) {
				const chatRoomIndex = vueStorage(StorageKey.CHAT_ROOM, -1)
				this.currRoomIndex = chatRoomIndex.value = index
				this.list = []
				this.changeRoomTime = setTimeout(() => {
					this.connectCurRoom()
				}, delayTime)
			} else {
				//完全离开
				setTimeout(() => {
					this.closeCurRoom()
				}, 100)
			}
		},
	},
	getters: {},
})

export class ChatEnterHandler extends BaseHandler {
	Handle(data: any) {
		HallLog.log('ChatEnterHandler', data)
	}
}

export class ChatLeaveHandler extends BaseHandler {
	Handle(data: any) {
		HallLog.log('ChatLeaveHandler', data)
		const chatStore = useChatStore()
		if (chatStore.changeRoomTime) {
			chatStore.connectCurRoom()
		}
	}
}

export class ChatGameCfgHandler extends BaseHandler {
	Handle(data: any) {
		/* 
		a协议返回数据
		  data._pata  
		  	fetch_msg_count: 20
		    msg_content_len: 200
			msg_max_count: 1000
			send_gif_vip: 4
			send_msg_gap: 2
			send_msg_vip: 0
		*/
		const chatStore = useChatStore()
		chatStore.vip_msg = data._para.send_msg_vip
		chatStore.vip_gif = data._para.send_gif_vip
		HallLog.log('ChatGameCfgHandler', data)
	}
}

export class ChatFetchMsgHandler extends BaseHandler {
	Handle(data: any) {
		const chatStore = useChatStore()

		chatStore.list = data._para.reverse()
		chatStore.listFilter()

		// 未读消息
		if (chatStore.list.length > 0) {
			let index = chatStore.list.findIndex((item) => {
				return item.id == chatStore.messageId
			})

			if (index != -1) {
				chatStore.newMessage = chatStore.list.length - (index + 1) + chatStore.messageNum
			}
		}
		// 滚到记录位置
		// const scrollBox = document.querySelector('.chat__content');
		// if (this.scrollBoxTop || this.messageId != null) {
		// 	setTimeout(() => {
		// 		scrollBox?.scrollTo({
		// 			top: this.scrollBoxTop,
		// 			behavior: 'smooth',
		// 		})
		// 		this.scrollBoxTop = 0
		// 	}, 300)
		// }
		// else
		// {
		// setTimeout(() => {
		// 	const scrollBox = document.querySelector('.chat__content')
		// 	if(isIos()){
		// 		setTimeout(() => {
		// 			chatStore.scrollDown()
		// 		},3000)
		// 	}else{
		// 		chatStore.scrollDown()
		// 		setTimeout(() => {
		// 			scrollBox?.scrollTo({
		// 				top: chatStore.addScrollTop,
		// 			})
		// 		},300)
		// 	}
		// }, 5)

		if (isIos()) {
			setTimeout(() => {
				chatStore.scrollDown()
			}, 500)
		} else {
			setTimeout(() => {
				if (chatStore.imgLoadList.length > 0) {
					for (let i = 0; i < chatStore.imgLoadList.length; i++) {
						let img = document.getElementById(chatStore.imgLoadList[i])
						if (img) {
							img.addEventListener('load', () => {
								chatStore.imgLoadNum++
								if (chatStore.imgLoadNum == chatStore.imgLoadList.length) {
									setTimeout(() => {
										chatStore.scrollDown()
									}, 300)
								}
							})
						} else {
						}
					}
				} else {
					// 如果 class名为 user-info-header 的第一个元素加载出来了，就滚动到底部
					if (document.querySelector('.user-info-header')) {
						setTimeout(() => {
							chatStore.scrollDown()
						}, 300)
					}
				}
			}, 30)
		}
	}
}

export class ChatSendMsgHandler extends BaseHandler {
	Handle(data: any) {
		const chatStore = useChatStore()
		chatStore.list.push(data._para)
		chatStore.listFilter()
		// 自己发的滚动下去？ 再看上面的消息？
		if (chatStore.selfSend) {
			setTimeout(() => {
				chatStore.scrollDown()
				chatStore.selfSend = false
			}, 3)
		} else {
			// 用户浏览历史消息 给消息提示
			const scrollBox = document.querySelector('.chat__content')
			const chatHeader = document.querySelector('.chat-header-wrap')
			const chatFooter = document.querySelector('.chat-bottom')
			let boxNowScroll = scrollBox.scrollHeight - scrollBox.clientHeight
			let boxNowHeight = document.documentElement.clientHeight - chatHeader.clientHeight - chatFooter.clientHeight - 4
			if (scrollBox?.scrollTop != boxNowScroll || boxNowHeight > scrollBox.clientHeight + 10) {
				// if (boxNowHeight > scrollBox.clientHeight + 10) {
				chatStore.newMessage++
			} else {
				setTimeout(() => {
					chatStore.scrollDown()
				}, 3)
			}
		}
		HallLog.log('ChatSendMsgHandler', data)
	}
}
