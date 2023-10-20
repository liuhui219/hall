import StorageKey from '~~/apis/tool/StorageKey'
import { mapFace } from '~~/apis/types'

//语言配置
export const langConf = <mapFace>{
	'1': { i18n: 'en-US', betby: 'en', text: 'English', value: '1', origin: 'en' },
	'11': { i18n: 'pt-BR', betby: 'pt-br', text: 'Português', value: '11', origin: 'pt' },
	'12': { i18n: 'es-ES', betby: 'es-es', text: 'Español', value: '12', origin: 'es' },
}
export const betbyLang = () => useState('betby_lang', () => 'en')
//当前选择得语言
export const selectLang = () => useState('select_lang', () => '11')

export const getLangText = (i18nKey: string) => {
	//缓存中有使用缓存 没有拉取
	useNuxtApp().$i18n.setLocale(i18nKey)
}

//得当前选择得语言显示文本
export const getSelectLangText = () => {
	const lang = selectLang()
	const i18n = langConf[lang.value] ?? langConf['11']
	return i18n.text
}
