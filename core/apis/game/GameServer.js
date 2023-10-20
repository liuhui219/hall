import EventDispatcher from '../../event/EventDispatcher'
import Global from '../../Global'
import CheckHelper from '../hall/CheckHelper'
import CallbackHandlerHelper from './serverHelper/CallbackHandlerHelper'
import GameErrorHelper from './serverHelper/GameErrorHelper'
import GameHeartBeatHelper from './serverHelper/GameHeartBeatHelper'
import HandlerHelper from './serverHelper/HandlerHelper'
import ReconnectHelper from './serverHelper/ReconnectHelper'
import SocketHelper from './serverHelper/SocketHelper'

export class MessageState {
	static IgnoreAll = 0 //在收到自己leave  到发送enter之间  收到的协议全部忽略
	static PassSSSAndEnter = 1 //只接收sss（正常流程）和    enter（主要处理enter失败） add wait_match(pvp进桌前匹配玩家)
	static PassAll = 2 //接收所有协议
}
export class GameCommand {
	static Session = '*sss*'
	static Enter = '*en1*'
	static Leave = '*lee*'
	static HeartBeat = '*he1*' //心跳
	static GameCfg = 'a'

	// enter 前的匹配
	static WaitMatch = 'wait_match'
}

export default class GameServer extends EventDispatcher {
	//游戏socket链接成功
	static EVENT_SOCKET_OPEN = 'EVENT_SOCKET_OPEN'
	//游戏socket关闭
	static EVENT_SOCKET_CLOSE = 'EVENT_SOCKET_CLOSE'
	//游戏socket异常
	static EVENT_SOCKET_CONNECT_ERROR = 'EVENT_SOCKET_CONNECT_ERROR'
	//游戏重连成功
	static EVENT_SOCKET_RECONNECT_SUC = 'EVENT_SOCKET_RECONNECT_SUC'
	//游戏重连失败N次
	static EVENT_SOCKET_RECONNECT_ERROR = 'EVENT_SOCKET_RECONNECT_ERROR'
	//错误事件
	static EVENT_SOCKET_ERROR_MSG = 'EVENT_SOCKET_ERROR_MSG'
	//游戏内部强制重连
	static EVENT_CALL_RECONNECT = 'EVENT_CALL_RECONNECT'
	//强制退出游戏
	static EVENT_FORCE_LEAVE_GAME = 'EVENT_FORCE_LEAVE_GAME'

	//socket 内部事件
	static Event_GameSocketMsg = 'Event_GameSocketMsg'
	static Event_GamePBSocketMsg = 'Event_GamePBSocketMsg' //Protobuf协议
	static Event_GameSocketOpen = 'Event_GameSocketOpen'
	static Event_GameSocketClose = 'Event_GameSocketClose'
	//socket 正要发起重连
	static Event_GameSocketCallReconnect = 'Event_GameSocketReconnect'

	//Socket多久没收到数据  需要重连
	socketReconnectReceiveCheckInteval = 30

	handleHelperKey = 'handlerHelper'
	socketHelperKey = 'socketHelper'
	errorHelperKey = 'gameErrorHelper'
	reconnectHelperKey = 'reconnectHelperKey'
	heartBeatHelperKey = 'heartbeatHelperKey'
	callbackHelperKey = 'callbackHelperKey'

	Context = {}
	gsc = 'default'
	glv = 'l0'
	gid = 0
	_svr_t = ''
	_svr_id = -1
	mod = ''
	bNoUrlMod = false

	demoUid = 0 //试玩用户uid
	demoToken = '' //试玩用户token

	helperMap = {}
	//服务器使用数据
	dst = {}
	//消息队列
	msgQueue = []

	isRunning = false

	//服务器验证数据
	lastSN = -1

	msgState = MessageState.PassAll

	checkHelper = new CheckHelper(2)

	serverRoutes = null

	setup() {
		this.registHelper(this.socketHelperKey, new SocketHelper(this))
		this.registHelper(this.handleHelperKey, new HandlerHelper(this))
		this.registHelper(this.errorHelperKey, new GameErrorHelper(this))
		this.registHelper(this.reconnectHelperKey, new ReconnectHelper(this))
		this.registHelper(this.heartBeatHelperKey, new GameHeartBeatHelper(this))
		this.registHelper(this.callbackHelperKey, new CallbackHandlerHelper(this))
		this.on(GameServer.Event_GameSocketMsg, this, this.handleMsg)
		this.on(GameServer.Event_GamePBSocketMsg, this, this.handlePbMsg)
		this.on(GameServer.Event_GameSocketCallReconnect, this, this.clearData)
	}

	//注册定制协议处理函数
	registHandler(key, handler) {
		this.getHelper(this.handleHelperKey).registHandler(key, handler)
	}

	//注册通用错误处理函数
	registDefaultHandler(key, handler) {
		this.getHelper(this.handleHelperKey).registDefaultHandler(key, handler)
	}

	//注册定制错误处理
	registErrorHandler(errno, handler) {
		this.getHelper(this.errorHelperKey).registErrorHandler(errno, handler)
	}

	clearHandlers() {
		this.getHelper(this.handleHelperKey).clearHandlers()
		this.getHelper(this.callbackHelperKey).clearCallbacks()
	}

	run() {
		this.callHelper('run')
		this.isRunning = true
	}

	stop() {
		this.callHelper('clear')
		this.offAllByCaller(this)
		this.checkHelper.clear()
		this.lastSN = -1
		this.msgState = MessageState.PassAll
		this.msgQueue = []
		this.dst = {}
		this.isRunning = false
	}

	/**
	 * 发送 内容为json格式的Socket消息
	 * @param cmd
	 * @param payload
	 */
	send(cmd, param) {
		param = param || {}
		let data = this.getSendParam(cmd)
		data._param._para = param
		this.sendDirect(data)
	}

	/**
	 * 发送回调方式的socket请求
	 * @param cmd 协议名
	 * @param param 参数
	 * @param callback 回调
	 * @param errorCallback 错误时回调, 传空表示使用通用处理
	 * @param livingTime 生存时长s -1表不限生命周期
	 * @param inQueue 是否走队列
	 */
	sendWithCallback(cmd, param, callback, errorCallback, livingTime = -1, inQueue = true) {
		param = param || {}
		let data = this.getSendParam(cmd)
		data._param._para = param
		data._func = cmd
		let check = data._check

		let callbackInfo = {
			key: check,
			callback: callback,
			errorCallback: errorCallback,
			inQueue: inQueue,
			live: livingTime,
			cmd: cmd,
		}
		this.getHelper(this.callbackHelperKey).registCallback(check, callbackInfo)
		this.sendDirect(data)
	}

	/**
	 * 发送 内容为protobuffer格式的Socket消息
	 * @param cmd
	 * @param payload
	 */
	sendPb(cmd, payload) {
		if (cmd.indexOf('*game*_') == 0) {
			cmd = cmd.replace('*game*_', '')
			cmd = Number(cmd)
		}
		this.getHelper(this.socketHelperKey).sendBuffer(cmd, payload)
	}

	setDst(gt, chair) {
		this.dst._gt = gt
		this.dst._chair = chair
	}

	passAll() {
		this.msgState = MessageState.PassAll
	}

	ignoreAll() {
		this.msgState = MessageState.IgnoreAll
	}

	passSSSAndEnter() {
		this.msgState = MessageState.PassSSSAndEnter
		this.lastSN = -1
	}

	sendDirect(param) {
		this.getHelper(this.socketHelperKey).send(param)
	}

	sendHeartBeat() {
		this.getHelper(this.heartBeatHelperKey).startHeartbeat()
		this.getHelper(this.heartBeatHelperKey).sendHeartBeat()
	}

	stopHeartBeat() {
		this.getHelper(this.heartBeatHelperKey).stopHeartBeat()
	}

	getSendParam(cmd) {
		let data = {}
		data._dst = this.dst
		data._param = {}
		data._param._cmd = cmd
		if (!this.mod) {
			this.resetMod()
		}
		data._mod = this.mod
		this.checkHelper.updateChecker()
		data._check = this.checkHelper.getNomalChecker()
		return data
	}

	resetMod() {
		this.mod = this._svr_t
		if (this._svr_id >= 0) {
			this.mod += '.' + this._svr_id
		}
		return this.mod
	}

	changeMod(newMod) {
		this.mod = newMod
	}

	//链接服务器
	connect(socketFuncName) {
		if (!this.serverRoutes) {
			console.error('GameServer connect no serverRoutes:' + this.serverRoutes)
		}
		let route = this.serverRoutes.getCurRoute()
		let suffix = this.getSocketSuffix(socketFuncName)

		this.getHelper(this.socketHelperKey).connect(route, suffix)
	}

	callHelper(funcName, param) {
		for (let key in this.helperMap) {
			if (this.helperMap[key][funcName]) this.helperMap[key][funcName](param)
		}
	}

	getSocketSuffix(socketFuncName) {
		let urlParam = Global.Toolkit.getUrlCommonParam(this.demoUid, this.demoToken)
		let suffix = '?' + urlParam
		if (socketFuncName) {
			suffix += '&_func=' + socketFuncName
		}
		return suffix
	}

	registHelper(key, helper) {
		if (this.helperMap[key] != null) {
			console.error('GameServer registHelper repeat:' + key)
		}
		this.helperMap[key] = helper
	}

	getHelper(key) {
		if (!this.helperMap[key]) return null
		return this.helperMap[key]
	}

	clearData() {
		this.dst = {}
		this.msgQueue = []
		this.lastSN = -1
		this.getHelper(this.heartBeatHelperKey).stopHeartBeat()
	}

	handlePbMsg(cmd, netData) {
		let _check = netData._check
		let callbackInfo = this.getHelper(this.callbackHelperKey).getCallback(_check)
		if (callbackInfo) {
			let callback = callbackInfo.callback
			if (callback && callback.decodePb) {
				// 数据格式还有问题, 未使用验证先注释
				// let para = callback.decodePb(netData);
				// //如果是错误命令 有可能会返回空
				// if(para == null)
				//     return;
				// let packData:any = {}
				// packData._cmd = cmd;
				// packData._para = para;
				// if(callbackInfo.inQueue)
				//     this.msgQueue.push(packData);
				// else{
				//     callback(packData);
				//     this.getHelper<CallbackHandlerHelper>(this.callbackHelperKey).removeCallback(_check);
				// }
			}
		} else {
			let handler = this.getHelper(this.handleHelperKey).getHandler(cmd)
			if (handler && handler.decodePb) {
				let para = handler.decodePb(netData)
				//如果是错误命令 有可能会返回空
				if (para == null) return
				let packData = {}
				packData._cmd = cmd
				packData._para = para

				if (handler.checkInQueue && handler.checkInQueue(packData)) this.msgQueue.push(packData)
				else handler.Handle(packData)
			}
		}
	}

	filterMsg(netData) {
		if (netData == null || netData._param == null) {
			return false
		}
		//过滤全部协议
		if (this.msgState == MessageState.IgnoreAll) {
			return false
		}
		//除了session和enter 全部过滤
		if (this.msgState == MessageState.PassSSSAndEnter) {
			return (
				netData._param._cmd == GameCommand.Session || netData._param._cmd == GameCommand.Enter || netData._param._cmd == GameCommand.WaitMatch
			)
		}
		return true
	}

	handleMsg(netData) {
		if (!this.filterMsg(netData)) {
			console.error('GameServer handleMsg filter msg', JSON.stringify(netData))
			return
		}

		if (netData == null || netData == undefined) {
			console.error('GameServer handleMsg netData == null !!!')
			return
		}

		this.preHandleMsg(netData)

		let _check = netData._check
		let callbackInfo = this.getHelper(this.callbackHelperKey).getCallback(_check)
		if (callbackInfo && callbackInfo.errorCallback && netData._param && netData._param._errno) {
			callbackInfo.errorCallback(netData._param)
			return
		}

		let errorHelper = this.getHelper(this.errorHelperKey)

		if (!errorHelper.handleSysError(netData)) return

		//检查sn
		if (!this.checkSN(netData)) {
			this.lastSN = -1
			//sn验证不通过需要强制重连
			console.error('GameServer checkSN error EVENT_CALL_RECONNECT')
			this.event(GameServer.EVENT_CALL_RECONNECT)
			return
		}

		if (!errorHelper.handleCmdError(netData)) return

		if (!errorHelper.handleLogicError(netData)) return

		let cmd = netData._param._cmd

		//心跳逻辑处理
		if (cmd == GameCommand.HeartBeat) {
			this.getHelper(this.heartBeatHelperKey).HandleHeartBeat(netData)
			return
		}

		//协议预处理
		if (callbackInfo) {
			// 回调方式处理
			if (callbackInfo.inQueue) {
				this.msgQueue.push(netData)
			} else {
				callbackInfo.callback(netData._param)
				this.getHelper(this.callbackHelperKey).removeCallback(_check)
			}
		} else {
			// 消息方式处理
			let handler = this.getHelper(this.handleHelperKey).getHandler(cmd)
			if (handler) {
				if (handler.checkInQueue && handler.checkInQueue(netData._param)) {
					this.msgQueue.push(netData._param)
				} else {
					handler.Handle(netData._param)
				}
			}
		}
	}

	preHandleMsg(netData) {
		//收到enter和session后 协议正常接收   这里不检查错误，错误处理放到后面处理  add pvp匹配协议
		if (netData._param._cmd == GameCommand.Enter || netData._param._cmd == GameCommand.Session || netData._param._cmd == GameCommand.WaitMatch) {
			this.passAll()
			return
		}
		if (netData._param._cmd == GameCommand.Leave) {
			//收到自己leave 并且 没有错误 则不接受后续协议，需要等下次enter
			if (
				this.Context &&
				this.Context.selfSrc &&
				this.Context.selfSrc == netData._param._src &&
				(netData._param._errno == null || netData._param._errno == 0)
			)
				this.ignoreAll()
		}
	}

	onUpdate(dt) {
		if (!this.isRunning) {
			return
		}
		this.callHelper('onUpdate', dt)
		while (this.msgQueue.length > 0) {
			let msg = this.msgQueue.shift()
			let callbackInfo = this.getHelper(this.callbackHelperKey).getCallback(msg._check)
			if (callbackInfo && callbackInfo.callback) {
				callbackInfo.callback(msg._param) // 回调式的需要_check找到对应的, 需要传外层的数据
				this.getHelper(this.callbackHelperKey).removeCallback(msg._check)
			} else {
				let handler = this.getHelper(this.handleHelperKey).getHandler(msg._cmd)
				if (handler != null) {
					handler.Handle(msg)
				}
			}
		}
	}

	checkSN(msg) {
		let sn = msg._sn
		if (sn == 0)
			//sn为0  跳过检测   主要处理 900  901 等错误
			return true
		if (!this.lastSN || this.lastSN < 0) {
			this.lastSN = sn
			return true
		}
		if (this.lastSN + 1 != sn) {
			return false
		}
		this.lastSN = sn
		return true
	}

	setSession(session) {
		this.setDst(session._para._gt, session._para._chair)
		//收到Session后 发送心跳
		this.sendHeartBeat()
	}

	sendEnter(extraMap = null) {
		this.passSSSAndEnter()
		let enterData = this.getSendParam(GameCommand.Enter)
		enterData._param._para = { _gid: this.gid }
		enterData._param._para._gsc = this.gsc
		enterData._param._para._glv = this.glv
		if (extraMap) {
			for (let k in extraMap) {
				enterData._param._para[k] = extraMap[k]
			}
		}
		this.sendDirect(enterData)
	}
}
