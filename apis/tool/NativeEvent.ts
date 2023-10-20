import HallLog from '../debug/HallLog'
import SyncJSBridge from './SyncJSBridge'

export default class NativeEvent {
	static instance = new NativeEvent()
	private callbackArray: Array<any> = []
	private _syncBridge = new SyncJSBridge() //同步原生交互桥

	/**
	 * 异步调用原生方法
	 * @param {*} funcName 方法名
	 * @param {*} funcParam 所需要的参数
	 * @param {*} callback 回调函数
	 */
	nativeCallAsync(funcName = '', funcParam = null, callback = null) {
		this.callbackArray.push({ funcName: funcName, callback: callback })
		let paramsObj = { funcName: funcName, funcParam: JSON.stringify(funcParam) }
		let paramJson = JSON.stringify(paramsObj)
		this._syncBridge.asyncCall(paramJson)
	}

	/**
	 * 异步 原生回调JS
	 * @param returnStr
	 * @returns
	 */
	NativeCallBackAsync(returnStr: string) {
		HallLog.log('NativeCallBackAsync returnStr ' + returnStr)
		if (returnStr) {
			let returnJsonObj
			try {
				returnJsonObj = JSON.parse(returnStr)
			} catch (error) {
				HallLog.error('JSON.parse failed:', returnStr)
				return
			}
			let index
			for (let i = 0; i < this.callbackArray.length; i++) {
				let element = this.callbackArray[i]
				if (returnJsonObj.funcName == element.funcName) {
					index = i
					let mCallback = element.callback
					if (mCallback) {
						mCallback(returnJsonObj)
					} else {
						HallLog.log('call is null', element.funcName, 'return name', returnJsonObj.funcName)
					}
				} else {
					HallLog.log('element.funcName', element.funcName, 'return name', returnJsonObj.funcName)
				}
			}
			if (index != null && index != undefined) {
				this.callbackArray.splice(index, 1)
			}
		} else {
			HallLog.log('-----------native has no return-----')
		}
	}

	/**
	 * 同步调用原生的方法
	 * @param {*} funcName 调用原生的方法名
	 * @param {*} funcParam 调用原生方法需要带的参数
	 * @param {*} callback 调用原生方法后的回调
	 */
	nativeCallSync(funcName = '', funcParam = null, callback = null) {}

	/**************************************************************同步获取参数************************************************/
	/**
	 * 原生关闭闪屏页
	 */
	hideSplashView() {
		this._syncBridge.hideSplashView()
		if (window.jsBridge && window.jsBridge.postMessage) {
			//三方马甲包定制
			window.jsBridge.postMessage('closeHealth', '')
		}
	}
	/**
	 * 原生打开闪屏页
	 */
	showSplashView() {
		this._syncBridge.showSplashView()
	}
	/**
	 * 原生打开浏览器指定url页面
	 * @param url
	 */
	openAppBrowser(url: string) {
		this._syncBridge.openAppBrowser(url)
	}

	/**
	 * 获取原生相关上报key
	 */
	getSdkData() {
		return this._syncBridge.getSdkData()
	}
	/**************************************************************原生gamewebview外接游戏************************************************/
	//打开外接游戏webview
	openSubGameView(param: string) {
		let ret = this._syncBridge.openSubGameView(param)
		return ret
	}
	//获取外接游戏webview的状态
	getSubGameState(param = '') {
		let ret = this._syncBridge.getSubGameState(param)
		return ret
	}
	//设置外接游戏webview的状态
	setSubGameState(param = '') {
		let ret = this._syncBridge.setSubGameState(param)
		return ret
	}

	/**************************************************************Appsflyer应用内事件************************************************/
	//appsflyer应用内事件上报
	appsFlyerEvent(param: string, funcName: string) {
		if (!funcName) {
			funcName = 'appsFlyerEvent'
		}
		HallLog.log('========================appsFlyerEvent funcName:' + funcName, param)
		let ret = this._syncBridge.appsFlyerEvent(param, funcName)
		return ret
	}
}
