import Global from '../Global'

var REGEXP_NUM_OR_STR = /(%d)|(%s)/
var REGEXP_STR = /%s/

export default class Toolkit {
	getHostFromUrl(url) {
		if (url == null || url == '') {
			return url
		}
		let arrs = url.split('//')
		let tempUrl = url
		if (arrs.length > 1) {
			tempUrl = arrs[1]
		}
		arrs = tempUrl.split('/')
		let host = arrs[0]
		if (host.indexOf(':') > -1) {
			host = host.split(':')[0]
		}
		return host
	}

	getPortFromUrl(url) {
		if (url == null || url == '') {
			return null
		}
		let arrs = url.split('//')
		let tempUrl = url
		if (arrs.length > 1) {
			tempUrl = arrs[1]
		}
		arrs = tempUrl.split('/')
		let hostUrl = arrs[0]
		let port = null
		if (hostUrl.indexOf(':') > -1) {
			port = hostUrl.split(':')[1]
		}
		if (port && Number(port)) {
			return Number(port)
		}
		return null
	}

	//替换空字符串
	strReplaceCtrChar(str) {
		if (str) {
			return str.replace(/[\x00-\x1f]+/g, '')
		}
		return str
	}

	//获取url 参数
	getUrlCommonParam(demoUid = 0, demoToken = '') {
		let uid = demoUid ? demoUid : Number(localStorage.getItem('Uid'))
		let token = demoToken ? demoToken : localStorage.getItem('Token')
		token = token ? token : ''
		let param =
			'uid=' + uid + '&token=' + token + '&appver=' + Global.Setting.appVersion + '&os=' + Global.Setting.osType + '&m=' + new Date().valueOf()
		return param
	}

	/**
	 * 获取当前 URL 二级域名
	 * 如果当前是 IP 地址，则直接返回 IP Address
	 */
	getLevel2domain(tarDomain = '') {
		try {
			let subdomain = ''
			let { domain } = document
			if (tarDomain != '') domain = tarDomain
			const domainList = domain.split('.')

			const ipAddressReg =
				/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

			/* 若当前域名为 IP 地址、localhost，采用一种特殊的处理
            （只用于我们的测试环境，此部分代码不具有通用性）
             */
			if (ipAddressReg.test(domain) || domain === 'localhost') {
				let level3domain = document.domain
				let pattern = /^.*?\b\.\b/
				return level3domain.replace(pattern, '')
			}

			const urlItems = []
			urlItems.unshift(domainList.pop())

			while (urlItems.length < 2) {
				urlItems.unshift(domainList.pop())
				subdomain = urlItems.join('.')
			}

			return subdomain || document.domain
		} catch (e) {
			return document.domain
		}
	}

	/**
	 * 全局拼接字符串方法
	 * @param  {...any} args 参数/例如（11%s,2）=> 112
	 */
	formatStr(...args) {
		var argLen = args.length
		if (argLen === 0) {
			return ''
		}
		var msg = args[0]
		if (argLen === 1) {
			return '' + msg
		}

		var hasSubstitution = typeof msg === 'string' && REGEXP_NUM_OR_STR.test(msg)
		if (hasSubstitution) {
			for (let i = 1; i < argLen; ++i) {
				var arg = args[i]
				var regExpToTest = typeof arg === 'number' ? REGEXP_NUM_OR_STR : REGEXP_STR
				if (regExpToTest.test(msg)) msg = msg.replace(regExpToTest, arg)
				else msg += ' ' + arg
			}
		} else {
			for (let i = 1; i < argLen; ++i) {
				msg += ' ' + args[i]
			}
		}
		return msg
	}
}
