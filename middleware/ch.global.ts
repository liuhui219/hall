import StorageKey from '~~/apis/tool/StorageKey'

export default defineNuxtRouteMiddleware((to, from) => {
	useHomeStore().showWallet = false
	useHomeStore().showInfoMenu = false
	if (from && useUserStore().isLogin) {
		if (from.hash && ['roulette', 'deposit', 'checkin', 'inviteChest'].some((el: any) => from.hash.indexOf('/' + el) > -1)) {
			useUserStore().getRedPointData(true)
		} else if (from.path.indexOf('rewards') > -1) {
			useUserStore().getRedPointData(true)
		}
	}
	//过渡效果判断
	if (!useNuxtApp().$device.isDesktop) {
		//关闭搜索页面

		if (to.path != from.path) {
			const pageToIndex = to.meta.pageIndex as number
			const pageFromIndex = from.meta.pageIndex as number
			if (pageToIndex > pageFromIndex) {
				to.meta.pageTransition = from.meta.pageTransition = {
					name: 'app-slide-left',
					mode: 'in-out',
				}
			} else {
				to.meta.pageTransition = from.meta.pageTransition = {
					name: 'app-slide-right',
					mode: 'in-out',
				}
			}
		} else {
			to.meta.pageTransition = from.meta.pageTransition = {}
		}
	}

	isRouterBack().value = false
	if (to.fullPath == from.fullPath) {
		return true
	}

	if (to.path.includes('/task') && !from.path.includes('/task')) {
		googleEvent({ sendType: 1, event: 'entrance_click', type: 'activity', module: 'task_page' })
	}

	const ch = useUrlCh()
	const from_path = from.path || ''
	const to_path = to.path || ''
	const arr = to_path.split('/')
	const statusCode = parseInt(arr[1])
	const isNeedLogin = isNeedRedirct({ path: to.path, hash: to.hash })
	if (isNeedLogin) {
		let loginHash = 'login'
		const lastUid = vueStorage(StorageKey.LastUid, 0)
		if (!lastUid.value) {
			//没有注册过就弹注册
			loginHash = 'register'
		}
		return navigateTo({ path: from.path, query: from.query, params: from.params, hash: '#' /*+ from.hash.replace('#', '')*/ + '/' + loginHash })
	}

	if (to.name == from.name && !to.redirectedFrom && JSON.stringify(to.query) != JSON.stringify(from.query)) {
		//相同页面下 特殊跳转 【替换页面】
		return navigateTo({ path: to.path, query: to.query, params: to.params, hash: to.hash, replace: true })
	}
	if (to.hash.includes('/login') || to.hash.includes('/register')) {
		const { isLogin } = useUserStore()
		if (isLogin) {
			let hash = to.hash.replace('/login', '').replace('/register', '')
			// if (hash == "#") {
			// 	hash = "";
			// }
			return navigateTo({ path: to_path, query: to.query, params: to.params, hash: hash })
		}
	}
	if (to.fullPath.includes('/api/')) {
		throw createError({ statusCode: 404, statusMessage: to.fullPath + ' Not Found' })
	}
	if (statusCode === 401) {
		throw createError({ statusCode: 401, statusMessage: 'Page Not Found' })
	} else if (statusCode) {
		// return navigateTo({ path: ch.value + '/' })
		return navigateTo('/')
	}
	//未找到页面时 跳转首页
	if (!to.name) {
		return navigateTo('/')
	}
	//页面跳转有CH配置地址不存在时修改地址跳转
	// if (ch.value && !to_path.includes(ch.value)) {
	// 	return navigateTo({ path: ch.value + to_path, query: to.query, params: to.params, hash: to.hash })
	// }

	if (!to_path.endsWith('/') && from_path != to_path && (!isPageInGame(from_path) || !isPageInGame(to_path))) {
		const pageLoading = usePageLoading()
		pageLoading.value = true
	}
	return true
})
