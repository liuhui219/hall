import HallLog from '~~/apis/debug/HallLog'
import Global from '~~/core/Global'
import { ServerPushType } from '~~/core/apis/hall/HallBroadcastHelper'

//注册全部心跳广播事件
export const registerBroadcastHandle = () => {
	//merge——是否合并处理，与推送过来的数据无关的广播可以合并
	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_ONLINE_COUNT, { func: handleOnlineCount, merge: true })

	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_UPDATE_INFO, { func: handleUserMoney, merge: true })
	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_MARQEE_HAVEMAIL, { func: handleNewEmail, merge: true })
	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_PURCHASE, { func: handlePurchase, merge: false })
	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_WITHDRAW, { func: handleWithDraw, merge: false })
	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_USER_PAY_FIRST_SUCC, { func: handlePurchaseFirst, merge: false })
	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_USER_PAY_TOP_SUCC, { func: handlePurchaseTop, merge: false })
	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_USER_REGISTER_SUCC, { func: handleRegister, merge: false })
	Global.HallServer.broadcastHelper.registerMsg(ServerPushType.TYPE_USER_LOGIN_SUCC, { func: handleLogin, merge: false })
}

// function handleUserBonus(msg: any) {
// 	HallLog.log('heartbeat handleUserBonus', msg)
// 	try {
// 		const configStore = useSysConfigStore()
// 		if (configStore.wallet_type == 1 && configStore.gameBonusList.length) {
// 			if (!isPageInGame()) {
// 				//游戏中 大厅不显示余额，且变化过于频繁，不需要实时请求更新
// 				useUserStore().updateUserWallets()

// 				let serverData = msg.data
// 				const app = useNuxtApp()
// 				useDialogStore().open({
// 					title: app.$t('D0029'),
// 					text: app.$t('H0011', { symbol: configStore.currency_symbol, point: app.$fp(app.$cp(serverData.point)) }),
// 					ok: () => {
// 						useClassGameStore().toClassGame({ active: 'bonus' })
// 					},
// 					ok_text: 'Yes',
// 					cancel_text: 'No',
// 				})
// 			}
// 		}
// 	} catch (error) {
// 		HallLog.error('handleUserBonus error', error)
// 	}
// }

function handleOnlineCount(msg: any) {
	// HallLog.log('heartbeat handleOnlineCount', msg)
	try {
		const appStore = useAppStore()
		let serverData = msg.data
		appStore.updateOnlineCount(serverData.uc)
	} catch (error) {
		HallLog.error('handleOnlineCount error', error)
	}
}

function handleUserMoney(msg: any) {
	HallLog.log('heartbeat handleUserMoney', msg)
	try {
		if (!isPageInGame()) {
			//游戏中 大厅不显示余额，且变化过于频繁，不需要实时请求更新
			useUserStore().updateUserWallets()
		}
	} catch (error) {
		HallLog.error('handleUserMoney error', error)
	}
}

function handleNewEmail(msg: any) {
	HallLog.log('heartbeat handleNewEmail', msg)
	try {
		useNoticeAndMessageStore().loadData(2)
	} catch (error) {
		HallLog.error('handleNewEmail error', error)
	}
}

function handlePurchase(msg: any) {
	HallLog.log('heartbeat handlePurchase', msg)

	const userStore = useUserStore()
	try {
		let serverData = msg.data
		let nValue = 0
		if (serverData && serverData.point) {
			nValue = serverData.point
		}
		nValue = useNuxtApp().$cp(nValue)

		googleEvent(
			{
				event: 'purchase',
				event_type: 'af_purchase',
				currency: useSysConfigStore().currency_abbr,
				af_currency: useSysConfigStore().currency_abbr,
				value: nValue, //FB需要
				revenue: nValue,
				moneyValue: nValue,
				af_revenue: nValue,
			},
			serverData
		)

		googleEvent({ sendType: 1, event: 'deposit_success', type: 'personal', module: 'deposit', prop: { amount: Number(nValue) } })
	} catch (error) {
		HallLog.error('handlePurchase error', error)
	}

	//告诉服务端 心跳收到了，可以删除了
	setTimeout(() => {
		Global.HallServer.heartbeatHelper.run()
	}, 10)

	//充值后需要请求用户完整数据，有些数据可能会因为充值被改变，比如 cpf绑定信息
	userStore.getUserInfo()
}

function handlePurchaseFirst(msg: any) {
	HallLog.error('heartbeat handlePurchaseFirst', msg)
	try {
		let serverData = msg.data
		let nValue = 0
		if (serverData && serverData.point) {
			nValue = serverData.point
		}
		nValue = useNuxtApp().$cp(nValue)

		googleEvent(
			{
				event: 'first_purchase',
				event_type: 'af_first_purchase',
				currency: useSysConfigStore().currency_abbr,
				af_currency: useSysConfigStore().currency_abbr,
				value: nValue, //FB需要
				revenue: nValue,
				moneyValue: nValue,
				af_revenue: nValue,
			},
			serverData
		)
	} catch (error) {
		HallLog.error('handlePurchaseFirst error', error)
	}
}

function handlePurchaseTop(msg: any) {
	HallLog.error('heartbeat handlePurchaseTop', msg)
	try {
		let serverData = msg.data
		let nValue = 0
		if (serverData && serverData.point) {
			nValue = serverData.point
		}
		nValue = useNuxtApp().$cp(nValue)

		googleEvent(
			{
				event: 'top_purchase',
				event_type: 'af_top_purchase',
				currency: useSysConfigStore().currency_abbr,
				af_currency: useSysConfigStore().currency_abbr,
				value: nValue, //FB需要
				revenue: nValue,
				moneyValue: nValue,
				af_revenue: nValue,
			},
			serverData
		)
	} catch (error) {
		HallLog.error('handlePurchaseTop error', error)
	}
}

function handleWithDraw(msg: any) {
	HallLog.error('heartbeat handleWithDraw', msg)
	try {
		let serverData = msg.data
		let nValue = 0
		if (serverData && serverData.point) {
			nValue = serverData.point
		}
		nValue = useNuxtApp().$cp(nValue)

		let v = -nValue
		googleEvent(
			{
				event: 'refund',
				event_type: 'af_refund',
				currency: useSysConfigStore().currency_abbr,
				af_currency: useSysConfigStore().currency_abbr,
				moneyValue: v,
				amount: nValue,
			},
			serverData
		)
	} catch (error) {
		HallLog.error('handleWithDraw error', error)
	}
}

function handleRegister(msg: any) {
	HallLog.error('heartbeat handleRegister', msg)
	try {
		let serverData = msg.data
		googleEvent(
			{
				event: 'register',
				event_fire: 'sign_up',
				event_type: 'af_complete_registration',
			},
			serverData
		)
	} catch (error) {
		HallLog.error('handleRegister error', error)
	}

	//告诉服务端 心跳收到了，可以删除了
	setTimeout(() => {
		Global.HallServer.heartbeatHelper.run()
	}, 10)
}

function handleLogin(msg: any) {
	HallLog.log('heartbeat handleLogin', msg)
	try {
		let serverData = msg.data
		googleEvent(
			{
				event: 'login',
				event_type: 'af_login',
			},
			serverData
		)
	} catch (error) {
		HallLog.error('handleLogin error', error)
	}
}
