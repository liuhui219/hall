import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'

export const useLiveChatReady = () => useState('live-chat-ready', () => false)

//初始化次数
let liveChatStatus = 0 //加载状态 0-默认 1-加载中 2-加载完成
let initLiveChatCount = 0 //初始化失败次数

//加载 Live-chat
export function loadLiveChat() {
	let liveChatId = resConfig['live-chat-id']
	if (!liveChatId) {
		return
	}

	liveChatStatus = 1
	initLiveChatCount = 0
	setTimeout(() => {
		if (liveChatStatus == 1) {
			liveChatStatus = 0
		}
	}, 30000)

	const pageLoading = usePageLoading()
	pageLoading.value = true

	useHead({
		script: [
			{
				body: true,
				children: `window.__lc = window.__lc || {};
                    window.__lc.license = ${liveChatId};
                    ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))`,
			},
		],
		noscript: [
			{
				body: true,
				children: `<a href="https://www.livechat.com/chat-with/${liveChatId}/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>`,
			},
		],
	})

	initLiveChat()
}

//初始化 Live-chat
export function initLiveChat() {
	setTimeout(() => {
		if (window && window.LiveChatWidget) {
			HallLog.log('LiveChatWidget register suc')
			window.LiveChatWidget.on('ready', LiveChatOnReady)
			window.LiveChatWidget.on('customer_status_changed', LiveChatOnCustomerStatusChanged)
		} else if (initLiveChatCount < 20) {
			initLiveChatCount++
			initLiveChat()
		} else {
			HallLog.error('LiveChatWidget register failed')
		}
	}, 1000)
}

//点击打开 Live-chat
export function clickLiveChat() {
	HallLog.log('clickLiveChat')
	let liveChatId = resConfig['live-chat-id']
	if (!liveChatId) {
		return
	}
	if (liveChatId.startsWith('http')) {
		//兼容不接livechat的包网，走外跳页面
		Helper.toOutLink(liveChatId)
		return
	}

	if (window.LiveChatWidget && liveChatStatus == 2) {
		window.LiveChatWidget.call('maximize')
	} else if (liveChatStatus == 0) {
		loadLiveChat()
	}
}

function LiveChatOnReady(initialData: any) {
	HallLog.log('LiveChatWidget LiveChatOnReady:' + JSON.stringify(initialData))
	useLiveChatReady().value = true
	liveChatStatus = 2

	const pageLoading = usePageLoading()
	if (pageLoading.value) {
		pageLoading.value = false
	}

	//这里需要加延迟，否则livechat窗口可能会破版
	setTimeout(() => {
		clickLiveChat()
	}, 100)
}

function LiveChatOnCustomerStatusChanged(data: any) {
	HallLog.log('LiveChatWidget LiveChatState:' + JSON.stringify(data))
	// switch (data.status) {
	//     case "queued":
	//     // customer is in queue
	//     break;
	//     case "chatting":
	//     // customer is currently chatting
	//     break;
	//     case "invited":
	//     // customer received an invitation but didn't start the chat
	//     break;
	//     case "browsing":
	//     // customer is in idle state, not queued, not chatting, and didn't receive an invitation
	//     break;
	// }
	if (data.status == 'chatting') {
		const userStore = useUserStore()
		if (userStore.isLogin) {
			let customerData = window.LiveChatWidget.get('customer_data')
			HallLog.log('LiveChatWidget LiveChatUserData:' + JSON.stringify(customerData))
			let oldName = customerData.name
			let a = /[[0-9]+]/gi
			let b = a.exec(oldName) || []
			let value = b[0]
			if (value) {
				oldName = oldName.replace(value, '')
				HallLog.error('LiveChatWidget value:' + value)
			}
			let newName = oldName + `[${userStore.data.uid}]`
			window.LiveChatWidget.call('set_customer_name', newName)
			HallLog.log('LiveChatWidget LiveChatSetNewName:' + newName)
		}
	}
}
