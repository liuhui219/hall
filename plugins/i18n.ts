import { selectLang } from '../composables/useLang'
import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin((nuxtApp: any) => {
	return {
		provide: {
			//语言切换e
			t: (key: String, options?: any): any => {
				if (!key) return ''
				return nuxtApp.$i18n.t(key, options)
			},
			pt: (from: { [x: string]: any }) => {
				if (from && typeof from == 'object') {
					const lang = selectLang()
					const result = from[lang.value]
					if (result) {
						return result
					}
					//如果对应的语言里面没有，就按照语言顺序去找，如果有则返回新语言数据，如果都没有则返回对应语言的数据
					let exResult = from['0'] //0为通用语种，找不到对应语种的情况下优先找这个
					if (!exResult) {
						let langKeys = Object.keys(langConf)
						for (let i = 0; i < langKeys.length; i++) {
							exResult = from[langKeys[i]]
							if (exResult) {
								break
							}
						}
					}
					if (exResult) {
						return exResult
					}
					return result
				} else {
					return ''
				}
			},
		},
	}
})
