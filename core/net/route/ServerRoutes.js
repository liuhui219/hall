import Global from '../../Global'

export default class ServerRoutes {
	serverInfoList = []
	curIndex = 0
	parse(routes) {
		if (routes == null) {
			return
		}
		this.serverInfoList = []
		for (let i = 0; i < routes.length; i++) {
			if (!this.checkRouteValid(routes[i])) {
				continue
			}
			let routeInfo = routes[i]
			if (Global.UrlUtil.checkIsMutiLinesSameHost(routeInfo.host)) {
				lineAddresses = Global.UrlUtil.getMutiLinesSameHost(routeInfo.host)
				if (lineAddresses && lineAddresses.length > 0) {
					let lineAddressesLen = lineAddresses.length
					for (let i = 0; i < lineAddressesLen; i++) {
						let lineAddress = lineAddresses[i]
						let newLineRouteInfo = JSON.parse(JSON.stringify(routeInfo))
						newLineRouteInfo.host = lineAddress
						let serverInfo = new ServerRouteInfo()
						serverInfo.parse(newLineRouteInfo)

						this.serverInfoList.push(serverInfo)
					}
				}
			} else {
				let serverInfo = new ServerRouteInfo()
				serverInfo.parse(routes[i])
				this.serverInfoList.push(serverInfo)
			}
		}

		let sortFunc = (a, b) => {
			let subdomain = Global.Toolkit.getLevel2domain()
			if (Global.Toolkit.getLevel2domain(a.realHost) == subdomain) return -1
			if (Global.Toolkit.getLevel2domain(b.realHost) == subdomain) return 1
			return 0
		}
		this.serverInfoList.sort(sortFunc)
	}

	//新增wsport 当配置wsport后 大厅可以直接使用登录的域名+wsport作为游戏服务器地址
	parseWs(routes) {
		if (routes == null) {
			return
		}
		for (let i = 0; i < routes.length; i++) {
			if (!this.checkWsRouteValid(routes[i])) {
				continue
			}
			let serverInfo = new ServerRouteInfo()
			serverInfo.parseWs(routes[i])
			this.serverInfoList.push(serverInfo)
		}
	}

	checkRouteValid(routeInfo) {
		return routeInfo.host != null
	}

	checkWsRouteValid(routeInfo) {
		return routeInfo.host != null && routeInfo.wsport != null && routeInfo.wsport != '' && routeInfo.wsport != 0
	}

	getRouteArr() {
		let arr = []
		for (let i = 0; i < this.serverInfoList.length; i++) {
			arr.push(this.serverInfoList[i].host)
		}
		return arr
	}

	getRouteLen() {
		if (this.serverInfoList) {
			return this.serverInfoList.length
		}
		return 0
	}

	changeToAnotherRoute() {
		if (this.serverInfoList.length < 1) return
		this.curIndex = (this.curIndex + 1) % this.serverInfoList.length
	}

	//切换到下一个route
	getAnotherRoute() {
		if (this.serverInfoList.length == 0) return null
		if (this.serverInfoList.length == 1) return this.serverInfoList[0]
		this.curIndex = (this.curIndex + 1) % this.serverInfoList.length
		return this.serverInfoList[this.curIndex]
	}

	//返回当前route
	getCurRoute() {
		let curRoute = null
		if (this.serverInfoList[this.curIndex] != null) {
			curRoute = this.serverInfoList[this.curIndex]
		} else {
			console.error('ServerRoutes getCurRoute curRoute is null !!!')
			for (let i = 0; i < this.serverInfoList.length; i++) {
				if (this.serverInfoList[i] != null) {
					this.curIndex = i
					curRoute = this.serverInfoList[i]
					break
				}
			}
		}
		return curRoute
	}

	//对线路排序,成功的优先排在最先
	sortRoutes() {
		if (this.curIndex == 0) {
			return
		}
		if (this.serverInfoList) {
			let curServerRoute = this.serverInfoList[this.curIndex]
			let newRoutes = [curServerRoute].concat(this.serverInfoList.filter((item) => item != curServerRoute))
			this.serverInfoList = newRoutes
			this.curIndex = 0
		}
	}

	sortRoutesByIndex(index) {
		if (index == null || index == undefined) {
			return
		}
		if (this.curIndex == index) {
			return
		}
		if (this.serverInfoList) {
			let curServerRoute = this.serverInfoList[index]
			if (curServerRoute) {
				let newRoutes = [curServerRoute].concat(this.serverInfoList.filter((item) => item != curServerRoute))
				this.serverInfoList = newRoutes
				this.curIndex = 0
			}
		}
	}
}

export class ServerRouteInfo {
	//服务器地址或假域名
	host = ''
	//服务器端口
	port = 0
	//soket端口
	us_port = 0
	//盾需要的本地端口
	lo_port = 0
	//盾类型:0:不启用盾 1.自签名证书 2.云盾 3.智安盾
	lo_type = 0
	//真是域名或ip
	realHost = ''
	//阿里云游戏盾需要参数
	attr
	//web主页线路路径
	param
	//线路类型 0 常规请求线路 1下载资源线路
	url_type = 0

	parse(serverInfo) {
		this.realHost = serverInfo.host
		this.port = serverInfo.port
		this.us_port = serverInfo.us_port
		this.lo_type = serverInfo.lo_type
		let lo_port = serverInfo.lo_port
		this.lo_port = lo_port
		this.attr = serverInfo.attr

		let sad = serverInfo.sad
		if (sad) {
			let tempArray = sad.split('.')
			if (tempArray && tempArray.length < 2) {
				//加密
				let host = Global.Toolkit.aesDecrptHost(sad)
				if (host) {
					this.host = host
				}
			} else {
				this.host = sad.trim()
			}
		} else {
			this.host = this.realHost
		}
		if (serverInfo.param) {
			this.param = serverInfo.param
		}
		if (serverInfo.url_type) {
			this.url_type = serverInfo.url_type
		}
	}

	parseWs(serverInfo) {
		this.realHost = serverInfo.host
		this.port = serverInfo.wsport
		this.us_port = serverInfo.us_port
		this.lo_type = serverInfo.lo_type
		let lo_port = serverInfo.lo_port
		this.lo_port = lo_port

		let sad = serverInfo.sad
		if (sad) {
			this.host = sad.trim()
		} else {
			this.host = this.realHost
		}
	}

	getPbSocketUrl(mod) {
		let serverUrl = this.getSocketUrl()
		let suffix = ''
		if (mod) {
			let infos = mod.split('.')
			for (let i = 0; i < infos.length; i++) {
				suffix = suffix + infos[i] + '/'
			}
		}
		serverUrl.suffix = serverUrl.suffix + suffix
		return serverUrl
	}

	getHttpUrlWithMod(mod) {
		let serverUrl = this.getHttpUrl()
		let infos = mod.split('.')
		let suffix = ''
		for (let i = 0; i < infos.length; i++) {
			suffix = suffix + infos[i] + '/'
		}
		serverUrl.suffix = serverUrl.suffix + suffix
		return serverUrl
	}

	getSocketUrl() {
		let serverUrl = this.getServerUrl()
		if (this.us_port != null && this.us_port != 0) {
			serverUrl.protocol = 'ws'
			Global.UrlUtil.dealServerUrl(serverUrl, this.us_port)
		} else if (this.port != null && this.port != 0) {
			serverUrl.protocol = 'wss'
			Global.UrlUtil.dealServerUrl(serverUrl, this.port)
		} else {
			console.error('ServerRoutes getSocketUrl Config error')
		}
		let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
		serverUrl.suffix = '/dict/' + paramPrefix
		return serverUrl
	}

	getServerUrl() {
		let serverUrl = new ServerUrl()
		serverUrl.addressHost = this.host ? this.host : this.realHost
		serverUrl.realHost = this.realHost ? this.realHost : this.host
		serverUrl.address = serverUrl.realHost
		serverUrl.attr = this.attr
		serverUrl.lo_type = this.lo_type
		serverUrl.param = this.param
		serverUrl.url_type = this.url_type
		return serverUrl
	}

	getUrl() {
		let serverUrl = this.getServerUrl()
		if (this.port != null && this.port != 0) {
			serverUrl.protocol = 'https'
			Global.UrlUtil.dealServerUrl(serverUrl, this.port)
		} else if (this.us_port != null && this.us_port != 0) {
			serverUrl.protocol = 'http'
			Global.UrlUtil.dealServerUrl(serverUrl, this.us_port)
		} else {
			serverUrl.protocol = 'https'
			Global.UrlUtil.dealServerUrl(serverUrl, this.port)
		}
		return serverUrl
	}

	getHttpUrl() {
		let serverUrl = this.getUrl()
		if (this.url_type == 1) {
			let paramPrefix = this.param
			serverUrl.suffix = paramPrefix
		} else {
			let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
			serverUrl.suffix = '/mini/' + paramPrefix
		}

		return serverUrl
	}
}

export class ServerUrl {
	_protocol = ''
	_address = ''
	_address_host = ''
	_real_host = ''
	_port = 0
	_suffix = ''
	_isEncrptUrl = false
	_isEncrptParam = false

	_isHostNameVerfy = false
	_cerName = ''
	_cerPath = ''
	_lo_type = 0 //线路类型
	_isInnerRequest = true //是否内部游戏请求连接
	_attr = null //线路额外参数
	_parm = '' //主页线路额外路径参数
	_url_type = 0 //线路类型 0 常规请求线路 1下载资源线路
	_id = '' //线路ID

	constructor() {
		this._id = Global.UrlUtil.curReqId++
	}

	copyValue(serverUrl) {
		this._protocol = serverUrl._protocol
		this._address = serverUrl._address
		this._address_host = serverUrl._address_host
		this._real_host = serverUrl._real_host
		this._port = serverUrl._port
		this._suffix = serverUrl._suffix
	}

	parse(url) {
		if (!url) {
			console.error('ServerRoutes ServerUrl parse url = null')
			return
		}
		if (url.startsWith('https')) {
			this._protocol = 'https'
		} else if (url.startsWith('http')) {
			this._protocol = 'http'
		} else if (url.startsWith('wss')) {
			this._protocol = 'wss'
		} else if (url.startsWith('ws')) {
			this._protocol = 'ws'
		}
		let arrs = url.split('//')
		let tempUrl = url
		if (arrs.length > 1) {
			tempUrl = arrs[1]
		}
		arrs = tempUrl.split('/')
		let host = arrs[0]
		if (host.indexOf(':') > -1) {
			this._address = host.split(':')[0]
			let port = host.split(':')[1]
			if (port && Number(port)) {
				this._port = Number(port)
			}
		} else {
			this._address = host
		}
		this._address_host = this._address
		this._real_host = this._address

		Global.UrlUtil.setRouteUrlCer(this)
		if (arrs.length > 1) {
			for (let i = 1; i < arrs.length; i++) {
				this._suffix = this._suffix + '/' + arrs[i]
			}
		}
	}

	getUrl() {
		let url = ''
		let protocol = this._protocol
		let address = this._address
		let addressHost = this._address_host
		let realHost = this._real_host
		let port = this._port ? ':' + this._port : ''
		let suffix = this._suffix

		if (protocol == 'ws' || protocol == 'wss') {
			if (this._address && this._address_host) {
				if (this._address != this._address_host) {
					//ws wss不支持自签名证书
					if (this.cerPath) {
						if (address == realHost) {
							if (addressHost != realHost) {
								url = protocol + '://' + address + '...' + addressHost + port + suffix
							} else {
								url = protocol + '://' + address + port + suffix
							}
						} else {
							url = protocol + '://' + address + '...' + realHost + port + suffix
						}
					} else {
						url = protocol + '://' + address + '...' + addressHost + port + suffix
					}
				} else {
					url = protocol + '://' + address + port + suffix
				}
			} else {
				url = protocol + '://' + address + port + suffix
			}
		} else {
			url = protocol + '://' + address + port + suffix
		}
		//https wss新增 p=s参数
		// if (url.startsWith('https') || url.startsWith('wss')) {
		// 	if (url.endsWith('?')) {
		// 		url = url + 'p=s'
		// 	} else {
		// 		url = url + '&p=s'
		// 	}
		// }
		return url
	}

	printSelf() {
		let printStr =
			'protocol = ' +
			this._protocol +
			' address = ' +
			this._address +
			' port = ' +
			this._port +
			' addressHost = ' +
			this._address_host +
			' realHost = ' +
			this._real_host +
			' attr = ' +
			(this._attr ? JSON.stringify(this._attr) : 'null')
		return printStr
	}

	get protocol() {
		return this._protocol
	}
	set protocol(value) {
		this._protocol = value
	}
	get address() {
		return this._address
	}
	set address(value) {
		this._address = value
	}
	get addressHost() {
		return this._address_host
	}
	set addressHost(value) {
		this._address_host = value
	}
	get realHost() {
		return this._real_host
	}
	set realHost(value) {
		this._real_host = value
	}
	get port() {
		return this._port
	}
	set port(value) {
		this._port = value
	}
	get suffix() {
		return this._suffix
	}
	set suffix(value) {
		this._suffix = value
	}
	get lo_type() {
		return this._lo_type
	}
	set lo_type(value) {
		this._lo_type = value
	}
	get isEncrptUrl() {
		return this._isEncrptUrl
	}
	set isEncrptUrl(value) {
		this._isEncrptUrl = value
	}
	get isEncrptParam() {
		if (this._protocol == 'https' || this._protocol == 'wss') {
			this._isEncrptParam = false
		} else {
			this._isEncrptParam = true
		}
		return this._isEncrptParam
	}
	set isEncrptParam(value) {
		this._isEncrptParam = value
	}
	get isHostNameVerfy() {
		return this._isHostNameVerfy
	}
	set isHostNameVerfy(value) {
		this._isHostNameVerfy = value
	}
	get cerName() {
		return this._cerName
	}
	set cerName(value) {
		this._cerName = value
	}
	get cerPath() {
		return this._cerPath
	}
	set cerPath(value) {
		this._cerPath = value
	}
	get isInnerRequest() {
		return this._isInnerRequest
	}
	set isInnerRequest(value) {
		this._isInnerRequest = value
	}
	get attr() {
		return this._attr
	}
	set attr(value) {
		this._attr = value
	}
	get param() {
		return this._parm
	}
	set param(value) {
		this._parm = value
	}
	get url_type() {
		return this._url_type
	}
	set url_type(value) {
		this._url_type = value
	}
	get id() {
		return this._id
	}
}
