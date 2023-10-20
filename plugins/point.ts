import { useSysConfigStore } from './../store/config'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
	return {
		provide: {
			//计算后端返回实际金额
			cp: (point: any, type = 3, defaultFix = 2) => {
				if (!point) return 0
				const conf = useSysConfigStore()
				const rate = conf.config.point_ratio || 10000
				let factor = Math.pow(10, defaultFix) // 放大系数 决定了保留多少小数位取整;
				let result = 0
				let plus = point > 0 ? 1 : -1 // debug记录正负, 处理负值情况
				point = Math.abs(point)
				switch (type) {
					case 1:
						result = (plus * Math.round((point * factor) / rate)) / factor
						break
					case 2:
						result = (plus * Math.ceil((point * factor) / rate)) / factor
						break
					case 3:
						result = (plus * Math.floor((point * factor) / rate)) / factor
						break
					default:
						result = (plus * Math.round((point * factor) / rate)) / factor
						break
				}
				return result
			},
			//金额格式化
			fp: (value: any, defaultFix = 2, bDeleteZeroPoint = false) => {
				if (value == null || value == '') {
					value == 0
				}
				let strings = '.',
					tag = ',',
					num = ''
				value = (value ?? '') + ''

				if (sysConfig['point_format'] == '1') {
					strings = ','
					tag = '.'
				}

				value = `${parseFloat(value.replace(/,/, '')).toFixed(defaultFix)}`.replace(tag, strings)
				if (value.indexOf(strings) == -1) {
					num = value.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s: any) {
						return s + tag
					})
				} else {
					num = value.replace(/(\d)(?=(\d{3})+(\,|\.))/g, function (s: any) {
						return s + tag
					})
				}
				if (bDeleteZeroPoint) {
					//整数要删除小数点以及后面的0
					let zeroPoint = strings
					for (let i = 0; i < defaultFix; i++) {
						zeroPoint += '0'
					}
					num = num.replace(zeroPoint, '')
				}
				return num || ''
			},
		},
	}
})
