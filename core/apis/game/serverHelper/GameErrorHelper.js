import GameServer from '../GameServer'
import BaseServerHelper from './BaseServerHelper'

//游戏逻辑通用错误处理
export default class GameErrorHelper extends BaseServerHelper {
	errorHandlerMap = {}

	onInit() {}

	//注册子游戏定制错误处理  参数为errnoid, netData   返回true表示继续入队列 false丢弃协议
	registErrorHandler(key, callback) {
		this.errorHandlerMap[key] = callback
	}

	clear() {
		this.errorHandlerMap = {}
	}

	handleSysError(netData) {
		if (netData._errno == null) {
			return true
		}

		let handler = this.getErrorHandler(netData._errno)
		if (handler) {
			return handler(netData._errno, netData)
		}

		this.defultErrorHandler(netData._errno, netData._errstr, netData)
	}

	handleCmdError(netData) {
		if (netData._param._errno == null) {
			return true
		}

		let handler = this.getErrorHandler(netData._param._errno)
		if (handler) {
			return handler(netData._param._errno, netData)
		}

		this.defultErrorHandler(netData._param._errno, netData._param._errstr, netData)
	}

	handleLogicError(netData) {
		try {
			if (netData._param._para == null || netData._param._para._errno == null) {
				return true
			}

			let handler = this.getErrorHandler(netData._param._para._errno)
			if (handler) {
				return handler(netData._param._para._errno, netData)
			}

			this.defultErrorHandler(netData._param._para._errno, netData._param._para._errstr, netData)
		} catch (error) {}
	}

	getErrorHandler(key) {
		return this.errorHandlerMap[key]
	}

	//服务器errno是唯一的
	defultErrorHandler(_errno, _errstr, netData) {
		this.server.event(GameServer.EVENT_SOCKET_ERROR_MSG, { _errno, _errstr, msg: netData })

		// if (_errno < 1000) {
		// 	console.error('GameErrorHelper defultErrorHandler _errno:' + _errno)
		// 	this.server.event(GameServer.EVENT_CALL_RECONNECT)
		// }
	}
}
