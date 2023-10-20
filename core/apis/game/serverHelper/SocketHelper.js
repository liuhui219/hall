import Global from '../../../Global'
import { NetSocket } from '../../../net/socket/NetSocket'
import GameServer from '../GameServer'
import BaseServerHelper from './BaseServerHelper'

export default class SocketHelper extends BaseServerHelper {
	socket
	url
	cerPath
	msgList = []
	bufferList = []

	serverRoute

	suffix = ''
	_sendCount = 0

	onInit() {
		this.server.on(GameServer.Event_GameSocketCallReconnect, this, this.callReconnect)
	}

	callReconnect() {
		this.msgList = []
		if (this.server.serverRoutes) {
			this.server.serverRoutes.changeToAnotherRoute()
			this.serverRoute = this.server.serverRoutes.getCurRoute()
			console.warn('SocketHelper callReconnect: changed socket serverRoute')
		}
		this.connect(this.serverRoute, this.suffix)
	}

	connect(serverRoute, suffix = '') {
		this.serverRoute = serverRoute
		this.suffix = suffix
		if (this.serverRoute) {
			let mod = this.server.resetMod()
			if (this.server.bNoUrlMod) {
				mod = ''
			}
			let serverUrl = this.serverRoute.getPbSocketUrl(mod)
			serverUrl.suffix = serverUrl.suffix + this.suffix
			this.url = Global.UrlUtil.dealWebSocketUrl(serverUrl)
			this.cerPath = serverUrl.cerPath
		}
		if (!this.url || this.url == '') {
			return
		}
		this.clear()
		this.socket = new NetSocket(this.url, this.serverRoute, this.cerPath)
		this.socket.init(this, this.onSocketMsg, this.onSocketOpen, this.onSocketError, this.onSocketClose, false)
		this.socket.connect()
		console.log('SocketHelper connect socket url:', this.url)
	}

	send(msgObj) {
		if (this.socket && this.socket.isConnected) {
			this._sendCount++
			msgObj.c = this._sendCount
			let content = JSON.stringify(msgObj)
			let encrptedMsg = content
			if (this.url && this.url.startsWith('wss') == false && content) {
				encrptedMsg = Global.AESUtil.aesEncrptMsg(content)
			}
			this.socket.send(encrptedMsg)
		}
	}

	sendBuffer(cmd, buffer, now = false) {
		let size = buffer ? buffer.length : 0
		size += 4
		let bb = ByteBuffer.allocate(size, false, false)
		bb.writeUint32(cmd, 0)
		if (buffer) {
			bb.append(buffer, 4)
		}
		if (this.socket == null || (!this.socket.isConnected && !now)) {
			console.warn('SocketHelper sendBuffer: push buffer in queue')
			this.bufferList.push(bb)
			return
		}
		if (this.socket && this.socket.isConnected) {
			this.socket.send(bb.buffer)
			bb.clear()
		}
	}

	sendBufferDirect(bb) {
		this.socket.send(bb.buffer)
		bb.clear()
	}

	clear() {
		if (this.socket) {
			for (let i = 0; i < this.msgList.length; i++) {
				this.send(this.msgList[i], true)
			}
			for (let i = 0; i < this.bufferList.length; i++) {
				this.sendBufferDirect(this.bufferList[i])
			}
			this.socket.cleanSocket()
			this.socket = null
		}
		this.msgList = []
		this.bufferList = []
		this._sendCount = 0
	}

	onSocketOpen() {
		this.server.event(GameServer.Event_GameSocketOpen)
		this.server.event(GameServer.EVENT_SOCKET_OPEN)
		// Global.Setting.Urls.sortGameRoutes() //可以不用，先注释
	}

	onSocketMsg(msg) {
		if (typeof msg == 'string') {
			this.handleStringMsg(msg)
		} else {
			this.handlePbMsg(msg)
		}
	}

	handleStringMsg(msg) {
		let netObj = null
		try {
			let decode = Global.AESUtil.decodeMsg(msg)
			netObj = JSON.parse(decode)
		} catch (e) {
			console.error('SocketHelper handleStringMsg: Failed to parse protocol', msg, e)
			return
		}
		this.server.event(GameServer.Event_GameSocketMsg, netObj)
	}

	handlePbMsg(msg) {
		let buffer = new Uint8Array(msg)
		//大字节序读取command
		let command = ByteBuffer.wrap(buffer.slice(0, 4), false).readUint32(0)
		let paraData = buffer.slice(4)

		command = '*game*_' + command
		this.server.event(GameServer.Event_GamePBSocketMsg, command, paraData)
	}

	onSocketClose() {
		this.server.event(GameServer.Event_GameSocketClose)
		this.server.event(GameServer.EVENT_SOCKET_CLOSE)
	}

	onSocketError() {
		this.server.event(GameServer.Event_GameSocketClose)
		this.server.event(GameServer.EVENT_SOCKET_CONNECT_ERROR)
	}

	onUpdate(dt) {
		if (!this.socket || !this.socket.isConnected) return
		if (this.msgList.length > 0) {
			for (let i = 0; i < this.msgList.length; i++) {
				this.socket.send(this.msgList[i])
			}
			this.msgList = []
		}
	}
}
