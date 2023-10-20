import StorageKey from '~/apis/tool/StorageKey'
import HallLog from '~~/apis/debug/HallLog'
import { mapFace, PopupConfig, otherStoreConfig } from '~~/apis/types'

export const usePopupNameMaps = () => useState('popup_name_list', () => <mapFace>{})
export const usePagePadding = () => useState('page-padding', () => ({ top: true, bottom: true, homeHeader: true, title: '', sport: false }))
export const usePageLoading = () => useState('page-loading', () => false)
//之前关闭的页面需要再返回
export const usePrevRoute = () => useState('prev-route', () => ({ hash: '', page: '' }))
export const useToGamePage = () => useState('to-game-page', () => false)

//页面tranition 测试
export const useTransition = () => useState('page-transition', () => ({ name: 'app-slide-left', mode: 'out-in', index: 0 }))
//下拉选择框
export const useSelectConfig = () => useState('user_select_config', (): Object => ({}))
//路由返回统一调用这里
export const isRouterBack = () => useState('router-back', () => false)
export function pageRouterBack(filter = '') {
	const router = useRouter()
	HallLog.error('router.options.history:' + JSON.stringify(router.options.history))
	const history = router.options.history
	const data = history.state
	// if (!usePagePadding().value.homeHeader && usePagePadding().value.title && useNuxtApp().$device.isMobile) {
	// 	toHome()
	// 	return
	// }
	if (data.back) {
		let backStr = data.back.toString()
		let current = data.current?.toString() || ''
		if ((filter == '' && (!data.current || !backStr.includes(current))) || !backStr.includes(filter)) {
			HallLog.error('pageRouterBack:back')
			isRouterBack().value = true
			router.back()
			setTimeout(() => {
				if (isRouterBack().value) {
					//可能back不成功
					// pageRouterBack(filter) //可能出现死循环
					toHome()
					return
				}
				closePopup()
			}, 10)
			return
		}
	}
	HallLog.error('pageRouterBack:/')
	toHome()
}

export function setPagePaddingTitle(title: string) {
	usePagePadding().value.title = title
	usePagePadding().value.homeHeader = !title
}

//判断当前是否在某个页面(current必须以【/】开头)或弹窗(不带【/】开头则是弹窗)
export function isPageInSome(current: string, path = '') {
	if (!current) {
		current = '/'
	}
	if (!path) {
		if (current.charAt(0) == '/') {
			path = useRoute().path.toString()
		} else {
			path = useRoute().hash.toString()
		}
	}
	if (current == '/') {
		return path == '/'
	}
	return path.toString().includes(current)
}

//判断当前是否在game页面
export function isPageInGame(path = '') {
	return isPageInSome('/game', path)
}

//判断当前是否在sport页面
export function isPageInSport(path = '') {
	return isPageInSome('/sport', path)
}

//判断当前是否在refer-and-earn页面
export function isPageReferAndEarn(path = '') {
	return isPageInSome('/refer-and-earn', path)
}

export const isNeedRedirct = (route: { [x: string]: string | any[] }) => {
	if (!route) return false
	if (!useUserStore().isLogin) {
		const maps = <mapFace>{
			path: ['/rewards', '/task', '/mygame'],
			hash: [
				'/bethistory',
				'/message',
				'/myProfile',
				'/deposit',
				'/withdraw',
				'/transaction',
				'/checkin',
				'/rewardHistory',
				'/inviteChest',
				'/userInfo',
			],
		}
		for (let key in maps) {
			let list = maps[key]
			for (let i = 0; i < list.length; i++) {
				if (route[key]?.includes(list[i])) {
					return true
				}
			}
		}
	}
	return false
}

export const openLogin = () => {
	openPopup(PopupEnum.login)
}

export const openRegister = () => {
	openPopup(PopupEnum.register)
}

//弹窗 【登录】或【注册】——有过注册记录的就弹登录，没有就弹注册
export const openLoginOrRegister = () => {
	const lastUid = vueStorage(StorageKey.LastUid, 0)
	if (lastUid.value) {
		openLogin()
	} else {
		openRegister()
	}
}

//hash弹窗配置
export const usePopupExits = () => useState('popup_exits', (): Boolean => true)
export const usePopupConfig = () =>
	useState('popup_config', (): PopupConfig[] => [
		{ show: false, name: '', class: '', data: {}, full: false, index: null, header: false, navbar: false, position: 'center' },
		{ show: false, name: '', class: '', data: {}, full: false, index: null, header: false, navbar: false, position: 'center' },
	])
//开启hash弹窗
export const openPopup = (name: string, queryObj: any = null) => {
	if (!name) return
	if (name == 'checkin') {
		googleEvent({ sendType: 1, event: 'entrance_click', type: 'activity', module: 'check_in_seven' })
	} else if (name == 'roulette') {
		googleEvent({ sendType: 1, event: 'entrance_click', type: 'activity', module: 'roulette_page' })
	} else if (name == 'inviteChest') {
		googleEvent({ sendType: 1, event: 'entrance_click', type: 'activity', module: 'invite_page' })
	} else if (name == 'deposit') {
		googleEvent({ sendType: 1, event: 'click_deposit' })
		googleEvent({ sendType: 1, event: 'entrance_click', type: 'personal', module: 'deposit' })
	}

	let { path, params, hash, query } = useRoute()
	//手机弹窗弹窗时关闭menu
	if (!useNuxtApp().$device.isDesktop && name != 'menu') {
		hash = hash.replace('/menu', '')
	}
	let list: string[] = hash.replace('#/', '').split('/')
	if (list.length >= 2) {
		let prev = list.pop()
		usePrevRoute().value.hash = prev as string
		hash = '#/' + list[0]
	}
	if (hash == '#') {
		hash = ''
	}
	let nextHash = ''
	if (hash) {
		const user = useUserStore()
		if ((name == 'register' || name == 'login') && user.isLogin) {
			return
		}
		if (hash.includes('/' + name)) {
			return
		} else if (name != 'login' && name != 'register' && name != 'reset') {
			//登录相关弹窗不与其他弹窗一起，需要关闭其他弹窗
			nextHash = hash + '/' + name
		} else {
			nextHash = '#/' + name
		}
	} else {
		nextHash = '#/' + name
	}
	if (nextHash == hash) {
		return
	}
	useHomeStore().showWallet = false
	if (queryObj) {
		Object.keys(queryObj).forEach((key) => {
			query[key] = queryObj[key]
		})
	}
	let replace = false
	if (isPageInGame()) {
		replace = true
	}
	navigateTo({ path, params, hash: nextHash, query, replace })
}
//关闭hash弹窗 按顺序 next是否打开另外一个弹窗
//bClick——是否手动点击
export const closePopup = (name?: string | undefined, next?: string, bClick = false, lockReplace = false) => {
	if (bClick) {
		const urlGameID = useUrlGameID()
		urlGameID.value = 0
	}

	const prev = usePrevRoute()
	if (!next && prev.value.hash) {
		next = prev.value.hash
		prev.value.hash = ''
	}
	HallLog.log('closePopup:' + name)
	const route = useRoute()
	let { params, query, path, hash } = route
	let nextHash = hash || ''
	let deleteName = name
	if (name) {
		nextHash = nextHash.replace('/' + name, '')
	} else {
		let arr = nextHash.split('/')
		deleteName = arr.pop()
		nextHash = arr.join('/')
	}
	if (nextHash == '#' && !useNuxtApp().$device.isDesktop) {
		//PC端如果去掉#，滚动容器会回到顶部
		nextHash = ''
	}
	if (nextHash != hash) {
		if (deleteName?.includes('gamedetail')) {
			delete query.gid
		}

		let replace = false
		if (isPageInGame()) {
			replace = true
		}
		if (lockReplace) {
			replace = lockReplace
		}
		navigateTo({ params, query, path, hash: nextHash, replace })
	}
	if (next) {
		nextTick(() => {
			setTimeout(() => {
				openPopup(next as string)
			}, 10)
		})
	}
}

export const closeAllPopup = () => {
	let { path, params, query, hash } = useRoute()
	if (useNuxtApp().$device.isDesktop && hash) {
		hash = '#'
	} else {
		hash = ''
	}
	usePopupExits().value = false
	usePopupConfig().value[0] = {
		show: false,
		name: '',
		class: '',
		data: {},
		full: false,
		index: null,
		header: false,
		navbar: false,
		position: 'center',
	}
	usePopupConfig().value[1] = {
		show: false,
		name: '',
		class: '',
		data: {},
		full: false,
		index: null,
		header: false,
		navbar: false,
		position: 'center',
	}
	navigateTo({ path: path, params: params, hash, query: query })
	setTimeout(() => {
		usePopupExits().value = true
	}, 100)
}

//seo配置
export function updateSeo(key: string) {
	let seoObj = seoConfig
	if (key == 'app') {
		//走包网配置
		seoObj = resConfig
	}
	let title = seoObj[key + '-title']
	if (title) {
		let desc = seoObj[key + '-desc']
		if (!desc) {
			desc = seoObj['app-desc']
		}
		useSeoMeta({
			title: () => `${title}`,
			ogTitle: () => `${title}`,
			description: () => `${desc}`,
			ogDescription: () => `${desc}`,
		})
		return true
	}
	return false
}
//全屏
export function requestFullscreen(domEle = null) {
	try {
		let element: any = document.documentElement
		if (domEle) {
			element = domEle
		}
		let requestMethod =
			element.requestFullScreen ||
			element.webkitRequestFullScreen ||
			element.mozRequestFullScreen ||
			element.msRequestFullScreen ||
			element.requestFullscreen ||
			element.webkitRequestFullscreen ||
			element.mozRequestFullscreen ||
			element.msRequestFullscreen

		if (requestMethod) {
			requestMethod.call(element)
		}
	} catch (error) {}
}

//退出全屏
export function exitFullscreen() {
	try {
		let element: any = document
		let requestMethod =
			element.exitFullScreen ||
			element.webkitExitFullScreen ||
			element.mozCancelFullScreen ||
			element.msCancelFullScreen ||
			element.exitFullscreen ||
			element.webkitExitFullscreen ||
			element.mozCancelFullscreen ||
			element.msCancelFullscreen

		if (requestMethod) {
			requestMethod.call(element)
		}
	} catch (error) {}
}

//回首页
export const toHome = () => {
	navigateTo({ name: '_ch' })
}
//打开充值
export const toDeposit = () => {
	openPopup(PopupEnum.deposit)
}

export const toProvider = (gplat: number) => {
	navigateTo({
		path: '/provider',
		query: { gplat: gplat },
	})
}

export const getDisabledBtnClass = (disabled: any, type?: any, highlight = '') => {
	if (!type) {
		return disabled ? 'btn-disable' : highlight || 'btn-highlight'
	} else {
		return disabled ? highlight || 'btn-highlight' : 'btn-disable'
	}
}

export const getTimestamp = (time?: number) => {
	if (!time) {
		time = Date.now() / 1000
	}
	return parseInt(`${time}`)
}

//A2HS 保存到桌面功能
export const A2HS = () => {
	window.addEventListener('beforeinstallprompt', (e) => {
		HallLog.log('saveToHome: beforeinstallprompt')
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault()
		// Stash the event so it can be triggered later.
		window.deferredPrompt = e

		window.saveToHome = function () {
			if (window.deferredPrompt) {
				window.deferredPrompt.prompt()
				// Wait for the user to respond to the prompt
				window.deferredPrompt.userChoice.then((choiceResult: any) => {
					if (choiceResult.outcome === 'accepted') {
						HallLog.log('saveToHome: User accepted the prompt')
					} else {
						HallLog.log('saveToHome: User dismissed the prompt')
					}
					// window.deferredPrompt.deferredPrompt = null;
				})
			} else {
				HallLog.log('saveToHome: This website does not support pwa')
			}
		}
	})
}

//开启全局iframe页面或弹窗
export const openOther = (config: otherStoreConfig = {}, type = 0) => {
	vueStorage(StorageKey.OtherInfo, '').value = JSON.stringify(config, (k, v) => {
		if (typeof v === 'function') {
			return `${v}`
		}
		return v
	})
	if (type == 0) {
		openPopup(PopupEnum.other)
	} else {
		navigateTo('/other')
	}
}
