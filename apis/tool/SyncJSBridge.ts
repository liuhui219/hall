/****
 * 原生接口桥接类
 * ****/
export default class SyncJSBridge {
	private _jsBridge: any = null

	/***************************private**********************************/
	private _checkNativeObject() {
		if (this._getNativeObject()) {
			return true
		}
		return false
	}

	private _getNativeObject() {
		if (!this._jsBridge) {
			this._jsBridge = window.jsbridge || null
			if (!this._jsBridge) {
				return
			}
		}
		return this._jsBridge
	}

	/***************************public**********************************/
	_excuteIosFunc(funcName: string, params = '') {
		if (!prompt) {
			return
		}
		if (!funcName) {
			return
		}
		if (params == null || params == undefined) {
			params = ''
		}
		let type = 'JSbridge'
		let payload = { type: type, funcName: funcName, params: params }
		let res = prompt(JSON.stringify(payload))
		return res
	}

	/**
	 * 异步调用
	 * @param {*} paramJson
	 * @returns
	 */
	asyncCall(paramJson: string) {
		if (isIosApp()) {
			if (
				window.webkit &&
				window.webkit.messageHandlers &&
				window.webkit.messageHandlers.asyncCall &&
				window.webkit.messageHandlers.asyncCall.postMessage
			) {
				window.webkit.messageHandlers.asyncCall.postMessage(paramJson)
			}
		} else if (isAndroidApp()) {
			if (!this._checkNativeObject()) {
				return
			}
			if (this._jsBridge && this._jsBridge.asyncCall) {
				return this._jsBridge.asyncCall(paramJson)
			}
		}
	}

	/**
	 * 隐藏闪屏页
	 */
	hideSplashView() {
		if (isIosApp()) {
			this._excuteIosFunc('hideSplashView')
		} else if (isAndroidApp()) {
			if (!this._checkNativeObject()) {
				return
			}
			if (this._jsBridge && this._jsBridge.hideSplashView) {
				this._jsBridge.hideSplashView()
			}
		}
	}

	/**
	 * 显示闪屏页
	 */
	showSplashView() {
		if (isIosApp()) {
			this._excuteIosFunc('showSplashView')
		} else if (isAndroidApp()) {
			if (!this._checkNativeObject()) {
				return
			}
			if (this._jsBridge && this._jsBridge.showSplashView) {
				this._jsBridge.showSplashView()
			}
		}
	}

	/**
	 * 打开App浏览器
	 * @param {*}
	 * @returns
	 */
	openAppBrowser(url: string) {
		if (isIosApp()) {
			let params = { url: url }
			this._excuteIosFunc('openAppBrowser', JSON.stringify(params))
		} else if (isAndroidApp()) {
			if (!this._checkNativeObject()) {
				return
			}
			if (this._jsBridge && this._jsBridge.openAppBrowser) {
				this._jsBridge.openAppBrowser(url)
			}
		}
	}

	/**
	 * 打开外接游戏webview
	 * @param {*} null
	 * @returns json string
	 */
	openSubGameView(param: string) {
		if (isIosApp()) {
			return this._excuteIosFunc('openSubGameView', param)
		} else if (isAndroidApp()) {
			if (!this._checkNativeObject()) {
				return
			}

			if (this._jsBridge && this._jsBridge.openSubGameView) {
				let parms = this._jsBridge.openSubGameView(param)
				return parms
			}
		}
	}

	/**
	 * 获取外接游戏webview的状态
	 * @param {*} null
	 * @returns json string
	 */
	getSubGameState(param: string) {
		if (isIosApp()) {
			return this._excuteIosFunc('getSubGameState', param)
		} else if (isAndroidApp()) {
			if (!this._checkNativeObject()) {
				return
			}

			if (this._jsBridge && this._jsBridge.getSubGameState) {
				let parms = this._jsBridge.getSubGameState(param)
				return parms
			}
		}
	}

	/**
	 * 设置外接游戏webview的状态
	 * @param {*} null
	 * @returns json string
	 */
	setSubGameState(param: string) {
		if (isIosApp()) {
			return this._excuteIosFunc('setSubGameState', param)
		} else if (isAndroidApp()) {
			if (!this._checkNativeObject()) {
				return
			}

			if (this._jsBridge && this._jsBridge.setSubGameState) {
				let parms = this._jsBridge.setSubGameState(param)
				return parms
			}
		}
	}

	getSdkData() {
		if (isIosApp()) {
			// return this._excuteIosFunc('getSdkData', '')
		} else if (isAndroid()) {
			//此接口用于马甲包，只需要判断安卓即可
			if (!this._checkNativeObject()) {
				return ''
			}

			if (this._jsBridge && this._jsBridge.getSdkData) {
				let parms = this._jsBridge.getSdkData()
				return parms
			}
		}
		return ''
	}

	/**
	 * appsflyer应用内事件
	 * @param {*} null
	 * @returns json string
	 */
	appsFlyerEvent(param: string, funcName: string) {
		if (isIosApp()) {
			return this._excuteIosFunc(funcName, param)
		} else if (isAndroid()) {
			//此接口用于马甲包，只需要判断安卓即可
			if (!this._checkNativeObject()) {
				return
			}

			if (this._jsBridge && this._jsBridge[funcName]) {
				let parms = this._jsBridge[funcName](param)
				return parms
			}
		}
	}
}
