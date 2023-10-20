import Urls from './Urls'

export default class Setting {
	//大厅心跳拉取跑马灯数量
	boardcastCount = 2

	//线路url配置地址
	Urls = new Urls()
	//应用id，CONN请求里面要用
	appId = 0
	//key
	signKey = ''
	//系统 1-web 2-android 3-ios
	osType = 1
	//版本号
	appVersion = ''
}
