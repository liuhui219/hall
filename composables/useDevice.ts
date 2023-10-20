import StorageKey from '~~/apis/tool/StorageKey'

export const useDeviceConfig = () =>
	useState('device_config', () => ({
		UA: '',
		mobile: false,
		pc: false,
		app: false,
		ios: false,
		android: false,
		webview: false,
		osType: 0,
	}))

//是否是手机
export function isMobile() {
	const useDevice = useDeviceConfig()
	return useDevice.value.mobile
}
//是否是PC
export function isPC() {
	const useDevice = useDeviceConfig()
	return useDevice.value.pc
}
//是否是官方原生端
export function isApp() {
	const useDevice = useDeviceConfig()
	return useDevice.value.app
}
//是否是ios
export function isIos() {
	const useDevice = useDeviceConfig()
	return useDevice.value.ios
}
//是否是iosApp
export function isIosApp() {
	return isIos() && isApp()
}
//是否是android
export function isAndroid() {
	const useDevice = useDeviceConfig()
	return useDevice.value.android
}
//是否是androidApp
export function isAndroidApp() {
	return isAndroid() && isApp()
}

//是否webview马甲包启动
export function isWebView() {
	const useDevice = useDeviceConfig()
	return useDevice.value.webview
}

//获取系统类型 0-未知 1-PC 2-安卓app 3-ios APP 4-安卓web 5-ios Web
export function getSysOsNumber() {
	const useDevice = useDeviceConfig()
	return useDevice.value.osType
}

//获取服务端需要的设备对象
export function getDeviceObject() {
	const useDevice = useDeviceConfig()
	let deviceObj = { device_id: vueGetLocal(StorageKey.WebDeviceUUID), os_type: getSysOsNumber(), UA: useDevice.value.UA }
	return deviceObj
}
