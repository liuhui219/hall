import Global from '../Global'
import Md5Util from './Md5Util'

export default class UrlUtil {
	_mutiLinesSplit = [',', ';', '|']
	curReqId = 0

	domainURI(str_url) {
		if (!str_url) {
			return ''
		}
		let domain = str_url.split('/')
		let domainUrl = ''
		if (domain[2]) {
			domainUrl = domain[0] + '//' + domain[2]
		}
		return domainUrl
	}

	getHttpReffer(url) {
		let urlSubStr = this.domainURI(url)
		let newUrl = url.replace(urlSubStr, '')
		let sign = this.getPlatformSign(newUrl)
		return sign
	}

	getPlatformSign(content, key = '') {
		if (!key) {
			key = Global.Setting.signKey
		}
		let sign = this.getSign(key, content)
		return sign
	}

	getSign(key, content) {
		let msg = Md5Util.encode(content)
		msg = msg.substring(0, msg.length / 2)
		let checkKey = Md5Util.encode(key)
		checkKey = checkKey.substring(checkKey.length / 2)
		let data = Md5Util.encode(msg + checkKey)
		data = data.substring(5, 15)
		return data
	}

	dealServerUrl(serverUrl, port) {
		let address = serverUrl.address
		let protocol = serverUrl.protocol
		if (address.indexOf('...') > 0) {
			//强制转ws https 强转http
			if (protocol.startsWith('wss')) {
				protocol = 'ws://'
			}
			let hostArray = address.split('...')
			let ipPortUrl = hostArray[0]
			if (ipPortUrl.indexOf(':') > 0) {
				if (protocol.startsWith('https')) {
					protocol = 'http://'
				}
			}
			serverUrl.protocol = protocol
		}
		if (port != null && port != 0 && port != 80 && port != 443) {
			serverUrl.port = port
		}
	}

	// DealWithUrl(url){
	//     if(typeof (url) != "string" || !url){
	//         return null;
	//     }
	//     return url.replace("\t","").trim();
	// }

	//获取url 前缀flag
	getUrlParamCommonPrefex() {
		let appId = this.EncodeAppid(Global.Setting.appId)
		return '_' + appId + '/'
	}

	decimalDict = 'fgHijUvWXAbcdEyzKLMnOpqRst'

	//10进制转任意进制
	EncodeAppid(appId) {
		let new_num_str = ''
		let remainder = 0
		let remainder_string = ''
		let nn = 26
		let num = Number(appId)

		do {
			remainder = num % nn
			if (nn > remainder && remainder >= 0) {
				remainder_string = this.decimalDict.substring(remainder, remainder + 1)
			} else {
				remainder_string = remainder.toString()
			}
			new_num_str = remainder_string + new_num_str
			num = Math.floor(num / nn)
		} while (num != 0)

		return new_num_str
	}

	//获取时间字符串
	dealHttpSign(serverUrl) {
		let suffix = serverUrl.suffix
		let httpSignInfo = { sign_url: '', headSign: '', endSign: '' }
		serverUrl.suffix = this.refreshSuffixOperTime(suffix)
		let sign_url = serverUrl.getUrl()
		// let s_value = this.getQueryString(sign_url, 's')
		let headSign = ''
		let endSign = ''

		// let linkSymbol = (sign_url.indexOf('?') > 0 && '&s=') || '?s='
		// if (!s_value) {
		// 	headSign = this.getHttpReffer(sign_url)
		// 	endSign = this.getHttpReffer(sign_url + linkSymbol + headSign)
		// 	sign_url = sign_url + linkSymbol + endSign
		// } else {
		// 	let replaceUrl = sign_url.replace('&s=' + s_value, '')
		// 	headSign = this.getHttpReffer(replaceUrl)
		// 	endSign = this.getHttpReffer(replaceUrl + linkSymbol + headSign)
		// 	sign_url = replaceUrl + linkSymbol + endSign
		// }
		if (serverUrl.isEncrptUrl) {
			let sign_url_host = Global.Toolkit.getHostFromUrl(sign_url)
			let sign_url_array = sign_url.split(sign_url_host)
			if (sign_url_array && sign_url_array.length > 0) {
				let sign_url_first = sign_url_array[0]
				let sign_url_second = sign_url_array[1]
				let encryptStr = Global.AESUtil.aesEncryptWithCommonKey(sign_url_second)
				sign_url = sign_url_first + sign_url_host + '/' + encryptStr
			}
		}
		let arrs = sign_url.split('/')
		let sign_url_suffix = ''
		if (arrs.length > 3) {
			for (let i = 3; i < arrs.length; i++) {
				sign_url_suffix = sign_url_suffix + '/' + arrs[i]
			}
			serverUrl.suffix = sign_url_suffix
		}
		httpSignInfo.sign_url = sign_url
		httpSignInfo.headSign = headSign
		httpSignInfo.endSign = endSign
		return httpSignInfo
	}

	//对socket url 处理
	dealWebSocketUrl(serverUrl) {
		if (typeof serverUrl == 'string') {
			//捕鱼会发string url过来
			return serverUrl
		}
		let address = serverUrl.getUrl()

		if (address.indexOf('...') > 0) {
			let httpSignInfo = this.dealHttpSign(serverUrl)
			let sign_url = httpSignInfo.sign_url
			return sign_url
		}

		if (address.startsWith('wss')) {
			//wss协议的自动返回
			let httpSignInfo = this.dealHttpSign(serverUrl)
			let sign_url = httpSignInfo.sign_url
			return sign_url
		}

		let httpSignInfo = this.dealHttpSign(serverUrl)
		let sign_url = httpSignInfo.sign_url
		if (!sign_url) {
			return
		}
		let url = sign_url
		let isHttps = window.location.href.startsWith('https://')
		url = isHttps ? url.replace('ws://', 'wss://') : url

		return url
	}

	getQueryString(suffix, name) {
		let reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i')
		let r = suffix.match(reg)
		if (r != null) {
			return unescape(r[2])
		}
		return null
	}

	replaceUrlParmVal(url, paramName, replaceValue) {
		let urlRet = url
		if (url) {
			let re = eval('/(' + paramName + '=)([^&]*)/gi')
			let nUrl = url.replace(re, paramName + '=' + replaceValue)
			urlRet = nUrl
		}
		return urlRet
	}

	refreshSuffixOperTime(suffix) {
		if (suffix) {
			let m_value = this.getQueryString(suffix, 'm')
			if (m_value) {
				suffix = this.replaceUrlParmVal(suffix, 'm', new Date().valueOf())
			}
		}
		return suffix
	}

	refreshSuffixRetryTime(suffix, times) {
		if (!suffix) {
			return suffix
		}
		// let c_value = this.getQueryString(suffix, 'c')
		// if (!c_value) {
		// 	suffix = suffix + '&c=' + times
		// } else {
		// 	suffix = this.replaceUrlParmVal(suffix, '&c', times)
		// }
		return suffix
	}

	//设置线路是都需要证书
	setRouteUrlCer(serverUrl) {
		// let cerDirFiles = Global.Setting.SystemInfo.cerDirFiles
		// if(cerDirFiles && cerDirFiles.length > 0){
		//     let isHasCerFile = false;
		//     for(let i = 0; i < cerDirFiles.length; i++){
		//         let fileFullName = cerDirFiles[i];
		//         if(fileFullName && (fileFullName.indexOf(".cer") > -1) || fileFullName.indexOf(".crt") > -1){
		//             let tempArray = fileFullName.split("/");
		//             let lastFileName = tempArray[tempArray.length - 1];
		//             let fileName = lastFileName.replace(".cer","");
		//             let addressHost = serverUrl.addressHost.toLowerCase();
		//             if(fileName){
		//                 if(addressHost.indexOf(fileName.toLowerCase()) > -1){
		//                     serverUrl.cerName = fileFullName;
		//                     serverUrl.cerPath = fileFullName;
		//                     isHasCerFile = true;
		//                     break;
		//                 }
		//             }
		//         }
		//     }
		// }
	}

	//检查是否是多条地址同一个host
	checkIsMutiLinesSameHost(host) {
		let ret = false
		if (!host) {
			return
		}
		for (let i = 0; i < this._mutiLinesSplit.length; i++) {
			let splitStr = this._mutiLinesSplit[i]
			if (host.indexOf(splitStr) > 0) {
				ret = true
				break
			}
		}
		return ret
	}

	//获取同host多条线路集合
	getMutiLinesSameHost(host) {
		let lines = null
		if (!host) {
			return
		}
		for (let i = 0; i < this._mutiLinesSplit.length; i++) {
			let splitStr = this._mutiLinesSplit[i]
			if (host.indexOf(splitStr) > 0) {
				lines = host.split(splitStr)
				break
			}
		}
		return lines
	}
}
