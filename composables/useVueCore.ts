import { useSessionStorage, useStorage } from '@vueuse/core'
import StorageKey from '~~/apis/tool/StorageKey'

//本地缓存全局函数
export function vueStorage(key: string, defaultValue: any) {
	return useStorage(key, defaultValue)
}

//本地会话缓存函数
export function vueSessionStorage(key: string, defaultValue: any) {
	return useSessionStorage(key, defaultValue)
}

export function vueCookieStorage(key: string, defaultValue: any) {
	return useCookie(key, defaultValue)
}

//浏览器本地多重保存
export function vueSetLocal(key: string, newValue: string) {
	const valueLocal = vueStorage(key, '')
	const valueSession = vueSessionStorage(key, '')
	const valueCookie = vueCookieStorage(key, { maxAge: 10 * 365 * 24 * 60 * 60 })
	valueLocal.value = newValue
	valueSession.value = newValue
	valueCookie.value = newValue
}
//浏览器本地多重获取
export function vueGetLocal(key: string, defaultValue = '') {
	let localValue = ''
	const valueLocal = vueStorage(key, defaultValue)
	const valueSession = vueSessionStorage(key, defaultValue)
	const valueCookie = vueCookieStorage(key, { maxAge: 10 * 365 * 24 * 60 * 60 })
	localValue = valueLocal.value || valueSession.value || valueCookie.value || defaultValue

	vueSetLocal(key, localValue)
	return localValue
}

//获取本地记录的用户行为(每个账号独立一份数据)
export function getUserAction(key: string) {
	let result = null
	const userStore = useUserStore()
	const userActions = vueStorage(StorageKey.USER_ACTIONS, {})
	let userActObj = userActions.value['' + userStore.uid]
	if (userActObj) {
		result = userActObj[key]
	}
	return result
}

//设置本地记录的用户行为(每个账号独立一份数据)
export function setUserAction(key: string, value: string) {
	const userStore = useUserStore()
	const userActions = vueStorage(StorageKey.USER_ACTIONS, {})
	if (!userActions.value['' + userStore.uid]) {
		userActions.value['' + userStore.uid] = {}
	}
	userActions.value['' + userStore.uid][key] = value
}
