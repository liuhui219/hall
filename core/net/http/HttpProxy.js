import Global from '../../Global'
import HttpRequest from './HttpRequest'

let HttpTimer = null
export default class HttpProxy {
	static Interval = 20 //轮询时间间隔
	static HttpTimeout = 15000
	cookie = ''
	reqList = []

	//全局定时器
	timerMap

	constructor() {}

	setup() {
		if (HttpTimer) {
			HttpTimer = null
		}
		HttpTimer = setInterval(() => {
			this.startPolling()
			this.onUpdate()
		}, HttpProxy.Interval)
	}

	//注册全局定时回调函数
	onRegister(type, updateFunc) {
		if (!this.timerMap) {
			this.timerMap = {}
		}
		if (this.timerMap[type]) {
			console.error('HttpProxy onRegister repeat, type:' + type)
			return
		} else {
			this.timerMap[type] = {
				onUpdate: updateFunc,
				typs: type,
			}
		}
	}

	//反注册全局定时回调函数
	unRegister(type) {
		if (this.timerMap[type]) {
			this.timerMap[type] = null
			delete this.timerMap[type]
		}
	}

	onUpdate() {
		if (this.timerMap === {}) {
			return
		} else {
			for (let key in this.timerMap) {
				let item = this.timerMap[key]
				if (item && item['onUpdate'] && item['onUpdate'] instanceof Function) {
					let callBack = item['onUpdate']
					callBack(HttpProxy.Interval / 1000)
				}
			}
		}
	}

	startPolling() {
		let reqModel = this.reqList.shift()
		if (reqModel) {
			let url = reqModel['url']
			let msg = reqModel['msg']
			let reqType = reqModel['reqType']
			let onComplete = reqModel['onComplete']
			let onError = reqModel['onError']
			let timeout = reqModel['timeout']
			let req = new HttpRequest()
			req.on(HttpRequest.EVENT_COMPLETE, this, onComplete)
			req.on(HttpRequest.EVENT_ERROR, this, onError)
			req.setTimeout(timeout)

			msg == msg ? msg : ''
			let encrptedMsg = msg
			if (url.isEncrptParam && msg) {
				encrptedMsg = Global.AESUtil.aesEncrptMsg(msg)
			}
			req.send(url, encrptedMsg, reqType)
		}
	}

	pushReqListModel(url, msg, reqType, onComplete, onError, timeout) {
		let reqModel = {}
		reqModel['url'] = url
		reqModel['msg'] = msg
		reqModel['reqType'] = reqType
		reqModel['onComplete'] = (msg) => {
			if (onComplete) {
				onComplete(msg)
			}
		}
		reqModel['onError'] = onError
		reqModel['timeout'] = timeout
		this.reqList[this.reqList.length] = reqModel
	}

	send(url, param, onComplete, onError) {
		let msg = this.getSendContent(param)
		this.pushReqListModel(
			url,
			msg,
			'post',
			onComplete,
			(http, hTime) => {
				this.sendError(http, url, onError, hTime)
			},
			HttpProxy.HttpTimeout
		)
	}

	sendError(http, url, onError, hTime = 0) {
		this.onHttpError(http, url, hTime)
		if (onError) {
			onError()
			onError = null
		}
	}

	onHttpError(http, serverUrl, hTime) {
		if (!http || !serverUrl) {
			console.error('HttpProxy onHttpError http  || url = null')
			return
		}
		let httpStatus = http.status
		let needReload = false

		//重定向
		if (httpStatus == 308 || httpStatus == 307 || httpStatus == 302) {
			let cookie = http.getResponseHeader('Set-Cookie')
			if (cookie) {
				let cookieStrArray = cookie.split(';')
				if (cookieStrArray && cookieStrArray.length > 0) {
					let cookieStr = cookieStrArray[0]
					if (cookieStr && cookieStr.length > 0) {
						cookieStr = cookieStr.trim()
						this.cookie = cookieStr
						console.error('HttpProxy httpStatus' + httpStatus + ' set cookie = ' + this.cookie)
					}
				}
			}
		}
		return needReload
	}

	getSendContent(param) {
		if (param == null || param == '') {
			return null
		}
		if (typeof param == 'string') {
			return param
		}
		return JSON.stringify(param)
	}
}
