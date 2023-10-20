import Global from '../../Global'

export class HttpNetExtraData {
	//链接超时
	timeout = 3000
	//重连次数 默认为3次
	retryTotalTime = 3
	//线路集合
	serverRoutes
	//url后缀
	suffix
	//协议名称
	funcName
	//ServerUrl对象
	url
	//重试次数
	retryTimes = 0
	//请求参数
	param
	//成功回调函数
	onComplete
	//失败回调函数
	errorHandler
	//是否并行请求
	isParallelReq = false
	//线路num
	lineIndex = 0
	//缓存机制(0:不缓存，1-10000:按秒时效,10001:按天缓存)
	cache = 0

	refreshUrl() {
		let url = this.serverRoutes.getCurRoute().getUrl()
		let suffix = Global.UrlUtil.refreshSuffixOperTime(this.suffix)
		this.suffix = suffix
		url.suffix = url.suffix + suffix
		this.url = url
	}
}
