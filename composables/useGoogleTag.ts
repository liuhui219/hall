import HallLog from '~~/apis/debug/HallLog'
import NativeEvent from '~~/apis/tool/NativeEvent'
// import { setUserProperties, setUserId, getAnalytics, logEvent } from 'firebase/analytics'
// import { initializeApp } from 'firebase/app'
// import { getRedirectResult } from 'firebase/auth';
import { mapFace } from '~~/apis/types'
import StorageKey from '~~/apis/tool/StorageKey'
import Helper from '~~/apis/tool/Helper'

let Adjust: any = null
let FirebaseApp: any = null
let FirebaseFnc: any = null

//appsflyer服务端埋点所需数据
export const afSdkData: mapFace = {
	// af_id
	// af_dev_key
	// af_bundleIdentifier
}

//facebook pixel服务端埋点所需数据
export const fbSdkData: mapFace = {
	// fb_pixel_id
	// fb_access_token
	// fb_purchase_event
	// fb_first_purchase_event
	// fb_top_purchase_event
	// fb_withdraw_event //暂时没有提现的需要
	// fb_fbc //广告id
	// fb_fbp //浏览器标识

	fb_register_event: 'CompleteRegistration',
}

//tiktok pixel服务端埋点所需数据
export const tiktokSdkData: mapFace = {
	// tt_pixel_code
	// tt_access_token
	// tt_purchase_event
	// tt_first_purchase_event
	// tt_top_purchase_event
	// tt_clid //广告id
	// tt_ttp //浏览器标识
	// tt_test_event_code //服务端测试code
	tt_register_event: 'CompleteRegistration',
	tt_add_to_cart_event: 'AddToCart',
}

//获取并保存 三方隐藏的特殊参数
export function saveCookieExtraData() {
	const urlCodes = vueStorage(StorageKey.UrlCodes, {})
	let _fbc = vueCookieStorage('_fbc', '').value
	let _fbp = vueCookieStorage('_fbp', '').value
	if (_fbc) {
		fbSdkData['fb_fbc'] = _fbc
		urlCodes.value['fb_fbc'] = _fbc
	}
	if (_fbp) {
		fbSdkData['fb_fbp'] = _fbp
		urlCodes.value['fb_fbp'] = _fbp
	}

	let _ttclid = vueCookieStorage('ttclid', '').value
	let _ttp = vueCookieStorage('_ttp', '').value
	if (_ttclid) {
		tiktokSdkData['tt_clid'] = _ttclid
		urlCodes.value['tt_clid'] = _ttclid
	}
	if (_ttp) {
		tiktokSdkData['tt_ttp'] = _ttp
		urlCodes.value['tt_ttp'] = _ttp
	}
}

//更新 注册源参数
export function updateSourceMapData() {
	const urlCodes = vueStorage(StorageKey.UrlCodes, {})
	const urlSourceMap = useUrlSourceMap()
	urlSourceMap.value.codes = Helper.assignObj({}, urlCodes.value)
	const urlParams = useUrlParams()
	Object.keys(urlParams.value).forEach((key) => {
		delete urlSourceMap.value.codes[key]
	})
	let fbKeyList = ['fb_pixel_id']
	fbKeyList.forEach((el: any) => {
		if (fbSdkData[el]) {
			urlSourceMap.value.codes[el] = fbSdkData[el]
		}
	})
}

//kwai pixel服务端埋点所需数据
export const kwaiSdkData: mapFace = {
	// kwai_click_id
	// kwai_pixel_id
	// kwai_access_token
	// kwai_track_flag

	kwai_content_view_event: 'EVENT_CONTENT_VIEW',
	kwai_add_to_cart_event: 'EVENT_ADD_TO_CART',
	kwai_register_event: 'EVENT_COMPLETE_REGISTRATION',
	kwai_purchase_event: 'EVENT_PURCHASE',
	kwai_first_purchase_event: 'EVENT_FIRST_DEPOSIT',
}

//fb小幺鸡服务端埋点所需数据
export const fbXyjSdkData: mapFace = {
	// xiaoyaoji_user_agent
	// xiaoyaoji_unique_id
	// xiaoyaoji_adtrack
	// xiaoyaoji_utrack
}

// //maxconv 服务端埋点所需数据
// export const maxconvSdkData: mapFace = {
// 	// maxconv_click_id
// 	// maxconv_api_domain
// 	// maxconv_secret //非必须
// }

//GA服务端埋点所需数据
export const gaSdkData: mapFace = {
	// 	'api_secret': 'M4TLAWzARwu_Y4BW3L9eJQ',//kxk43KFeSfqyGj9R_wcVYw
	// 	'measurement_id': 'G-0ZZ14R97MY',//G-0QWTMCGCPM
	// 	'client_id': '',//必需。用于对 Web 客户端的用户实例进行唯一标识。请参阅将事件发送到 Measurement Protocol。
}

//firebaseApp服务端埋点所需数据
// export const firebaseSdkData: mapFace = {
// 	// 	'api_secret': 'p0zplFdxSGan-A2zsTcq9w',//kxk43KFeSfqyGj9R_wcVYw
// 	// 	'firebase_app_id': '1:987811382051:web:64d54d85d3879f5bb80296',
// 	// 	'app_instance_id': '',//必需。用于对 Firebase 应用的具体安装进行唯一标识。此值需要通过 Firebase SDK 进行检索。
// }

//服务端埋点枚举
export enum LogLevel {
	None = 0,
	Log = 0x01,
	Warn = 0x02,
	Net = 0x04,
	Error = 0x08,
	All = 0xff,
}
export enum serverEventEnum {
	ReportType_Register = 1, //注册
	ReportType_First_Recharge = 2, //首充
	ReportType_Recharge = 3, //充值
	ReportType_Withdraw = 4, //提现
	ReportType_Login = 5, //登录
	ReportType_ContentView = 6, //页面被查看
	ReportType_AddToCart = 7, //加入购物车
	ReportType_Top_Recharge = 8, //一级首充
	//----------------- 以下是新的事件用新的公用API，舊的先用原有的方式傳遞  ----------------
	ReportType_First_ContentView = 9, //首次打开时页面
	ReportType_Register_Button_Clicked = 10, //多次点击注册按钮上报
	ReportType_First_GameEnter = 11, //已注册用户第一玩游戏上报
	ReportType_Recharge_Button_Clicked = 12, //点击充值按钮
	ReportType_Recharge_Lunch = 13, //拉起订单
}

//更新 媒体来源
export function updateMediaSource() {
	const urlCodes = vueStorage(StorageKey.UrlCodes, {})
	let sdkData = { ...urlCodes.value, ...fbSdkData, ...afSdkData, ...kwaiSdkData, ...tiktokSdkData, ...fbXyjSdkData }

	let atype = 'organic'
	let aid = ''
	let acid = ''
	if (sdkData['utm']) {
		// utm-推广自定义来源参数
		atype = 'utm-' + sdkData['utm']
		// aid = sdkData['utm']
		// acid = sdkData['utm']
	} else if (kwaiSdkData['kwai_click_id'] && kwaiSdkData['kwai_pixel_id'] && kwaiSdkData['kwai_access_token']) {
		atype = 'kwai'
		aid = kwaiSdkData['kwai_pixel_id']
		acid = kwaiSdkData['kwai_click_id']
	} else if (fbSdkData['fb_pixel_id']) {
		atype = 'fb'
		aid = fbSdkData['fb_pixel_id']
		acid = fbSdkData['fb_fbc'] || ''
	} else if (tiktokSdkData['tt_pixel_code']) {
		atype = 'tt'
		aid = tiktokSdkData['tt_pixel_code']
		acid = tiktokSdkData['tt_clid'] || ''
	} else if (window.adjustAppToken) {
		atype = 'adjust'
		aid = window.adjustAppToken
	} else if (window.channel_send_to) {
		atype = 'gg'
		aid = window.channel_send_to
	} else if (isWebView()) {
		atype = 'app'
	} else if (fbXyjSdkData['xiaoyaoji_unique_id']) {
		atype = 'fbxyj'
		aid = fbXyjSdkData['xiaoyaoji_utrack']
		acid = fbXyjSdkData['xiaoyaoji_adtrack']
	} else if (sdkData['ic']) {
		atype = 'invite'
		aid = sdkData['ic']
	}

	const mediaSource = useUrlMediaSource().value
	mediaSource['atype'] = atype
	mediaSource['aid'] = aid
	mediaSource['acid'] = acid
}

//更新各种三方需要的参数
export function updateSdkData(urlCodes: any) {
	HallLog.logObj('urlCodes', urlCodes)

	let click_id = urlCodes['click_id']
	if (click_id) {
		kwaiSdkData['kwai_click_id'] = click_id
	}
	let pixel_id = urlCodes['pixel_id']
	if (pixel_id) {
		kwaiSdkData['kwai_pixel_id'] = pixel_id
	}

	// let maxconv_click_id = urlCodes['maxconv_click_id']
	// if (maxconv_click_id) {
	// 	maxconvSdkData['maxconv_click_id'] = maxconv_click_id
	// }

	let uniqueId = urlCodes['uniqueId']
	if (uniqueId) {
		fbXyjSdkData['xiaoyaoji_unique_id'] = uniqueId
		fbXyjSdkData['xiaoyaoji_user_agent'] = useDeviceConfig().value.UA
	}
	let adtrack = urlCodes['adtrack']
	if (adtrack) {
		fbXyjSdkData['xiaoyaoji_adtrack'] = adtrack
	}
	let utrack = urlCodes['utrack']
	if (utrack) {
		fbXyjSdkData['xiaoyaoji_utrack'] = utrack
	}
}

//初始化facebookPixel
export function initFacebook(fbPixel: string) {
	if (!fbPixel) {
		HallLog.error('initFacebook error:' + fbPixel)
		return
	}
	useHead({
		script: [
			{
				innerHTML: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${fbPixel}');
fbq('track', 'PageView');`,
			},
		],
	})
	window.fbPixel = fbPixel
	fbSdkData['fb_pixel_id'] = fbPixel
}

//初始化kwaiPixel
// export function initKwai(kwaiPixel: string) {
// 	if (!kwaiPixel) {
// 		HallLog.error('initKwai error:' + kwaiPixel)
// 		return
// 	}
// 	useHead({
// 		script: [
// 			{
// 				innerHTML: `!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.install=t():e.install=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))};!function(e){var t=window;t.KwaiAnalyticsObject=e,t[e]=t[e]||[];var n=t[e];n.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];var o=function(e,t){e[t]=function(){var n=Array.from(arguments),o=r([t],n,!0);e.push(o)}};n.methods.forEach((function(e){o(n,e)})),n.instance=function(e){var t=n._i[e]||[];return n.methods.forEach((function(e){o(t,e)})),t},n.load=function(t,r){n._i=n._i||{},n._i[t]=[],n._i[t]._u="https://s1.kwai.net/kos/s101/nlav11187/pixel/events.js",n._t=n._t||{},n._t[t]=+new Date,n._o=n._o||{},n._o[t]=r||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://s1.kwai.net/kos/s101/nlav11187/pixel/events.js?sdkid="+t+"&lib="+e;var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(o,i)}}("kwaiq")}])}));
// kwaiq.load('${kwaiPixel}');
// kwaiq.page();`,
// 			},
// 		],
// 	})
// 	window.kwaiPixel = kwaiPixel
// 	//注意这里是客户端的pixel，不能与服务端弄混
// }

//初始化Tiktok Pixel
export function initTiktok(tikTokPixel: string) {
	if (!tikTokPixel) {
		HallLog.error('initTiktok error:' + tikTokPixel)
		return
	}
	useHead({
		script: [
			{
				innerHTML: `!function (w, d, t) {
					w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
		  )ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
				  
					ttq.load('${tikTokPixel}');
					ttq.page();
				  }(window, document, 'ttq');`,
			},
		],
	})
	window.tiktokPixel = tikTokPixel
	tiktokSdkData['tt_pixel_code'] = tikTokPixel
}

//初始化GTM
export function initGTM(gtm: string) {
	if (!gtm) {
		HallLog.error('initGTM error:' + gtm)
		return
	}
	useHead({
		script: [
			{
				innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm}');`,
			},
		],
	})
}

//初始化GA
export function initGA(ga: string) {
	if (!ga) {
		HallLog.error('initGA error:' + ga)
		return
	}
	useHead({
		script: [
			{
				src: `https://www.googletagmanager.com/gtag/js?id=${ga}`,
			},
			{
				innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga}');`,
			},
		],
	})
}

//初始化全局GTM和GA
export function initGoogleTag() {
	if (resConfig['google-tag-m']) {
		initGTM(resConfig['google-tag-m'])
	}

	if (resConfig['google-tag-c']) {
		initGA(resConfig['google-tag-c'])
		window.send_to = resConfig['google-tag-c']
	}
}

//push埋点数据
function googleTagPush(...args: any[]) {
	if (window.dataLayer) {
		HallLog.log('googleTagPush:' + args)
		window.dataLayer.push(arguments)
	}
}

//google用户属性设置
export function googleUserProperty(data: any) {
	let user_id = undefined
	const userStore = useUserStore()
	if (userStore.isLogin) {
		user_id = userStore.data.uid

		data.general = userStore.data.general
		data.channel = userStore.data.pack_no
		data.pid = userStore.data.pid ? 1 : 0
		data.vip = userStore.vip_level
	}
	data.version = sysConfig.client_version
	let obj = { ...{ update: true, user_properties: data, user_id }, ...useUrlUtm().value }

	HallLog.log('googleUserProperty:' + JSON.stringify(obj))
	if (window.gtm_ga_id) {
		HallLog.log('googleUserProperty global gtm')
		googleTagPush('config', window.gtm_ga_id, obj)
	}

	if (window.send_to && window.send_to != window.gtm_ga_id) {
		HallLog.log('googleUserProperty global ga')
		googleTagPush('config', window.send_to, obj)
	}

	if (window.channel_send_to) {
		HallLog.log('googleUserProperty channel ga')
		googleTagPush('config', window.channel_send_to, obj)
	}

	if (window.firebaseAnalytics) {
		//全局firebase
		HallLog.log('firebaseAnalytics userProperty:' + JSON.stringify(data))
		window.setUserId(window.firebaseAnalytics, user_id)
		window.setUserProperties(window.firebaseAnalytics, data)
	}
	if (window.channelAnalytics) {
		//渠道firebase
		HallLog.log('firebaseChannelAnalytics userProperty:' + JSON.stringify(data))
		window.setUserId(window.channelAnalytics, user_id)
		window.setUserProperties(window.channelAnalytics, data)
	}
}

//facebook 埋点
export function facebookEvent(event: string, data: any) {
	try {
		if (window.fbq && window.fbPixel) {
			let fbEventObj = getFacebookEventName(event)
			if (fbEventObj) {
				HallLog.log('facebook gaEvent:' + event + ' fbEvent:' + fbEventObj.fbEvent + ' funcName:' + fbEventObj.funcName)
				let fbData = data
				window.fbq(fbEventObj.funcName, fbEventObj.fbEvent, fbData, fbData)
				//发送给指定pixel——注释代码保存在这，不要删除，方便修改
				// window.fbq('trackSingle', 'FB_PIXEL_ID', 'Purchase', customData);
				// window.fbq('trackSingleCustom', 'FB_PIXEL_ID', 'CustomEvent', customData);
			}
		}
	} catch (error) {
		HallLog.error('facebook event error ', error)
	}
}

//kwai 埋点
// export function kwaiEvent(event: string, data: any) {
// 	try {
// 		if (window.kwaiq && window.kwaiPixel) {
// 			if (!window.kwaiqInstance) {
// 				window.kwaiqInstance = window.kwaiq.instance(window.kwaiPixel)
// 			}
// 			let kwaiEvent = getKwaiEventName(event)
// 			if (kwaiEvent) {
// 				let kwaiData = JSON.parse(JSON.stringify(data))
// 				window.kwaiqInstance.track(kwaiEvent, kwaiData)
// 				HallLog.log('kwai gaEvent:' + event + ' kwaiEvent:' + kwaiEvent)
// 			}
// 		}
// 	} catch (error) {
// 		HallLog.error('Kwai event error ', error)
// 	}
// }

//tiktok 埋点
export function tiktokEvent(event: string, data: any) {
	try {
		if (window.ttq && window.tiktokPixel) {
			let tiktokEvent = getTiktokEventName(event)
			if (tiktokEvent) {
				HallLog.log('tiktok gaEvent:' + event + ' tiktokEvent:' + tiktokEvent)

				let tkData = data
				window.ttq.track(tiktokEvent, tkData)
			}
		}
	} catch (error) {
		HallLog.error('tiktok event error ', error)
	}
}

//当前是否支持上报
export function googleEventValid() {
	const userStore = useUserStore()
	const urlChannel = useCheckversionChannel()
	let myChannel = userStore.data.pack_no || 0
	if (userStore.isLogin && myChannel != urlChannel.value) {
		return false
	}
	return true
}

//当前马甲包是否支持上报
export function appEventValid(event: any) {
	if (afSdkData['af_id'] && (event == 'purchase' || event == 'first_purchase' || event == 'refund')) {
		return false
	}

	if (isWebView() && useUrlChlimit().value) {
		const userStore = useUserStore()
		const appChannel = vueStorage(StorageKey.AppChannel, 0)
		let myChannel = userStore.data.pack_no || 0
		if (userStore.isLogin && myChannel != appChannel.value) {
			return false
		}
	}

	return true
}

//google 埋点
export async function googleEvent(data: any, serverData: any = null) {
	try {
		const userStore = useUserStore()
		if (!googleEventValid()) {
			//用户渠道 跟 url渠道不一致的情况下 不上报
			const urlChannel = useCheckversionChannel()
			HallLog.error('googleEvent error: channel limit - urlchannel:' + urlChannel.value + ' userchannel:' + userStore.data.pack_no)
			return
		}
		if (serverData) {
			data = { ...serverData, ...data }
		}

		//FB API上报 与前端使用 eventID 去重
		if (!data.eventID) {
			if (data.event_id) {
				data.eventID = data.event_id
			} else {
				data.eventID = userStore.data.uid + '-' + new Date().toISOString()
			}
		}

		HallLog.log('googleEvent:' + JSON.stringify(data))
		let sendType = data.sendType
		delete data.sendType

		let event = data.event
		delete data.event
		let event_type = data.event_type || event
		delete data.event_type
		let event_fire = data.event_fire || event
		delete data.event_fire

		let uid = userStore.data.uid
		if (!data.uid) {
			data.uid = uid
		}
		if (!data.userId) {
			data.userId = uid
		}
		if (!data.user_id) {
			data.user_id = uid //这是google预留字段
		}

		if (!data.general) {
			data.general = userStore.data.general
		}
		if (!data.channel) {
			data.channel = useCheckversionChannel().value
		}
		if (!data.pid) {
			data.pid = userStore.data.pid
		}

		if (!data.email) {
			data.email = userStore.data.email
		}
		if (!data.phone) {
			data.phone = userStore.data.phone
		}

		//sendType undefined:全部发送 1：只发送给GA和GTM 2：只发送给Kwai
		const urlCodes = vueStorage(StorageKey.UrlCodes, {})
		// let eventObj = { ...data, ...urlCodes.value }
		let eventObj = data
		let eventString = JSON.stringify(eventObj)
		//gtm + ga
		if (sendType == undefined || sendType == 1) {
			googleTagPush('event', event, JSON.parse(eventString))
		}

		//原生包
		if (sendType == undefined) {
			try {
				if (appEventValid(event)) {
					//【充值/首充】【提现】由后端处理，但是前端同时兼容 老包
					let afData = JSON.parse(eventString)
					afData.event_type = event_type
					afData.af_content_id = uid

					NativeEvent.instance.appsFlyerEvent(JSON.stringify(afData), urlCodes.value['afevent'])
				}
			} catch (error) {
				HallLog.error('appsflyer event error ', error)
			}
		}

		if (sendType == undefined) {
			facebookEvent(event, JSON.parse(eventString))
			tiktokEvent(event, JSON.parse(eventString))
		}

		// if (sendType == undefined || sendType == 2) {
		// 	kwaiEvent(event, eventObj)
		// }

		//firebase
		if (sendType == undefined) {
			if (window.firebaseAnalytics) {
				//全局firebase
				let firebaseData = JSON.parse(eventString)
				firebaseData.send_to = window.firebaseSendTo
				window.firebaseLogEvent(window.firebaseAnalytics, event_fire, firebaseData)
			}
			if (window.channelAnalytics) {
				//渠道firebase
				let fireChannelData = JSON.parse(eventString)
				fireChannelData.send_to = window.firebaseChannelSendTo
				window.logEvent(window.channelAnalytics, event_fire, fireChannelData)
			}
		}

		//渠道adjust
		if (sendType == undefined) {
			if (window.adjustConfig) {
				let adjustKey = window.adjustConfig[event]
				if (adjustKey) {
					let adjustData = JSON.parse(eventString)
					adjustData.eventToken = adjustKey
					HallLog.log('adjustEvent:' + JSON.stringify(adjustData))
					await initAdjust()
					Adjust.trackEvent(adjustData)
				}
			}
		}

		let serverEventId = 0
		switch (event) {
			case 'user_identify':
				let userInfo: any = {}
				if (userStore.data.email) {
					userInfo.em = userStore.data.email //fb
					userInfo.email = userStore.data.email //tiktok
				}
				if (userStore.data.phone) {
					userInfo.ph = userStore.data.phone.replaceAll(' ', '').replaceAll('+', '') //fb
					userInfo.phone_number = userStore.data.phone.replaceAll(' ', '') //tiktok
				}
				if (window.fbq && window.fbPixel) {
					window.fbq('init', window.fbPixel, userInfo)
				}
				if (window.ttq && window.tiktokPixel) {
					window.ttq.identify(userInfo)
				}
				break
			case 'firstOpen': //首开
				serverEventId = serverEventEnum.ReportType_First_ContentView
				break
			case 'registerButtonClicked': //点击注册按钮
				serverEventId = serverEventEnum.ReportType_Register_Button_Clicked
				break
			case 'first_game_enter': //本账号第一次真玩游戏
				serverEventId = serverEventEnum.ReportType_First_GameEnter
				break
			case 'register': //注册成功
				if (window.uni && window.uni.postMessage) {
					//三方马甲包定制
					HallLog.log('========================uni.postMessage ' + event)
					window.uni.postMessage({
						data: {
							type: 'fb',
							name: 'fb_mobile_complete_registration',
							params: data,
						},
					})
					window.uni.postMessage({
						data: {
							type: 'af',
							name: 'af_complete_registration',
							params: data,
						},
					})
				}
				if (window.jsBridge && window.jsBridge.postMessage) {
					//三方马甲包定制
					HallLog.log('========================window.jsBridge.postMessage ' + event)
					window.jsBridge.postMessage('register', '')
				}
				break
			case 'login': //登录成功
				if (window.uni && window.uni.postMessage) {
					//三方马甲包定制
					HallLog.log('========================uni.postMessage ' + event)
					window.uni.postMessage({
						data: {
							type: 'fb',
							name: 'fb_mobile_login',
							params: data,
						},
					})
					window.uni.postMessage({
						data: {
							type: 'af',
							name: 'af_login',
							params: data,
						},
					})
				}
				break
			case 'login_out': //登出
				break
			case 'recharge': //发起充值
				serverEventId = serverEventEnum.ReportType_Recharge_Button_Clicked
				break
			case 'purchase': //充值成功
				if (window.uni && window.uni.postMessage) {
					//三方马甲包定制
					HallLog.log('========================uni.postMessage ' + event)
					window.uni.postMessage({
						data: {
							type: 'fb',
							name: 'fb_deposit_success',
							valueToSum: data.value,
							params: data,
						},
					})
					window.uni.postMessage({
						data: {
							type: 'af',
							name: 'af_deposit_success',
							params: data, //data里面包含af_revenue
							// params: {
							// 	af_revenue: data.value, //金额
							// }
						},
					})
				}

				if (window.jsBridge && window.jsBridge.postMessage) {
					//三方马甲包定制
					HallLog.log('========================window.jsBridge.postMessage ' + event)
					window.jsBridge.postMessage('recharge', eventString)
				}
				break
			case 'first_purchase': //首充成功
				if (window.uni && window.uni.postMessage) {
					//三方马甲包定制
					HallLog.log('========================uni.postMessage ' + event)
					window.uni.postMessage({
						data: {
							type: 'fb',
							name: 'fb_mobile_purchase',
							valueToSum: data.value,
							params: data,
						},
					})
					window.uni.postMessage({
						data: {
							type: 'af',
							name: 'af_purchase',
							params: data, //data里面包含af_revenue
							// params: {
							// 	af_revenue: data.value, //金额
							// }
						},
					})
				}

				if (window.jsBridge && window.jsBridge.postMessage) {
					//三方马甲包定制
					HallLog.log('========================window.jsBridge.postMessage ' + event)
					window.jsBridge.postMessage('firstrecharge', eventString)
				}
				break
			case 'withdraw': //发起提现
				break
			case 'refund': //提现成功
				break
		}

		if (serverEventId) {
			let body = { event_id: serverEventId }
			useCreateReport(
				{ body },
				(res: any) => {
					HallLog.log('useCreateReport suc', res, body)
				},
				(err: any) => {
					HallLog.error('useCreateReport error', err, body)
				}
			)
		}
	} catch (error) {
		HallLog.error('googleEvent error', error)
	}
}

//根据ga事件名获取facebook事件名
function getFacebookEventName(gaEvent: string) {
	let funcName = 'trackCustom'
	let fbEvent = ''
	const configStore = useSysConfigStore()
	if (configStore.sdkConfig) {
		let facebookKey = 'facebook'
		let facebookConfig = configStore.sdkConfig[facebookKey]
		if (facebookConfig) {
			fbEvent = facebookConfig[gaEvent]
		}
	}

	if (!fbEvent) {
		if (gaEvent == 'register') {
			fbEvent = 'CompleteRegistration'
		} else if (gaEvent == 'purchase') {
			fbEvent = 'Purchase'
		}
	}
	if (!fbEvent) {
		fbEvent = gaEvent
	} else {
		funcName = 'track'
	}
	return { funcName, fbEvent }
}

//根据ga事件名获取kwai事件名
// function getKwaiEventName(gaEvent: string) {
// 	let kwaiEvent = ''
// 	switch (gaEvent) {
// 		case 'contentview':
// 			kwaiEvent = 'contentView' //contentView EVENT_CONTENT_VIEW
// 			break
// 		case 'register':
// 			kwaiEvent = 'completeRegistration' //completeRegistration EVENT_COMPLETE_REGISTRATION
// 			break
// 		case 'purchase':
// 			kwaiEvent = 'purchase' //purchase EVENT_PURCHASE
// 			break
// 		case 'first_purchase':
// 			kwaiEvent = 'firstDeposit' //firstDeposit EVENT_FIRST_DEPOSIT
// 			break
// 	}
// 	return kwaiEvent
// }

//根据ga事件名获取tiktok事件名
function getTiktokEventName(gaEvent: string) {
	let tiktokEvent = ''
	const configStore = useSysConfigStore()
	if (configStore.sdkConfig) {
		let tiktokKey = 'tiktok'
		let tiktokConfig = configStore.sdkConfig[tiktokKey]
		if (tiktokConfig) {
			tiktokEvent = tiktokConfig[gaEvent]
		}
	}

	if (!tiktokEvent) {
		if (gaEvent == 'register') {
			tiktokEvent = 'CompleteRegistration'
		} else if (gaEvent == 'purchase') {
			tiktokEvent = 'CompletePayment'
		}
	}
	if (!tiktokEvent) {
		tiktokEvent = gaEvent
	}
	return tiktokEvent
}

//导入firebase库
function initFirebaseApp() {
	if (!FirebaseApp) {
		return new Promise((resolve, reject) => {
			import('firebase/app').then((res) => {
				FirebaseApp = res
				window.initializeApp = res.initializeApp
				resolve(FirebaseApp)
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			resolve(FirebaseApp)
		})
	}
}

//导入firebase库
function initFirebaseFnc() {
	if (!FirebaseFnc) {
		return new Promise((resolve, reject) => {
			import('firebase/analytics').then((res) => {
				FirebaseFnc = res
				window.setUserProperties = res.setUserProperties
				window.setUserId = res.setUserId
				window.getAnalytics = res.getAnalytics
				window.logEvent = res.logEvent
				resolve(FirebaseFnc)
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			resolve(FirebaseFnc)
		})
	}
}

//初始化官方firebase
export async function initFirebaseGlobal() {
	//firebase 官方firebase
	//测试服
	// const firebaseConfig = {
	//     apiKey: "AIzaSyAqEZ8-kg0JS8FpyIe33NHnSwpGIGDLD74",
	//     authDomain: "afun-webtest.firebaseapp.com",
	//     projectId: "afun-webtest",
	//     storageBucket: "afun-webtest.appspot.com",
	//     messagingSenderId: "299825496898",
	//     appId: "1:299825496898:web:a6319f7d9aeb44d6c5bedb",
	//     measurementId: "G-GL2SGYSQDG"
	// };
	//正式服
	// const firebaseConfig = {
	//     apiKey: "AIzaSyBoCHHS8Us7yFMQg6iRND5ciD2-SkStzG4",
	//     authDomain: "afun-global.firebaseapp.com",
	//     projectId: "afun-global",
	//     storageBucket: "afun-global.appspot.com",
	//     messagingSenderId: "1012402907742",
	//     appId: "1:1012402907742:web:f31533d06fab035807e2cf",
	//     measurementId: "G-0ZZ14R97MY"
	// };
	//Afun-GA-web
	// const firebaseConfig = {
	// 	apiKey: "AIzaSyAI08Th8eiOp4iT2YOwjUqkdxZznhRMHEI",
	// 	authDomain: "afun-ga.firebaseapp.com",
	// 	projectId: "afun-ga",
	// 	storageBucket: "afun-ga.appspot.com",
	// 	messagingSenderId: "987811382051",
	// 	appId: "1:987811382051:web:64d54d85d3879f5bb80296",
	// 	measurementId: "G-PHF3NXTXJG"
	//   };
	// HallLog.log('global firebase analytics');
	// await initFirebaseApp();
	// await initFirebaseFnc();
	// const app = initializeApp(firebaseConfig, '[analytics]');
	// window.firebaseAnalytics = getAnalytics(app);
	// window.firebaseSendTo = firebaseConfig.measurementId
	// window.firebaseLogEvent = logEvent;
	// HallLog.log('global firebase init success');
}

//初始化渠道firebase
export async function initFirebaseChannel() {
	const configStore = useSysConfigStore()
	let jsonObject: any = configStore.sdkConfig
	let firebaseKey = 'firebase'
	let firebaseConfig = jsonObject[firebaseKey]

	if (!window.channelAnalytics) {
		if (firebaseConfig) {
			HallLog.log('firebase analytics')
			await initFirebaseApp()
			await initFirebaseFnc()
			const app = window.initializeApp(firebaseConfig, '[analytics-ch]')
			window.channelAnalytics = window.getAnalytics(app)
			window.firebaseChannelSendTo = firebaseConfig.measurementId
			window.logEvent = window.logEvent
			HallLog.log('firebase init success')
		} else {
			HallLog.log('firebase init failed')
		}
	}
}

//导入Adjust库
export async function initAdjust() {
	if (!Adjust) {
		return new Promise((resolve, reject) => {
			import('@adjustcom/adjust-web-sdk').then((res) => {
				Adjust = res.default
				resolve(Adjust)
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			resolve(Adjust)
		})
	}
}

//初始化渠道adjust
export async function initAdjustChannel() {
	const configStore = useSysConfigStore()
	let jsonObject: any = configStore.sdkConfig
	let adjustKey = 'adjust'
	let adjustConfig = jsonObject[adjustKey]

	if (adjustConfig) {
		window.adjustConfig = adjustConfig
		window.adjustAppToken = adjustConfig['appKey']
		HallLog.log('adjust web init appToken:' + window.adjustAppToken)
		await initAdjust()
		Adjust.initSdk({
			appToken: window.adjustAppToken,
			// logLevel: 'verbose',//日志级别
			environment: 'production', //sandbox production
		})
		HallLog.log('adjust web init success appToken:' + window.adjustAppToken)

		setTimeout(() => {
			const webUUID = Adjust.getWebUUID()
			HallLog.log('adjust webUUID:' + webUUID)
		}, 1000)
	}
}

//初始化渠道sdk
export function initChannelSdk() {
	try {
		// window.addEventListener('maxconv:ready', function () {
		// 	//maxconv is ready
		// 	//get current click id
		// 	let maxconv_click_id = window.maxconv.getClickId()
		// 	HallLog.log('maxconv_click_id:' + maxconv_click_id)
		// 	if (maxconv_click_id) {
		// 		maxconvSdkData['maxconv_click_id'] = maxconv_click_id
		// 		const urlCodes = vueStorage(StorageKey.UrlCodes, {})
		// 		urlCodes.value['maxconv_click_id'] = maxconv_click_id
		// 	}
		// })

		// if (resConfig['maxconv'] && resConfig['maxconv']['status']) {
		// 	let maxconvObj = resConfig['maxconv']
		// 	useHead({
		// 		script: [
		// 			{
		// 				src: maxconvObj['script'],
		// 			},
		// 		],
		// 	})

		// 	maxconvSdkData['maxconv_api_domain'] = maxconvObj['api_domain']
		// 	maxconvSdkData['maxconv_secret'] = maxconvObj['secret']
		// }

		const configStore = useSysConfigStore()

		let general_ext_code = configStore.checkVersionConfig.general_ext_code
		if (general_ext_code) {
			//总代配置
			let codeStr = general_ext_code
			if (!codeStr.startsWith('{')) {
				codeStr = decodeURIComponent(codeStr)
			}

			HallLog.log('initGeneralSdk:' + codeStr)
			let ext_code = JSON.parse(codeStr)
			initChannelCodes(ext_code)
		}

		let pack_ext_code = configStore.checkVersionConfig.pack_ext_code
		if (pack_ext_code) {
			//渠道配置
			let codeStr = pack_ext_code
			if (!codeStr.startsWith('{')) {
				codeStr = decodeURIComponent(codeStr)
			}
			HallLog.log('initChannelSdk:' + codeStr)
			let ext_code = JSON.parse(codeStr)
			initChannelCodes(ext_code)
		}
	} catch (error) {
		HallLog.error('initChannelSdk error:' + error)
	}
}

//初始化sdk结束
export function initSdkEnd() {
	//--首开
	const firstOpen = vueStorage(StorageKey.FIRST_OPEN, 0)
	if (firstOpen.value == 0) {
		firstOpen.value = 1
		//GA首开
		googleEvent({ event: 'firstOpen', event_type: 'af_firstOpen' })
	}

	//前端上报：kwai打开页面
	// if (window.kwaiPixel) {
	// 	googleEvent({ event: 'contentview', sendType: 2 })
	// }

	//--打开页面
	useUploadContentView(
		{ body: {} },
		(res: any) => {
			HallLog.log('useUploadContentView suc', res)
		},
		(err: any) => {
			HallLog.error('useUploadContentView error', err)
		}
	)

	setTimeout(() => {
		saveCookieExtraData()
		updateMediaSource()
		googleUserProperty({ media_source: useUrlMediaSource().value['atype'] })
	}, 5000)
}

//初始化新运营后台-渠道统计代码
function initChannelCodes(jsonCodes: any) {
	let channelSdkCode = jsonCodes
	if (typeof channelSdkCode == 'string') {
		HallLog.log('initChannelCodes:' + channelSdkCode)
		channelSdkCode = JSON.parse(channelSdkCode)
	}
	HallLog.log('channelSdkCode', channelSdkCode)

	const configStore = useSysConfigStore()
	configStore.sdkConfig = {}
	let otherObj = channelSdkCode['other'] || {}
	if (otherObj['status']) {
		if (otherObj['json_object']) {
			configStore.sdkConfig = JSON.parse(otherObj['json_object'])
			HallLog.log('initChannelCodes other', configStore.sdkConfig)

			let key = 'script'
			let scriptArr = configStore.sdkConfig[key]
			if (scriptArr) {
				scriptArr.forEach((ele: string) => {
					useHead({
						script: [
							{
								src: ele,
							},
						],
					})
				})
			}
		}
	}
	let key = 'facebook'
	if (channelSdkCode[key]) {
		let facebookObj = channelSdkCode[key]
		configStore.sdkConfig[key] = {}
		if (facebookObj['status']) {
			let fbPixel = facebookObj['pixel_id']
			initFacebook(fbPixel)

			if (facebookObj['token'].length >= 10) {
				fbSdkData['fb_access_token'] = facebookObj['token']
			}
			if (facebookObj['event_purchase'] == 0) {
				//跑【首充】
				configStore.sdkConfig[key]['purchase'] = 'DepositSuccess'
				configStore.sdkConfig[key]['first_purchase'] = 'Purchase'
				configStore.sdkConfig[key]['top_purchase'] = 'top_purchase'
			} else if (facebookObj['event_purchase'] == 1) {
				//跑【充值】
				configStore.sdkConfig[key]['purchase'] = 'Purchase'
				configStore.sdkConfig[key]['first_purchase'] = 'first_purchase'
				configStore.sdkConfig[key]['top_purchase'] = 'top_purchase'
			} else {
				//跑【一级首充】
				configStore.sdkConfig[key]['purchase'] = 'DepositSuccess'
				configStore.sdkConfig[key]['first_purchase'] = 'first_purchase'
				configStore.sdkConfig[key]['top_purchase'] = 'Purchase'
			}

			let purchaseObj = getFacebookEventName('purchase')
			fbSdkData['fb_purchase_event'] = purchaseObj?.fbEvent
			let first_purchaseObj = getFacebookEventName('first_purchase')
			fbSdkData['fb_first_purchase_event'] = first_purchaseObj?.fbEvent
			let top_purchaseObj = getFacebookEventName('top_purchase')
			fbSdkData['fb_top_purchase_event'] = top_purchaseObj?.fbEvent
			// let withdrawObj = getFacebookEventName('refund')
			// fbSdkData['fb_withdraw_event'] = withdrawObj?.fbEvent
		}
	}

	key = 'kwai'
	if (channelSdkCode[key]) {
		let kwaiObj = channelSdkCode[key]

		if (kwaiObj['status']) {
			kwaiSdkData['kwai_track_flag'] = useUrlTest().value || useAppEnv().value > 0 ? 1 : 0
			if (kwaiObj['token']) {
				kwaiSdkData['kwai_access_token'] = kwaiObj['token']

				// if (kwaiObj['event_purchase'] == 1) {
				// 	//跑【充值】
				// 	kwaiSdkData['kwai_purchase_event'] = 'EVENT_PURCHASE'
				// 	kwaiSdkData['kwai_first_purchase_event'] = 'EVENT_FIRST_DEPOSIT'
				// } else {
				// 	//跑【首充】
				// 	kwaiSdkData['kwai_purchase_event'] = 'EVENT_FIRST_DEPOSIT'
				// 	kwaiSdkData['kwai_first_purchase_event'] = 'EVENT_PURCHASE'
				// }
			}
		}
	}

	key = 'tiktok'
	if (channelSdkCode[key]) {
		let tiktokObj = channelSdkCode[key]
		configStore.sdkConfig[key] = {}
		if (tiktokObj['status']) {
			let tiktokPixel = tiktokObj['pixel_id']
			initTiktok(tiktokPixel)

			if (tiktokObj['token'].length >= 10) {
				tiktokSdkData['tt_access_token'] = tiktokObj['token']
			}
			if (tiktokObj['event_purchase'] == 0) {
				//跑【首充】
				configStore.sdkConfig[key]['purchase'] = 'DepositSuccess'
				configStore.sdkConfig[key]['first_purchase'] = 'CompletePayment'
				configStore.sdkConfig[key]['top_purchase'] = 'top_purchase'
			} else if (tiktokObj['event_purchase'] == 1) {
				//跑【充值】
				configStore.sdkConfig[key]['purchase'] = 'CompletePayment'
				configStore.sdkConfig[key]['first_purchase'] = 'first_purchase'
				configStore.sdkConfig[key]['top_purchase'] = 'top_purchase'
			} else {
				//跑【一级首充】
				configStore.sdkConfig[key]['purchase'] = 'DepositSuccess'
				configStore.sdkConfig[key]['first_purchase'] = 'first_purchase'
				configStore.sdkConfig[key]['top_purchase'] = 'CompletePayment'
			}

			let purchaseEvent = getTiktokEventName('purchase')
			tiktokSdkData['tt_purchase_event'] = purchaseEvent
			let first_purchaseEvent = getTiktokEventName('first_purchase')
			tiktokSdkData['tt_first_purchase_event'] = first_purchaseEvent
			let top_purchaseEvent = getTiktokEventName('top_purchase')
			tiktokSdkData['tt_top_purchase_event'] = top_purchaseEvent
		}
	}

	key = 'ga'
	if (channelSdkCode[key]) {
		let gaObj = channelSdkCode[key]
		if (gaObj['status']) {
			let gaID = gaObj['GA_id']
			initGA(gaID)
			window.channel_send_to = gaID
		}
	}

	key = 'gtm'
	if (channelSdkCode[key]) {
		let gtmObj = channelSdkCode[key]
		if (gtmObj['status']) {
			let gtmID = gtmObj['gtm_id']
			initGTM(gtmID)
		}
	}
}
