import Global from '../Global'
import ServerRoutes from '../net/route/ServerRoutes'

export default class Urls {
	//大厅请求线路列表
	_hallRoutes = null

	//过滤线路
	setRoutes(serverCfg) {
		let tempRoutes = []
		let routes = serverCfg.routes
		if (routes && routes.length > 0) {
			for (let i = 0; i < routes.length; i++) {
				let route = routes[i]
				if (route) {
					tempRoutes[tempRoutes.length] = route
				}
			}

			let sortFunc = (a, b) => {
				let subdomain = Global.Toolkit.getLevel2domain()
				if (Global.Toolkit.getLevel2domain(a.host) == subdomain) return -1
				if (Global.Toolkit.getLevel2domain(b.host) == subdomain) return 1
				let a_vip = a.vip ? a.vip : 0
				let b_vip = b.vip ? b.vip : 0
				return b_vip - a_vip
			}
			tempRoutes.sort(sortFunc)
		}

		//如果过滤后线路为空，就继续用原来的
		if (tempRoutes.length == 0) {
			tempRoutes = routes
		}
		if (tempRoutes) {
			// this._globalRoutes = new ServerRoutes();
			// this._globalRoutes.parse(tempRoutes);
			//防止登录之后收到serverroutes 导致url丢失
			if (this._hallRoutes == null) {
				this._hallRoutes = new ServerRoutes()
				this._hallRoutes.parse(tempRoutes)
			}
		}
	}

	//登录线路排序
	sortLoginRoutes() {
		if (this._hallRoutes) {
			this._hallRoutes.sortRoutes()
		}
	}
	//大厅线路进行排序
	sortHallRoutes(index) {
		if (this._hallRoutes) {
			if (index != null || index != undefined) {
				this._hallRoutes.sortRoutesByIndex(index)
			} else {
				this._hallRoutes.sortRoutes()
			}
		}
	}

	get hallRoutes() {
		return this._hallRoutes
	}

	set hallRoutes(routes) {
		this._hallRoutes = routes
	}

	get hallUrlSuffix() {
		let urlParam = Global.Toolkit.getUrlCommonParam()
		let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
		let hallUrlSuffix = '/mini/' + paramPrefix + '%s?_func=%s&' + urlParam
		return hallUrlSuffix
	}
}
