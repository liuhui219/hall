import BaseServerHelper from './BaseServerHelper'

export default class HandlerHelper extends BaseServerHelper {
	handlerMap = {}

	//主要存放公共handler    一类型游戏可以配置一套defaultMap   handlerMap注册差异函数
	defaultHandlerMap = {}

	//每个游戏注册一次Handler    key为服务器协议字段
	registHandler(key, handlerInstance) {
		if (this.handlerMap[key] != null) {
			console.error('HandlerHelper repeat registration handler', key)
		}
		this.handlerMap[key] = handlerInstance
	}

	registDefaultHandler(key, handlerInstance) {
		if (this.defaultHandlerMap[key] != null) {
			console.error('HandlerHelper repeat registration defaulthandler', key)
		}
		this.defaultHandlerMap[key] = handlerInstance
	}

	removeHandler(key) {
		if (this.handlerMap[key]) {
			this.handlerMap[key] = null
		}
	}

	clearHandlers() {
		this.handlerMap = {}
		this.defaultHandlerMap = {}
	}

	getHandler(key) {
		let handler = this.handlerMap[key]
		if (handler == null) {
			handler = this.defaultHandlerMap[key]
		}

		if (handler == null) {
			console.error('HandlerHelper getHandler no handler:', key)
		}
		return handler
	}
}
