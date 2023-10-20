import BaseServerHelper from './BaseServerHelper'

export default class CallbackHandlerHelper extends BaseServerHelper {
	callbackMap = new Map()
	timeCount = 0
	// key 为check
	registCallback(key, handlerInstance) {
		this.callbackMap.set(key, handlerInstance)
	}

	removeCallback(key) {
		if (this.callbackMap.has(key)) {
			this.callbackMap.delete(key) // 可以清空key:null
		}
	}

	clearCallbacks() {
		this.callbackMap.clear()
	}

	getCallback(key) {
		let handler = this.callbackMap.get(key)
		return handler
	}

	onUpdate(dt) {
		this.timeCount += dt
		if (this.timeCount >= 0.5) {
			// 0.5s更新一次, 减少遍历次数
			this.callbackMap.forEach((callback, key) => {
				if (callback && callback.live > 0) {
					callback.live -= this.timeCount
					if (callback.live <= 0) this.removeCallback(key)
				}
			})
			this.timeCount = 0
		}
	}
}

export class CallbackInfo {
	cmd = ''
	callback
	key
	inQueue
	errorCallback
	live
}
