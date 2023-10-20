import { mapFace } from '~~/apis/types'
import StorageKey from '~~/apis/tool/StorageKey'
import Md5Util from '~~/core/utils/Md5Util'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
import { NetLogin } from '~~/core/apis/hall/NetEvent'

//请求渠道配置——走login进程
export const useCheckVersion = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.mod = NetLogin.root
	useHttpConn('checkversion', params, onSuc, onError)
}
//获取验证码——走login进程
export const useGetVerifyCode = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.mod = NetLogin.verifycode
	params.body.lang = Number(selectLang().value)
	useHttpConn('GetPhoneVerifyCode', params, onSuc, onError)
}
//忘记密码：验证码验证 //to do 需要走login进程
export const useForgetCodeCheck = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	useHttpConn('NewForgetCodeCheck', params, onSuc, onError)
}
//忘记密码：修改密码 //to do 需要走login进程
export const useForgetAccountPwd = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	useHttpConn('NewForgetAccountPwd', params, onSuc, onError)
}

//自动登录——走login进程
export const useLoginByAuto = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	updateSourceMapData()
	params.mod = NetLogin.login
	params.body.os_type = getSysOsNumber()
	const urlSourceMap = useUrlSourceMap()
	const urlFirstMap = useUrlFirstMap()
	params.body.source_map = JSON.stringify(urlSourceMap.value)
	params.body.first_map = JSON.stringify(urlFirstMap.value)

	params.body.device = getDeviceObject()

	useHttpConn('VisitorLogin', params, onSuc, onError)
}

//账号登录——走login进程
export const useLoginByAccount = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	saveCookieExtraData()
	updateSourceMapData()
	params.mod = NetLogin.login
	params.body.os_type = getSysOsNumber()
	const urlSourceMap = useUrlSourceMap()
	const urlFirstMap = useUrlFirstMap()
	const lastUid = vueStorage(StorageKey.LastUid, 0)
	params.body.source_map = JSON.stringify(urlSourceMap.value)
	params.body.first_map = JSON.stringify(urlFirstMap.value)
	params.body.uid = lastUid.value

	params.body.pack = useCheckversionChannel().value

	params.body.device = getDeviceObject()

	let sdkData = { ...fbSdkData, ...afSdkData, ...kwaiSdkData, ...tiktokSdkData, ...fbXyjSdkData }
	params.body.app_sdk_data = JSON.stringify(sdkData)

	params.body.secret = Md5Util.encode(useAfunFront().value + params.body.pwd + useAfunBack().value)

	let methods = 'UserAccountLogin'
	if (params.thirdLoginObj) {
		if (!params.body.invite_code && useUrlIc().value) {
			//三方登录要带上 邀请码
			params.body.invite_code = Number(useUrlIc().value)
		}
		methods = params.thirdLoginObj.methods
		delete params.thirdLoginObj.methods
		Helper.assignObj(params.body, params.thirdLoginObj)
		delete params.thirdLoginObj
	}
	useHttpConn(methods, params, onSuc, onError)
}

//注册——走login进程
export const useUserRegister = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	saveCookieExtraData()
	updateSourceMapData()
	params.mod = NetLogin.login
	params.body.os_type = getSysOsNumber()
	const urlSourceMap = useUrlSourceMap()
	const urlFirstMap = useUrlFirstMap()
	params.body.source_map = JSON.stringify(urlSourceMap.value)
	params.body.first_map = JSON.stringify(urlFirstMap.value)

	params.body.pack = useCheckversionChannel().value

	//source_param 这个参数似乎没用，冗余数据过多，数据包太大，请求可能返回413
	// const AppUrl = useUrlConfig()
	// params.body.source_param = '' + AppUrl.value.searchParams

	params.body.device = getDeviceObject()

	if (!useUrlMediaSource().value['atype']) {
		updateMediaSource()
	}

	let sdkData = { ...fbSdkData, ...afSdkData, ...kwaiSdkData, ...tiktokSdkData, ...fbXyjSdkData, ...useUrlMediaSource().value }
	params.body.app_sdk_data = JSON.stringify(sdkData)

	params.body.secret = Md5Util.encode(useAfunFront().value + params.body.pwd + useAfunBack().value)
	useHttpConn('UserRegister', params, onSuc, onError)
}

//打开页面：上报
export const useUploadContentView = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	let sdkData = { ...kwaiSdkData }
	if (!kwaiSdkData['kwai_click_id']) {
		HallLog.log('useUploadContentView return', sdkData)
		return
	}
	params.body.app_sdk_data = JSON.stringify(sdkData)

	useHttpConn('UploadContentView', params, onSuc, onError)
}

//通用后端上报接口
export const useCreateReport = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	let sdkData = { ...fbXyjSdkData }
	if (!fbXyjSdkData['xiaoyaoji_unique_id']) {
		HallLog.log('useCreateReport return', sdkData)
		return
	}
	params.body.app_sdk_data = JSON.stringify(sdkData)

	useHttpConn('CreateReport', params, onSuc, onError)
}

//获取用户信息
export const useGetUserInfo = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUserInfoV2', params, onSuc, onError)
}
//获取用户余额
export const useGetUserWallets = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUserPointV2', params, onSuc, onError)
}

//更新客户端数据给后端保存到userInfo下
export const useSaveClientJson = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('SaveClientJson', params, onSuc, onError)
}

//进入游戏——无需登录态 【真玩需要登录态，由后端业务层处理】
export const useEnterGame = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	useHttpConn('EnterGame', params, onSuc, onError)
}

//使用礼包码
export const useGiftcodereward = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('UseGiftCode', params, onSuc, onError)
}

//请求优惠道具列表
export const useGetpPromoitemList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetPromoItemList', params, onSuc, onError)
}
//使用道具
export const useApplyPromoItem = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('UsePromoItem', params, onSuc, onError)
}
//提现列表
export const useGetPutList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetPutList', params, onSuc, onError)
}
//提现列表新
export const useGetWithdrawChannel = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetWithdrawChannel', params, onSuc, onError)
}

//充值配置
export const useGetPayInfo = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetNewPayConfig', params, onSuc, onError)
}

//充值
export const usePay = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true

	if (googleEventValid()) {
		saveCookieExtraData()
		let sdkData = { ...fbSdkData, ...afSdkData, ...kwaiSdkData, ...tiktokSdkData, ...fbXyjSdkData }
		params.body.app_sdk_data = JSON.stringify(sdkData)
	}
	useHttpConn('UserNewDownPay', params, onSuc, onError)
}

//获取充值信息
export const useGetPayResult = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUserDownPayData', params, onSuc, onError)
}

//新充值配置 根据checkversion返回字段判断使用哪个接口
export const useGetPayChannel = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetPayChannel', params, onSuc, onError)
}

//新充值
export const useNewPay = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true

	if (googleEventValid()) {
		saveCookieExtraData()
		let sdkData = { ...fbSdkData, ...afSdkData, ...kwaiSdkData, ...tiktokSdkData, ...fbXyjSdkData }
		params.body.app_sdk_data = JSON.stringify(sdkData)
	}
	useHttpConn('UserPay', params, onSuc, onError)
}
//新获取充值信息
export const useGetUserPayUrl = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUserPayUrl', params, onSuc, onError)
}

//提现申请
export const useApplyCashv2 = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true

	// if (googleEventValid()) {
	// 	saveCookieExtraData()
	// 	let sdkData = { ...fbSdkData, ...afSdkData, ...kwaiSdkData, ...tiktokSdkData, ...fbXyjSdkData }
	// 	params.body.app_sdk_data = JSON.stringify(sdkData)
	// }
	useHttpConn('ApplyCashv2', params, onSuc, onError)
}

//提现申请新
export const useUserWithdraw = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true

	// if (googleEventValid()) {
	// 	saveCookieExtraData()
	// 	let sdkData = { ...fbSdkData, ...afSdkData, ...kwaiSdkData, ...tiktokSdkData, ...fbXyjSdkData }
	// 	params.body.app_sdk_data = JSON.stringify(sdkData)
	// }
	useHttpConn('UserWithdraw', params, onSuc, onError)
}

//编辑用户信息
export const useEditUserInfo = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('EditUserInfo', params, onSuc, onError)
}

//修改用户手机号
export const useEditUserPhone = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('NewBindPhone', params, onSuc, onError)
}

//修改邮箱
export const useEditUserEmail = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('NewBindEmail', params, onSuc, onError)
}

//修改密码
export const useEditPassword = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('NewEditAccountPwd', params, onSuc, onError)
}

//新增密码
export const useAddPassword = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('AddAccountPwd', params, onSuc, onError)
}

//绑定手机号
export const useBindPhone = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('SaveNoBindPhone', params, onSuc, onError)
}
//绑定邮箱
export const useBindEmail = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('SaveNoBindEmail', params, onSuc, onError)
}

//获取分享代理链接
export const getUserShareurl = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUserShareUrl', params, onSuc, onError)
}

//获取代理相关数据
export const getshareinvitesummary = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetShareInviteSummary', params, onSuc, onError)
}

//查询分享代理Record记录
export const getUnderUserDepositAgentRecord = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUnderUserDepositAgentRecord', params, onSuc, onError)
}

//任务列表
export const useGetMyTaskInfo = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetMyTaskActivityInfo', params, onSuc, onError)
}

//领取任务宝箱
export const useGetUserTaskPointReward = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUserTaskPointReward', params, onSuc, onError)
}

//投注记录
export const useGetGameRecord = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetGameRecord', params, onSuc, onError)
}

//获取邮件公告列表 type 0 所有 1公告 2邮件
export const useGetMessageList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetMsgList', params, onSuc, onError)
}

//读邮件
export const useReadMsg = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('ReadMsg', params, onSuc, onError)
}

//用户充值列表
export const useGetUserPayList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUserPayList', params, onSuc, onError)
}

//用户提现列表
export const useApplyCashList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('ApplyCashList', params, onSuc, onError)
}

//用户提现记录新
export const useGetWithdrawRecord = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetWithdrawRecord', params, onSuc, onError)
}

export const useGetBillRecord = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetBillRecord', params, onSuc, onError)
}

//获取奖励列表
export const useMyRewards = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('MyRewards', params, onSuc, onError)
}
//申请奖励
export const useReceiveRewards = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('ReceiveRewards', params, onSuc, onError)
}
//获取奖励记录
export const useMyRewardHistory = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('MyRewardHistory', params, onSuc, onError)
}
//转盘：抽奖
export const useReceiveActivityAward = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('ReceiveActivityAward', params, onSuc, onError)
}

//轮播转盘抽奖记录——无需登录态
export const useGetHistory = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetHistory', params, onSuc, onError)
}

//设置收藏游戏
export const useCollectgame = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('CollectGame', params, onSuc, onError)
}
//获取游收藏游戏最近游戏列表
export const useMyGameList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('MyGameList', params, onSuc, onError)
}
//从游戏中退出
export const useQuitGame = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('QuitGame', params, onSuc, onError)
}
//活动：执行操作 【签到】
export const useDoActivity = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('DoActivity', params, onSuc, onError)
}
//活动：获取我的活动明细 【签到】
export const useGetActivityDetail = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetActivityDetails', params, onSuc, onError)
}
//主页：游戏中大奖记录——无需登录态
export const useGetGamewinrecord = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	useHttpConn('GetGameWinRecord', params, onSuc, onError)
}

//充值：充值前 获取绑定信息
export const useGetPutBindInfo = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetPutBindInfo', params, onSuc, onError)
}
//充值提现：充值提现前 绑定CPF账号
export const useBindPutAccountInfo = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('BindPutAccountInfo', params, onSuc, onError)
}

//红点
export const useGetUserTodoDetails = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetUserTodoDetails', params, onSuc, onError)
}

//保存账号
export const useSaveLoginAccount = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('SaveLoginAccount', params, onSuc, onError)
}

//彩金列表
export const useGetBonusList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetBonusList', params, onSuc, onError)
}

//彩金删除
export const useDelBonus = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('DelBonus', params, onSuc, onError)
}

//彩金领取
export const useExchangeBonus = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('ExchangeBonus', params, onSuc, onError)
}

//彩金记录
export const useGetBonusHistory = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetBonusHistory', params, onSuc, onError)
}

//获取游戏化token
export const useGetBoardToken = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	useHttpConn('GetBoardToken', params, onSuc, onError)
}

// 代理 获取FriendList列表
export const useGetDlFriendList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	params.mod = 'userAgent'
	useHttpConn('GetRewardListOfFriendListOfActivity', params, onSuc, onError)
}

// 代理 FriendList列表点击用户名下级详情
export const useGetDlFriendChild = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	params.mod = 'userAgent'
	useHttpConn('GetFriendDetail', params, onSuc, onError)
}

// 代理 History 列表
export const useGetDlHistoryList = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	params.mod = 'userAgent'
	useHttpConn('GetRewardDetailList', params, onSuc, onError)
}

// 代理 代理用户面板1数据   获取代理总的活动奖励，未领取的活动奖励，当天产生的奖励,获取代理活动所有库存奖励
export const useGetDlRewardAmount = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	params.mod = 'userAgent'
	useHttpConn('GetRewardAmount', params, onSuc, onError)
}

// 代理 代理用户面板2数据  获取代理活动所有库存奖励详情，按天和按月进行查询
export const useGetDlRewardAmount2 = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	params.mod = 'userAgent'
	useHttpConn('GetRewardAmountDetails', params, onSuc, onError)
}

// 代理 领取活动奖励
export const useReceiveDlUserReward = (params: mapFace = {}, onSuc: any = null, onError: any = null) => {
	params.login = true
	params.mod = 'userAgent'
	useHttpConn('ReceiveUserReward', params, onSuc, onError)
}
