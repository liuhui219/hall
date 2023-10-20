<template>
	<div>
		<BasePageLoading :http="true" :show="sportLoading" />
		<div id="sportdiv" />
	</div>
</template>
<script setup lang="ts">
	import HallLog from '~~/apis/debug/HallLog'
	definePageMeta({
		pageIndex: PageIndexEnum.sport,
	})
	const sportLoading = ref(true)
	const gameStore = useGameStore()
	const pagePadding = usePagePadding() //页头页脚是否显示
	//体育新token
	var btNewToken: any = null
	//体育加载状态 0-默认 1-加载中 2-加载结束
	var btLoadState = 0

	onActivated(() => {
		HallLog.log('sport onMounted btLoadState:' + btLoadState)
		document.body.style.overflow = 'visible'
		window.document.documentElement.style.overflow = 'visible'

		sportLoading.value = true
		pagePadding.value.bottom = false
		pagePadding.value.sport = true
		gameStore.tryToGame(gameStore.sportGameId, true)

		//可能会请求失败，这里设置loading最长时间
		setTimeout(() => {
			sportLoading.value = false
		}, 5000)
	})
	onBeforeRouteLeave(() => {
		HallLog.log('sport onBeforeRouteLeave')
		pagePadding.value.bottom = true
		pagePadding.value.sport = false
		gameStore.leaveFromSport()
		document.body.style.removeProperty('overflow')
		window.document.documentElement.style.removeProperty('overflow')
	})

	watchEffect(() => {
		if (gameStore.bShowBetByGame) {
			HallLog.log('watch game.bShowBetByGame:true')
			if (gameStore.betbyParams) {
				HallLog.log('sport start loadBetByGame')
				loadBetByGame()
			}
		} else {
			HallLog.log('watch game.bShowBetByGame:false')
		}
	})

	const loadBetByGame = () => {
		if (window.btRender) {
			HallLog.log('already loadBetByGame')
			sportLoading.value = false
			return
		}
		loadBetByScript()
	}

	const loadBetByScript = () => {
		if (window.btScript) {
			loadBtLibSuc()
			return
		}
		if (btLoadState != 0) {
			HallLog.error('try loadBetByScript again')
			return
		}
		if (!gameStore.betbyParams) {
			HallLog.error('loadBetByScript when no betbyParams')
			return
		}

		window.btErrorCount = (window.btErrorCount || 0) + 1
		btLoadState = 1

		let bt_lib_src = gameStore.betbyParams.bt_lib_src
		var src = bt_lib_src
		var script = document.createElement('script')
		script.type = 'text/javascript'
		script.async = true
		script.src = src
		var s = document.head.getElementsByTagName('script')[0]
		s?.parentNode?.insertBefore(script, s)

		script.onload = function () {
			HallLog.log('betby js lib load suc')
			//库加载成功后
			window.btScript = true
			loadBtLibSuc()
		}
		script.onerror = function () {
			HallLog.error('betby js lib load failed')

			if (window.btErrorCount >= 10) {
				sportLoading.value = false
				return
			}
			btLoadState = 0
			loadBetByScript()
		}
	}

	const loadBtLibSuc = () => {
		HallLog.log('loadBtLibSuc')
		sportLoading.value = false
		btLoadState = 2

		let brand_id = gameStore.betbyParams?.brand_id
		let lang = betbyLang().value
		let theme = gameStore.betbyParams?.theme
		let token = gameStore.betbyParams?.token

		if (gameStore.bShowBetByGame && !window.btRender) {
			var top = updateBtTopOffset()
			HallLog.log('betby init top:' + top)
			HallLog.log('betby token:' + token)
			window.btRender = new BTRenderer().initialize({
				brand_id: brand_id,
				token: token,
				onTokenExpired: function () {
					HallLog.error('onTokenExpired')
					return new Promise((resolve) => {
						getBtNewToken(resolve)
					})
				},
				themeName: theme,
				lang: lang,
				target: document.getElementById('sportdiv'),
				stickyTop: top,
				betSlipOffsetTop: top,
				betSlipOffsetBottom: 0,
				betslipZIndex: 999,
				url: gameStore.sportPath,
				cssUrls: [
					// 'https://link.to.your.fonts.file.css',
					// 'https://link.to.some.extra.fonts.css'
				],
				fontFamilies: [
					// 'Montserrat, sans-serif',
					// 'Roboto, sans-serif'
				],
				onRouteChange: function () {},
				onLogin: function () {
					openPopup(PopupEnum.login)
				},
				onRegister: function () {
					openPopup(PopupEnum.register)
				},
				onSessionRefresh: function () {
					window.btRender.kill()
					window.btRender = null
					loadBtLibSuc()
				},
				onBetSlipStateChange: function () {},
				onRecharge: function () {
					//进充值页面
					openPopup(PopupEnum.deposit)
				},
			})
		}
	}

	const getBtNewToken = (resolve: Function) => {
		let params = { gid: gameStore.sportGameId }

		useEnterGame(
			{ body: params },
			(res: any) => {
				btNewToken = null
				if (res && res.betby_rsp) {
					btNewToken = res.betby_rsp.token
				}
				HallLog.error('newtoken suc:' + btNewToken)
				resolve(btNewToken)
			},
			(err: any) => {
				HallLog.error('newtoken error:' + btNewToken)
				resolve(btNewToken)
			}
		)
	}

	const updateBtTopOffset = () => {
		var top = 80
		if (isPC()) {
			top = 80
		}
		// let headerMain = document.getElementById('header-main');
		// if (headerMain) {
		// 	top = headerMain.clientHeight;
		// }
		if (window.btRender) {
			window.btRender.updateOptions({ betSlipOffsetTop: top, stickyTop: top })
		}
		return top
	}
</script>
