import Global from '../../../Global'
import GameServer from '../GameServer'
import BaseServerHelper from './BaseServerHelper'

export default class ReconnectHelper extends BaseServerHelper {
	//是否需要重连
	needReconnect = false
	//上次收到服务器协议时间
	lastReceiveTime = 0
	//重连次数
	reconnectCount = 0
	//网络是否已经链接
	socketOpened = false
	//重连中 表示正在重连中
	reconnectLock = false
	//下次重连时间
	nextReconnectTime = 0
	//Socket重连间隔
	socketReconnectInterval = 4

	onInit() {}

	run() {
		this.server.on(GameServer.EVENT_CALL_RECONNECT, this, this.setReconnect)
		this.server.on(GameServer.Event_GameSocketOpen, this, this.onSocketOpen)
		this.server.on(GameServer.Event_GameSocketClose, this, this.onSocketClose)
		this.server.on(GameServer.Event_GameSocketMsg, this, this.updateReceiveTime)
	}

	clear() {
		this.server.off(GameServer.EVENT_CALL_RECONNECT, this, this.setReconnect)
		this.server.off(GameServer.Event_GameSocketOpen, this, this.onSocketOpen)
		this.server.off(GameServer.Event_GameSocketClose, this, this.onSocketClose)
		this.server.off(GameServer.Event_GameSocketMsg, this, this.updateReceiveTime)
		this.needReconnect = false
		this.socketOpened = false
		this.reconnectLock = false
		this.lastReceiveTime = 0
		this.reconnectCount = 0
	}

	onSocketOpen() {
		if (this.needReconnect) {
			this.server.event(GameServer.EVENT_SOCKET_RECONNECT_SUC)
		}
		this.needReconnect = false
		this.reconnectLock = false
		this.socketOpened = true
		this.lastReceiveTime = 0
		this.reconnectCount = 0
	}

	updateReceiveTime() {
		this.lastReceiveTime = Date.now()
	}

	onSocketClose() {
		console.warn('ReconnectHelper socket closed !!!!')
		this.setReconnect()
		this.socketOpened = false
		this.reconnectLock = false
	}

	reconnect() {
		this.reconnectLock = true
		this.reconnectCount++
		//更新下次可以重连的时间
		this.nextReconnectTime = Date.now() + this.socketReconnectInterval * 1000
		if (this.reconnectCount > 5) {
			this.reconnectCount = 0
			this.server.event(GameServer.EVENT_SOCKET_RECONNECT_ERROR)
			return
		}
		this.server.event(GameServer.Event_GameSocketCallReconnect)
	}

	setReconnect() {
		console.warn('ReconnectHelper setReconnect')
		if (!this.server.isRunning) return
		this.reconnectLock = false
		this.needReconnect = true
	}

	onUpdate() {
		if (!this.server.isRunning) return
		if (
			this.needReconnect &&
			//当前没在重连中
			!this.reconnectLock &&
			//判断重连间隔
			Date.now() > this.nextReconnectTime
		) {
			console.warn('ReconnectHelper onUpdate call reconnect')
			this.reconnect()
			return
		}

		if (this.socketOpened && this.lastReceiveTime != 0) {
			if (Date.now() - this.lastReceiveTime > this.server.socketReconnectReceiveCheckInteval * 1000) {
				this.needReconnect = true
				this.lastReceiveTime = 0
				this.socketOpened = false
			}
		}
	}
}
