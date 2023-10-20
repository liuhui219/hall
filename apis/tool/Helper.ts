import { mapFace } from '~~/apis/types'
import { useSysConfigStore } from './../../store/config'
import HallLog from '~~/apis/debug/HallLog'
import NativeEvent from './NativeEvent'
import validator from 'email-validator'
import { isArray } from '@vue/shared'
import StorageKey from './StorageKey'
export default class Helper {
	//邮箱验证
	static validEmail(email: string) {
		let result = !validator.validate(email || '')
		if (!result && email.includes('@gmail')) {
			let index = email.indexOf('@gmail')
			if (index > 30) {
				result = true
			}
			if (!result) {
				let reg = /^[A-Za-z0-9]+([\.]?[A-Za-z0-9]+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/
				result = !reg.test(email)
			}
		}
		return !result
	}
	static validPhone(acode: string, phone: string) {
		let result = false
		if (acode && phone) {
			try {
				// let key: any = ''
				// if (acode) {
				// 	let countrys = resConfig.country || []
				// 	key = countrys.find((el: any) => el.phone == acode)?.key as string
				// }
				// await this.initLibPhoneNumber()
				result = phone.charAt(0) == '0' || sysConfig.phone_length.indexOf(phone.length) < 0 //|| !this.isPossiblePhoneNumber(acode + phone, key)
			} catch (error) {
				HallLog.error('error', error)
				result = true
			}
		} else {
			result = true
		}
		return !result
	}

	// static isPossiblePhoneNumber: any = null
	// //导入phonenumber库
	// static initLibPhoneNumber() {
	// 	if (!this.isPossiblePhoneNumber) {
	// 		return new Promise((resolve, reject) => {
	// 			import('libphonenumber-js').then((res) => {
	// 				this.isPossiblePhoneNumber = res.isPossiblePhoneNumber
	// 				resolve(null)
	// 			})
	// 		})
	// 	} else {
	// 		return new Promise((resolve, reject) => {
	// 			resolve(null)
	// 		})
	// 	}
	// }
	//打开外链统一接口
	static toOutLink(url: string) {
		if (!url) return
		if (window.jsBridge && window.jsBridge.postMessage) {
			//三方马甲包定制
			window.jsBridge.postMessage('openURL', url)
		} else if (isApp()) {
			//官方APP：原生接口外跳浏览器打开
			NativeEvent.instance.openAppBrowser(url)
		} else if (isWebView()) {
			//三方马甲包：如果有外跳浏览器接口则浏览器打开，如果没有则根据技术配置处理
			if (window.jsbridge && window.jsbridge.openAppBrowser) {
				window.jsbridge.openAppBrowser(url)
			} else {
				//iframe打开
				openOther({ url })
			}
		} else {
			return window.open(url, '_blank')
		}
		return null
	}

	//用户对外发送短信统一接口
	static toSendSMS(phoneList: Array<string>, body: string) {
		let address = phoneList.join(',').replaceAll(' ', '')
		let url = `sms:${isIos() ? '/open?addresses=' : ''}${address}${isIos() ? '&' : '?'}body=${body}`
		url = encodeURI(url)
		Helper.toOutLink(url)
	}

	//获取外接游戏的返回url
	static getGameBackUrl(jumpMode: number) {
		let externalURL = ''
		if (jumpMode == 9) {
			externalURL = 'https://www.google.com/' //原生webview监测到返回此地址强制关闭webview
		} else if (jumpMode == 3) {
			externalURL = window.location.href.split('#')[0]
			externalURL = encodeURIComponent(externalURL)
		} else {
			const urlConfig = useUrlConfig()
			externalURL = urlConfig.value.origin + '/' + 'gameclose.html'
		}

		if (externalURL.indexOf('http://localhost') >= 0) {
			//此接口由于安全问题不支持localhost和ip地址
			externalURL = externalURL.replace('http://localhost', 'http://127.0.0.1')
		}
		HallLog.log('getGameBackUrl jumpMode-' + jumpMode + ' externalURL:' + externalURL)
		return externalURL
	}

	//随机[min， max)的整数
	static getRoundInteger(to: number, from = 0) {
		return Math.floor(from + Math.random() * (to - from))
	}
	//设置全局样式属性（用于包网）
	static setStyleProperty(key: string, val: string | null) {
		if (process.server) {
			return
		}
		if (!key || !val || !document) return
		document.documentElement.style.setProperty(key, val)
		HallLog.log('style.setProperty:' + key + ' = ' + val)
	}

	//执行js代码
	static renderJavascript(text: string, arr: any[]) {
		if (!text) return
		let findText = '</script>'
		let index = text.indexOf(findText)
		if (index != -1) {
			arr.push(text.substr(0, index + findText.length))
			this.renderJavascript(text.substr(index + findText.length + 1, text.length), arr)
		}
	}

	//执行js代码
	static runRegJavascript(text: string) {
		let arr: any[] = []
		text = text.replace(/<\!--[\s\S]*-->/gi, '')
		this.renderJavascript(text, arr)
		let reg = /\>(\s*[^\s]+\s*)+\</g
		arr.forEach((el) => {
			let from = el.replace(/\n/g, '')
			if (!reg.test(from)) {
				from = from
					.replace('<script', '')
					.replace(/\>[\s\S]*\<\/script\>?/gi, '')
					.replace(/\s\s/g, ' ')
					.trim()
				let script = document.createElement('script')
				let attrs = from.split(' ')
				attrs.forEach((item: string) => {
					try {
						let index = item.indexOf('=')
						if (index != -1) {
							let path = item.substr(index + 1, item.length).replace(/[\"\']/g, '')
							script.setAttribute(item.substr(0, index), path)
						}
					} catch (error) {
						HallLog.error('attrs foreach errorr', error)
					}
				})
				document.head.appendChild(script)
			} else {
				from = from.replace(/\<script[^<]*\>/g, '').replace('</script>', '')
				let script = document.createElement('script')
				script.innerHTML = from
				document.head.appendChild(script)
			}
		})
	}

	static formatDateM(time: number, type: number | undefined) {
		return this.formatDate(time / 1000, type)
	}
	static addZero(value: number) {
		return value < 10 ? '0' + value : value
	}
	static formatDate(time: number, type = 2) {
		if (!time) return ''
		let date = new Date(parseInt(`${time * 1000}`))
		let YY = date.getFullYear()
		let MM = this.addZero(date.getMonth() + 1)
		let DD = this.addZero(date.getDate())
		let hh = this.addZero(date.getHours())
		let mm = this.addZero(date.getMinutes())
		let ss = this.addZero(date.getSeconds())
		// 将时间从24小时格式转换为AM / PM格式
		let Ap = Number(hh) < 12 ? 'AM' : 'PM'
		let ApHH = Number(hh) < 12 ? hh : Number(hh) - 12
		switch (type) {
			case 1:
				return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`
			case 2:
				return `${YY}-${MM}-${DD} ${hh}:${mm}`
			case 3:
				return `${YY}-${MM}-${DD} ${hh}`
			case 4:
				return `${YY}-${MM}-${DD}`
			case 5:
				return `${MM}-${DD}`
			case 6:
				return `${mm}:${ss}`
			case 7:
				return `${MM}-${DD} ${hh}:${mm}`
			case 8:
				return `${hh}:${mm}:${ss}`
			case 9:
				return `${hh}:${mm}`
			case 10:
				return `${Number(hh) < 12 ? hh : Number(hh) - 12}:${mm} ${Number(hh) < 12 ? 'AM' : 'PM'}`
			case 11:
				return `${MM}-${DD} ${hh}:${mm}:${ss}`
			default:
				return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`
		}
	}
	static validCpf(a: any) {
		let add = 0
		let rev = 0
		let i = 0
		if (((a = a.replace(/[^\d]+/g, '')), '' == a)) return !1
		if (
			11 != a.length ||
			'00000000000' == a ||
			'11111111111' == a ||
			'22222222222' == a ||
			'33333333333' == a ||
			'44444444444' == a ||
			'55555555555' == a ||
			'66666666666' == a ||
			'77777777777' == a ||
			'88888888888' == a ||
			'99999999999' == a
		)
			return !1
		for (add = 0, i = 0; i < 9; i++) add += parseInt(a.charAt(i)) * (10 - i)
		if (((rev = 11 - (add % 11)), (10 == rev || 11 == rev) && (rev = 0), rev != parseInt(a.charAt(9)))) return !1
		for (add = 0, i = 0; i < 10; i++) add += parseInt(a.charAt(i)) * (11 - i)
		return (rev = 11 - (add % 11)), (10 == rev || 11 == rev) && (rev = 0), rev != parseInt(a.charAt(10)) ? !1 : !0
	}
	static validCnpj(cnpj: string): boolean {
		if (!cnpj) return false

		cnpj = cnpj.replace(/[^\d]+/g, '')

		if (cnpj === '') return false

		if (cnpj.length !== 14) return false

		if (
			cnpj == '00000000000000' ||
			cnpj == '11111111111111' ||
			cnpj == '22222222222222' ||
			cnpj == '33333333333333' ||
			cnpj == '44444444444444' ||
			cnpj == '55555555555555' ||
			cnpj == '66666666666666' ||
			cnpj == '77777777777777' ||
			cnpj == '88888888888888' ||
			cnpj == '99999999999999'
		)
			return false

		let tamanho: number = cnpj.length - 2
		let numeros: string = cnpj.substring(0, tamanho)
		let digitos: string = cnpj.substring(tamanho)
		let soma = 0
		let pos: number = tamanho - 7

		for (let i = tamanho; i >= 1; i--) {
			soma += parseInt(numeros.charAt(tamanho - i)) * pos--
			if (pos < 2) pos = 9
		}

		let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
		if (resultado !== parseInt(digitos.charAt(0))) return false

		tamanho = tamanho + 1
		numeros = cnpj.substring(0, tamanho)
		soma = 0
		pos = tamanho - 7

		for (let i = tamanho; i >= 1; i--) {
			soma += parseInt(numeros.charAt(tamanho - i)) * pos--
			if (pos < 2) pos = 9
		}

		resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
		if (resultado !== parseInt(digitos.charAt(1))) return false

		return true
	}

	static getErrnoStr(err: any, type?: any, option?: any) {
		let errno = Number(err._errno)
		let errstr = err._errstr
		let errClient = ''
		let app = useNuxtApp()
		let key = 'errno' + errno
		let errResultstr = app.$t(key, option)
		if (errResultstr == key) {
			//错误码没有找到对应翻译，上报给后端
			if (errno) {
				errResultstr = app.$t('errno16001')
				// errClient = '(invalid errno)'
			}
		}
		let errnostr = ''
		if (!type && errno) {
			errnostr = `[${errno}${errClient}]`
			if (errstr) {
				errnostr = `[${errno}${errClient}-${errstr}]`
			}
		}
		if (!errno) {
			return `${errResultstr}`
		} else {
			if (err._param && err._param.length) {
				let list: any = err._param
				list.forEach((el: any) => {
					let str = ''
					if (typeof el == 'number') {
						str = `<em class='text-number'>${useNuxtApp().$fp(el, 3, true)}</em>`
					} else {
						str = el
					}
					errResultstr = errResultstr.replace('$$', str)
				})
				return `${errResultstr}${errnostr}`
			} else {
				return `${errResultstr}${errnostr}`
			}
		}
	}

	//将自身的持久化url参数加到分享链接上
	static addMyUrlParamToLink(link: any) {
		if (link.startsWith('http')) {
			//上级复制链接给下级，自动加上自己的一些url参数
			let urlParams = ''
			const urlCodes = vueStorage(StorageKey.UrlCodes, {})
			let keyArr = ['gtk', 'ag']
			keyArr.forEach((ele) => {
				if (urlCodes.value[ele]) {
					if (urlParams) {
						urlParams += '&'
					}
					urlParams += ele + '=' + urlCodes.value[ele]
				}
			})
			link = Helper.urlAddParam(link, urlParams)
		} else {
			HallLog.error('addMyUrlParamToLink link is wrong, link:' + link)
		}
		return link
	}

	//复制功能
	static copyText(text: any, bUrlParams = false) {
		if (!text) {
			return
		}
		if (bUrlParams) {
			//上级复制链接给下级，自动加上自己的一些url参数
			text = Helper.addMyUrlParamToLink(text)
		}

		//方案一
		let domInput = document.createElement('input')
		domInput.setAttribute('readonly', 'readonly')
		domInput.style.position = 'absolute'
		domInput.style.left = '-10000px'
		domInput.style.zIndex = '-1'
		domInput.value = text
		document.body.appendChild(domInput) // 添加input节点
		domInput.select() // 选择对象;
		document.execCommand('Copy') // 执行浏览器复制命令
		useSysConfigStore().addErrorMessage({ id: 'copy_success', msg: `${useNuxtApp().$t('AF0003')}`, type: 'success' })
		domInput.remove()

		//方案二 无法兼容APP webview
		// const { copy } = useClipboard({ source: 'helper' })
		// const { addErrorMessage } = useSysConfigStore()
		// const { $t } = useNuxtApp()
		// copy('' + text)
		// 	.then((res) => {
		// 		addErrorMessage({ id: 'copy_success', type: 'success', msg: `${useNuxtApp().$t('AF0003')}`,  })
		// 	})
		// 	.catch((err) => {
		// 		addErrorMessage({ id: 'copy_uid_success', msg: $t('AF0003') })
		// 	})
	}

	static getAcodeFormat(acode: string) {
		return acode.replace(/\+/g, '')
	}

	//剩余时间计算
	static getTimeRemaining(endTime: number, total?: number) {
		if (total == null) {
			total = Math.floor(endTime - Math.round(Date.now() / 1000))
		}
		let day = parseInt(`${total / 60 / 60 / 24}`)
		let hour = parseInt(`${(total / 60 / 60) % 24}`)
		let minute = parseInt(`${(total / 60) % 60}`)
		let second = parseInt(`${total % 60}`)
		return {
			total,
			day,
			hour,
			minute,
			second,
		}
	}
	static renderTimeRemain(total: number) {
		let result = this.getTimeRemaining(1, total)
		let day = result.day
		let hour = this.addZero(result.hour)
		let minute = this.addZero(result.minute)
		let second = this.addZero(result.second)
		let returnStr = ''
		if (total > 0) {
			returnStr = `${day}D ${hour}:${minute}:${second}`
		} else {
			returnStr = ''
		}
		return returnStr
	}

	static renderTimeRemainFormat(total: number) {
		let result = this.getTimeRemaining(1, total)
		let day = result.day
		let hour = this.addZero(result.hour)
		let minute = this.addZero(result.minute)
		let second = this.addZero(result.second)
		let returnStr = ''
		if (total > 0) {
			returnStr = `${day}D ${hour}h:${minute}m:${second}s`
		} else {
			returnStr = ''
		}
		return returnStr
	}

	static renderTimeRemainNoDay(total: number, end?: number) {
		let result: any
		if (total != null) {
			result = this.getTimeRemaining(1, total)
		} else if (end) {
			result = this.getTimeRemaining(end)
		}
		let hour: any = this.addZero(result.hour + 24 * result.day)
		let minute = this.addZero(result.minute)
		let second = this.addZero(result.second)
		let returnStr = ''
		if (total > 0) {
			returnStr = `${hour}:${minute}:${second}`
		} else {
			returnStr = ''
		}
		return returnStr
	}

	static renderTimeRemainNoDayFormmat(total: number, end?: number) {
		let result: any
		if (total != null) {
			result = this.getTimeRemaining(1, total)
		} else if (end) {
			result = this.getTimeRemaining(end)
		}
		let hour: any = this.addZero(result.hour + 24 * result.day) + 'h'
		let minute = this.addZero(result.minute) + 'm'
		let second = this.addZero(result.second) + 's'
		let returnStr = ''
		if (total > 0) {
			returnStr = `${hour}:${minute}:${second}`
		} else {
			returnStr = ''
		}
		return returnStr
	}
	//拷贝对象内容 到 新对象 keyInclude:key包含某个字符串才拷贝,为空字符串则全部拷贝
	static assignObj(targetObj: mapFace, sourceObj: mapFace, keyInclude = '') {
		if (targetObj && sourceObj) {
			Object.keys(sourceObj).forEach((key) => {
				if (keyInclude == '' || key.indexOf(keyInclude) >= 0) {
					let sourceV = sourceObj[key]
					if (typeof sourceV == 'object' && typeof targetObj[key] == 'object') {
						if (isArray(sourceV)) {
							targetObj[key] = sourceV
						} else {
							this.assignObj(targetObj[key], sourceV)
						}
					} else {
						targetObj[key] = sourceV
					}
				}
			})
		}
		return targetObj
	}

	//给url加参数，主要将参数用于控制资源缓存
	static urlAddParam(srcUrl: string, reqParam: string, bIncludeHash = true) {
		let urlArr = srcUrl.split('#')
		let newUrl = urlArr[0]
		if (reqParam) {
			newUrl = newUrl.replace(reqParam, '')
			let pIndex = newUrl.indexOf('?')
			if (pIndex >= 0) {
				newUrl = newUrl.replace('?', '?' + reqParam + (pIndex != newUrl.length - 1 ? '&' : ''))
			} else {
				newUrl = urlArr[0] + '?' + reqParam
			}
		}
		if (bIncludeHash) {
			let urlHash = urlArr.length > 1 ? '#' + urlArr[1] : ''
			newUrl += urlHash
		}
		return newUrl
	}
	static getAvatarIndex(value: any) {
		return Number(value) % sysConfig.head_img_count || 0
	}
	static moldHeadImg(headImg: any) {
		return 'h_' + this.getAvatarIndex(headImg)
	}
}
