import EventDispatcher from '../../event/EventDispatcher'
import Global from '../../Global'
import CheckHelper from './CheckHelper'
import HallBroadcastHelper from './HallBroadcastHelper'
import { HallErrorHelper } from './HallErrorHandler'
import HallHeartbeatHelper from './HallHeartbeatHelper'
import { HttpNetExtraData } from './HttpNetExtraData'
import { NetLogin, NetOnline } from './NetEvent'

export default class HallServer extends EventDispatcher {
	//通信组件
	internalEvent = new EventDispatcher()
	//通用协议错误处理
	errorHandler = new HallErrorHelper()
	//数据缓存
	dataCache = {}
	//网络延迟
	checkHelper = new CheckHelper()
	//广播组件
	broadcastHelper = new HallBroadcastHelper(this, this.internalEvent)
	//心跳对象
	heartbeatHelper = new HallHeartbeatHelper(this, this.internalEvent)

	setup() {
		this.heartbeatHelper._initHeartBeatData()
	}

	onUpdate(dt) {
		if (this.heartbeatHelper && this.heartbeatHelper.onUpdate) {
			this.heartbeatHelper.onUpdate(dt)
		}
	}

	run() {
		Global.Http.onRegister('hallserver', this.onUpdate.bind(this))
		this.heartbeatHelper.run()
	}
	stop() {
		this.clearAllCache()
		this.heartbeatHelper.stop()
	}
	clearAllCache() {
		this.dataCache = {}
	}

	//发送到login进程
	sendToLoginServer(mod, func, param, onComplete = null, errorHandler = null) {
		let serverRoutes = Global.Setting.Urls.hallRoutes //globalRoutes;
		let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
		let suffix = '/login/' + paramPrefix + (mod == NetLogin.root ? func : mod) + '?' + Global.Toolkit.getUrlCommonParam()
		let serverData = this._getMsgParam(mod, func, param, true)
		let extraData = this._createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler)
		this._sendInternal(extraData)
	}

	//通用http协议请求
	send(mod, func, param, onComplete = null, errorHandler = null, cache = 0, extra = '') {
		if (mod == NetLogin.login || mod == NetLogin.root || mod == NetLogin.verifycode) {
			this.sendToLoginServer(mod, func, param, onComplete, errorHandler)
			return
		}
		let serverRoutes = Global.Setting.Urls.hallRoutes //globalRoutes;
		let suffix = Global.Setting.Urls.hallUrlSuffix
		let serverData = this._getMsgParam(mod, func, param)
		suffix = Global.Toolkit.formatStr(suffix, mod, func)
		suffix += extra
		let extraData = this._createNetExtraData(serverRoutes, suffix, func, serverData, onComplete, errorHandler, cache)
		this._sendInternal(extraData)
	}

	//心跳包
	sendHeartBeat(mod, key, param, onComplete = null, errorHandler = null, cache = 0, extra = '') {
		let serverRoutes = Global.Setting.Urls.hallRoutes //globalRoutes;
		let suffix = Global.Setting.Urls.hallUrlSuffix
		let serverData = this._getMsgParam(mod, key, param)
		suffix = Global.Toolkit.formatStr(suffix, mod, key)
		suffix += extra
		let extraData = this._createNetExtraData(serverRoutes, suffix, key, serverData, onComplete, errorHandler, cache)
		this._sendInternal(extraData)
	}

	_getParamStr(param) {
		if (param._param) {
			return ''
		}
		return JSON.stringify(param._param)
	}

	_sendInternal(extraData = null) {
		if (extraData == null) {
			console.error('HallServer _sendInternal extraData = null')
			return
		}
		if (extraData.cache != 0 && this.dataCache) {
			let key = extraData.funcName + '_' + this._getParamStr(extraData.param)
			let cache = this.dataCache[key]
			if (cache && cache.time && cache.msg) {
				let Dates = new Date()
				if (extraData.cache <= 10000) {
					//按时效缓存
					if (Dates.getTime() - cache.time.getTime() < extraData.cache * 1000) {
						this.onMessage(cache.msg, extraData)
						return
					} else {
						this.dataCache[key] = null
					}
				} else if (extraData.cache == 10001) {
					//按天缓存,并且在有效期内,需要检查月和日
					if (Dates.getMonth() == cache.time.getMonth() && Dates.getDate() == cache.time.getDate()) {
						this.onMessage(cache.msg, extraData)
						return
					} else {
						this.dataCache[key] = null
					}
				}
			}
		}

		this.checkHelper.updateChecker()
		extraData.param._check = this.checkHelper.getNomalChecker()

		if (extraData.url) {
			extraData.url.suffix = Global.UrlUtil.refreshSuffixRetryTime(extraData.url.suffix, extraData.retryTimes)
		}

		Global.Http.send(
			extraData.url,
			extraData.param,
			(msg) => {
				if (this.onMessage(msg, extraData) && extraData.cache != 0) {
					let key = extraData.funcName + '_' + this._getParamStr(extraData.param)
					let cache = {}
					cache.time = new Date()
					cache.msg = msg
					this.dataCache[key] = cache
				}
			},
			() => {
				this.onMessageError(extraData)
			}
		)
	}

	//指定当前线路url
	_createNetExtraDataByUrl(
		serverRoutes,
		url,
		suffix,
		funcName,
		serverData,
		onComplete,
		errorHandler,
		cache = 0,
		isParallelReq = false,
		lineIndex = 0
	) {
		if (serverRoutes == null) {
			console.error('HallServer _createNetExtraDataByUrl serverroutes is null', funcName, suffix)
			return
		}
		let extraData = new HttpNetExtraData()
		extraData.param = serverData
		extraData.onComplete = onComplete
		extraData.errorHandler = errorHandler
		extraData.funcName = funcName
		extraData.serverRoutes = serverRoutes
		extraData.suffix = suffix
		extraData.isParallelReq = isParallelReq
		extraData.lineIndex = lineIndex

		if (isParallelReq) {
			extraData.retryTotalTime = 1
		} else {
			extraData.retryTotalTime = serverRoutes.length > 3 ? serverRoutes.length : 3
		}

		extraData.url = url
		if (url) {
			url.suffix = url.suffix + suffix
		}
		extraData.cache = cache
		return extraData
	}

	_createNetExtraData(serverRoutes, suffix, funcName, serverData, onComplete, errorHandler, cache = 0, isParallelReq = false) {
		if (serverRoutes == null) {
			console.error('HallServer _createNetExtraData serverroutes is null', funcName, suffix)
			return
		}
		let url = null
		let curRoute = serverRoutes.getCurRoute()
		if (curRoute) {
			let serverUrl = curRoute.getUrl()
			url = serverUrl
		} else {
			console.error('HallServer _createNetExtraData extraData.url curRoute is null !!!')
		}
		let extraData = this._createNetExtraDataByUrl(serverRoutes, url, suffix, funcName, serverData, onComplete, errorHandler, cache, isParallelReq)
		return extraData
	}

	_getMsgParam(mod, func, param, useMode = false, check = '') {
		let msg = {}
		if (useMode) {
			msg._mod = mod
			msg._func = func
		}
		msg._param = param ? param : {}
		msg._check = check
		return msg
	}

	onMessage(msg, extraData) {
		let serverObj = null
		let content = null
		if (extraData.funcName == NetOnline.HeartBeat) {
			Global.Setting.Urls.sortHallRoutes()
		} else if (extraData.suffix.indexOf('login') > -1) {
			Global.Setting.Urls.sortLoginRoutes()
		}
		try {
			content = Global.AESUtil.decodeMsg(msg)
			serverObj = JSON.parse(content)
		} catch (error) {
			this.onMessageError(extraData)
			return
		}

		if (!this.errorHandler.handleError(serverObj, extraData.errorHandler)) {
			return
		}
		if (extraData.onComplete != null) {
			extraData.onComplete(serverObj._param)
		} else if (serverObj._func == NetOnline.HeartBeat) {
			this.heartbeatHelper.onHeartBeat(serverObj._param)
		} else {
			console.error('HallServer onMessage: not exist onComplete func = ' + extraData.funcName)
		}
		return true
	}

	onMessageError(extraData) {
		extraData.retryTimes++
		let isChangeServer = false
		//心跳\登录相关 请求异常的话,触发切换线路
		if (extraData.funcName == NetOnline.HeartBeat || extraData.suffix.indexOf('login') > -1) {
			console.error('HallServer onMessageError: change server')
			isChangeServer = true
			extraData.serverRoutes.changeToAnotherRoute()
		}

		//心跳不重连
		if (extraData.funcName == NetOnline.HeartBeat) {
			return
		}

		extraData.refreshUrl()
		//小于重连次数 则重新发送
		if (extraData.retryTimes < extraData.retryTotalTime) {
			//防止断网时回调太快
			setTimeout(() => {
				this._sendInternal(extraData)
			}, 500)
			return
		} else {
			if (extraData.errorHandler) {
				extraData.errorHandler({ _errno: -1, _errstr: 'Connection timed out. Please check your network and try again' })
			}
		}
	}
}
