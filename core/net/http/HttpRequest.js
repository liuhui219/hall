import EventDispatcher from '../../event/EventDispatcher'
import Global from '../../Global'

export default class HttpRequest extends EventDispatcher {
	static EVENT_COMPLETE = 'complete'
	static EVENT_ERROR = 'error'

	_http = new XMLHttpRequest()

	_data
	_url
	_responseType
	_startTime = 0
	_endTime = 0

	_timeOut
	isError = false

	get data() {
		return this._data
	}
	get url() {
		return this._url
	}

	send(serverUrl, data = null, method = 'get', responseType = 'text', headers = null) {
		this._responseType = responseType
		this._data = null
		let url = ''
		let sign_url = null
		if (serverUrl.isInnerRequest) {
			let httpSignInfo = Global.UrlUtil.dealHttpSign(serverUrl)
			sign_url = httpSignInfo.sign_url
		} else {
			sign_url = serverUrl.getUrl()
		}

		if (!sign_url) {
			console.error('HttpRequest send sign_url error ' + sign_url)
			return
		}
		url = sign_url
		this._url = sign_url
		let http = this._http

		http.open(method, url, true)
		http.responseType = responseType !== 'arraybuffer' ? 'text' : 'arraybuffer'
		http.onreadystatechange = this.onReadyStateChange.bind(this)
		http.onerror = () => {
			this.onError('onerror ' + '[' + this._http.status + ']' + this._http.statusText + ':' + this._http.responseURL)
		}

		this._startTime = new Date().valueOf()

		http.ontimeout = (e) => {
			this.httpEvent('ontimeout', e)
		}
		http.send(data)
	}

	setTimeout(timeout) {
		this.clearTimer()
		if (this._http) {
			this._http.timeout = timeout
			this._timeOut = setTimeout(() => {
				this.onError('request timeout')
			}, timeout)
		}
	}

	clearTimer() {
		if (this._timeOut) {
			clearTimeout(this._timeOut)
			this._timeOut = null
		}
	}

	httpEvent(type, event) {
		console.error('HttpRequest httpEvent type:' + type, event)
		this.onError('request timeout')
	}

	onReadyStateChange() {
		if (this._http.readyState == 4) {
			this._endTime = new Date().valueOf()
			this.clearTimer()
			if (this._http.status >= 200 && this._http.status < 300) {
				this.onComplete()
			} else {
				this.onError('onReadyStateChange ' + '[' + this._http.status + ']' + this._http.statusText + ':' + this._http.responseURL)
			}
		}
	}

	onError(content) {
		this.clearTimer()
		this._endTime = new Date().valueOf()
		console.error('HttpRequest onError:' + content, this._url)
		if (this.isError) {
			return
		}
		this.isError = true
		let hTime = this._endTime - this._startTime
		this.event(HttpRequest.EVENT_ERROR, this._http, hTime)
		this.clear()
	}

	onComplete() {
		this.clearTimer()
		let flag = true
		try {
			if (this._responseType === 'json') {
				this._data = JSON.parse(this._http.responseText)
			} else {
				this._data = this._http.response || this._http.responseText
			}
		} catch (error) {
			flag = false
			this.onError(error)
		}
		flag && this.event(HttpRequest.EVENT_COMPLETE, this._data instanceof Array ? [this._data] : this._data)
		this.clear()
	}

	clear() {
		this._http.onReadyStateChange = null
		this.offAll('')
	}
}
