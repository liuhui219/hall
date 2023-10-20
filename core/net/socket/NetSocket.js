export class NetStatus {
	static close = 0
	static connecting = 1
	static connected = 2
}

export class NetSocket {
	_socket
	_url
	_cerPath
	_status
	_onOpen
	_onMessage
	_onClose
	_onError
	_target
	_useBinary = false
	_startTime = 0
	_endTime = 0

	_serverRoute

	constructor(url, routes = null, cerPath = null) {
		this._url = url
		this._serverRoute = routes
		this._cerPath = cerPath
	}

	get status() {
		return this._status
	}

	init(target, onMesage, onOpen, onError, onClose, useBinary = false) {
		this._target = target
		this._onMessage = onMesage
		this._onOpen = onOpen
		this._onError = onError
		this._onClose = onClose
		this._useBinary = useBinary
	}

	get isConnected() {
		return this.status == NetStatus.connected
	}

	send(msg) {
		if (this._socket != null && this.isConnected) {
			this._socket.send(msg)
		}
	}

	get usePb() {
		return this._useBinary
	}

	connect() {
		this._startTime = new Date().valueOf()
		this._socket = new WebSocket(this._url)
		if (this._useBinary) {
			this._socket.binaryType = 'arraybuffer'
		}
		this._socket.onopen = () => {
			this._status = NetStatus.connected
			if (this._onOpen) this._onOpen.call(this._target)
		}
		this._socket.onclose = (env) => {
			this._endTime = new Date().valueOf()
			if (env && env.reason) {
				console.warn('NetSocket socket is closed - reason:', env.reason)
			} else {
				console.warn('NetSocket socket is closed no reason')
			}
			this._status = NetStatus.close
			if (this._onClose) this._onClose.call(this._target)
			return null
		}
		this._socket.onerror = (env) => {
			this._endTime = new Date().valueOf()
			console.error('NetSocket socket error')
			this._status = NetStatus.close
			if (this._onError) this._onError.call(this._target)
		}
		this._socket.onmessage = (e) => {
			if (!e || !e.data) return
			this.onMessage(e.data)
		}
		this._status = NetStatus.connecting
	}

	onMessage(data) {
		//data 格式化？
		if (this._onMessage) this._onMessage.call(this._target, data)
	}

	cleanSocket() {
		this.close()
		if (this._socket) {
			// this._socket.onclose = null;
			// this._socket.onmessage = null;
			// this._socket.onopen = null;
			// this._socket.onerror = null;
			this._socket = null
		}
		this.cleanCallback()
	}

	cleanCallback() {
		this._useBinary = false
		this._onMessage = null
		this._onClose = null
		this._onMessage = null
		this._onError = null
	}

	close() {
		if (this._socket) {
			try {
				this._socket.close()
			} catch (e) {}
		}
	}
}
