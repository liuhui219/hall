import { NatsRequest, ESMR_SUCCEED, ESMR_FAILED, RetMsg } from "../nats/libNats"
import { MsgBody } from "../nats/request"

import * as components from "~/types/appserverComponents"
export * from "~/types/appserverComponents"
const mod = "http_mini.appserver"
/**
 * @description 配置内容
 * @param req
 */
export async function GetIndex(req: components.IndexReq, nasCommons: any = {}) {
	const func = "GetIndex"
	let rsp: components.IndexRsp 
	rsp = <components.IndexRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 系统配置
 * @param req
 */
export async function GetSysConfig(req: components.SysConfigReq, nasCommons: any = {}) {
	const func = "GetSysConfig"
	let rsp: components.SysConfigRsp 
	rsp = <components.SysConfigRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description node需要的配置
 */
export async function GetNodeConfig(nasCommons: any = {}) {
	const func = "GetNodeConfig"
	let rsp: components.NodeConfigRsp 
	rsp = <components.NodeConfigRsp> await NatsRequest(mod, func,{}, true, nasCommons) 
	return rsp
}

/**
 * @description 邮件登录
 * @param req
 */
export async function UserEmailLogin(req: components.UserLoginReq, nasCommons: any = {}) {
	const func = "UserEmailLogin"
	let rsp: components.UserLoginRsp 
	rsp = <components.UserLoginRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 手机登录
 * @param req
 */
export async function UserPhoneLogin(req: components.UserLoginReq, nasCommons: any = {}) {
	const func = "UserPhoneLogin"
	let rsp: components.UserLoginRsp 
	rsp = <components.UserLoginRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取验证码
 * @param req
 */
export async function Verifycode(req: components.GetVerifyCodeReq, nasCommons: any = {}) {
	const func = "Verifycode"
	let rsp: components.VerifyCodeRsp 
	rsp = <components.VerifyCodeRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 检测手机号是否存在
 * @param req
 */
export async function HadPhoneReg(req: components.HadPhoneRegReq, nasCommons: any = {}) {
	const func = "HadPhoneReg"
	let rsp: components.HadAccountRegRsp 
	rsp = <components.HadAccountRegRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 检测邮箱是否存在
 * @param req
 */
export async function HadEmailReg(req: components.HadEmailRegReq, nasCommons: any = {}) {
	const func = "HadEmailReg"
	let rsp: components.HadAccountRegRsp 
	rsp = <components.HadAccountRegRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 账号注册
 * @param req
 */
export async function UserRegister(req: components.UserLoginReq, nasCommons: any = {}) {
	const func = "UserRegister"
	let rsp: components.UserLoginRsp 
	rsp = <components.UserLoginRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 检查登录态
 * @param req
 */
export async function CheckLogin(req: components.CheckLoginReq, nasCommons: any = {}) {
	const func = "CheckLogin"
	let rsp: components.TokenInfoRsp 
	rsp = <components.TokenInfoRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 修改未绑定手机号码
 * @param req
 */
export async function SaveNoBindPhone(req: components.SaveNoBindPhoneReq, nasCommons: any = {}) {
	const func = "SaveNoBindPhone"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 修改未绑定邮箱
 * @param req
 */
export async function SaveNoBindEmail(req: components.SaveNoBindEmailReq, nasCommons: any = {}) {
	const func = "SaveNoBindEmail"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 绑定手机号码
 * @param req
 */
export async function NewBindPhone(req: components.NewBindAccountReq, nasCommons: any = {}) {
	const func = "NewBindPhone"
	let rsp: components.BindPhoneRsp 
	rsp = <components.BindPhoneRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 绑定邮箱
 * @param req
 */
export async function NewBindEmail(req: components.NewBindAccountReq, nasCommons: any = {}) {
	const func = "NewBindEmail"
	let rsp: components.BindPhoneRsp 
	rsp = <components.BindPhoneRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 修改用户登录密码
 * @param req
 */
export async function NewEditAccountPwd(req: components.NewEditPwdReq, nasCommons: any = {}) {
	const func = "NewEditAccountPwd"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 检测验证码是否正确
 * @param req
 */
export async function NewForgetCodeCheck(req: components.NewForgetCodeCheckReq, nasCommons: any = {}) {
	const func = "NewForgetCodeCheck"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 保存用户密码
 * @param req
 */
export async function NewForgetAccountPwd(req: components.NewForgetPwdReq, nasCommons: any = {}) {
	const func = "NewForgetAccountPwd"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 用户打开连接
 * @param req
 */
export async function UserOpen(req: components.UserOpenReq, nasCommons: any = {}) {
	const func = "UserOpen"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 心跳
 * @param req
 */
export async function HeartBeat(req: components.HeartBeatReq, nasCommons: any = {}) {
	const func = "HeartBeat"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 离线
 * @param req
 */
export async function OffLine(req: components.UserOpenReq, nasCommons: any = {}) {
	const func = "OffLine"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 游戏链接
 * @param req
 */
export async function EnterGame(req: components.EnterGameReq, nasCommons: any = {}) {
	const func = "EnterGame"
	let rsp: components.EnterGameRsp 
	rsp = <components.EnterGameRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 离开游戏
 */
export async function QuitGame(nasCommons: any = {}) {
	const func = "QuitGame"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func,{}, true, nasCommons) 
	return rsp
}

/**
 * @description 获取游戏列表 通过分类 平台
 * @param req
 * @param headers
 */
export async function GetGameListFilter(req: components.GetGameListReq, nasCommons: any = {}) {
	const func = "GetGameListFilter"
	let rsp: components.GetGameListRsp 
	rsp = <components.GetGameListRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取所有奖池
 * @param req
 */
export async function GetJackPorts(req: components.NullReq, nasCommons: any = {}) {
	const func = "GetJackPorts"
	let rsp: components.GetJackPortsListRsp 
	rsp = <components.GetJackPortsListRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取平台玩家中奖信息
 * @param req
 */
export async function GetGameWinRecord(req: components.NullReq, nasCommons: any = {}) {
	const func = "GetGameWinRecord"
	let rsp: components.GetGameWinRecordRsp 
	rsp = <components.GetGameWinRecordRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 活动配置
 */
export async function GetActivityCfg(nasCommons: any = {}) {
	const func = "GetActivityCfg"
	let rsp: components.ActivityCfgRsp 
	rsp = <components.ActivityCfgRsp> await NatsRequest(mod, func,{}, true, nasCommons) 
	return rsp
}

/**
 * @description 我的活动配置
 * @param req
 */
export async function GetMyActivityList(req: components.NullReq, nasCommons: any = {}) {
	const func = "GetMyActivityList"
	let rsp: components.GetMyActivityListRsp 
	rsp = <components.GetMyActivityListRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 我要领取活动奖励
 * @param req
 */
export async function ReceiveActivityAward(req: components.ReceivActivityAwardReq, nasCommons: any = {}) {
	const func = "ReceiveActivityAward"
	let rsp: components.ReceivActivityAwardRsp 
	rsp = <components.ReceivActivityAwardRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 转盘奖励轮播
 */
export async function GetActivityAwardRecord(nasCommons: any = {}) {
	const func = "GetActivityAwardRecord"
	let rsp: components.GetActivityAwardRecordRsp 
	rsp = <components.GetActivityAwardRecordRsp> await NatsRequest(mod, func,{}, true, nasCommons) 
	return rsp
}

/**
 * @description 推广的彩金信息
 * @param req
 */
export async function GetShareAgentInfo(req: components.GetShareAgentReq, nasCommons: any = {}) {
	const func = "GetShareAgentInfo"
	let rsp: components.GetShareAgentInfoRsp 
	rsp = <components.GetShareAgentInfoRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 用户推广邀请统计
 */
export async function GetShareInviteSummary(nasCommons: any = {}) {
	const func = "GetShareInviteSummary"
	let rsp: components.GetShareInviteSummaryRsp 
	rsp = <components.GetShareInviteSummaryRsp> await NatsRequest(mod, func,{}, true, nasCommons) 
	return rsp
}

/**
 * @description 获取直属下级用户充值和返佣记录
 * @param req
 * @param headers
 */
export async function GetUnderUserDepositAgentRecord(req: components.GetUnderUserDepositAgentRecordReq, nasCommons: any = {}) {
	const func = "GetUnderUserDepositAgentRecord"
	let rsp: components.GetUnderUserDepositAgentRecordRsp 
	rsp = <components.GetUnderUserDepositAgentRecordRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 转盘使用记录
 * @param req
 * @param headers
 */
export async function GetActivityZhuanpanUseRecord(req: components.GetActivityRecordReq, nasCommons: any = {}) {
	const func = "GetActivityZhuanpanUseRecord"
	let rsp: components.GetActivityRecordRsp 
	rsp = <components.GetActivityRecordRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 用户参与活动（例如：签到）
 * @param req
 */
export async function DoActivity(req: components.ActivityReq, nasCommons: any = {}) {
	const func = "DoActivity"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 用户参与活动的信息
 * @param req
 */
export async function GetActivityDetails(req: components.ActivityReq, nasCommons: any = {}) {
	const func = "GetActivityDetails"
	let rsp: components.GetDetailsRsp 
	rsp = <components.GetDetailsRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取支付配置
 * @param req
 */
export async function GetNewPayConfig(req: components.NullReq, nasCommons: any = {}) {
	const func = "GetNewPayConfig"
	let rsp: components.GetPayConfigRsp 
	rsp = <components.GetPayConfigRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 用户游戏记录
 * @param req
 */
export async function ReportGameAwardData(req: components.ReportGameData, nasCommons: any = {}) {
	const func = "ReportGameAwardData"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 限时首充100%返利配置信息
 * @param req
 */
export async function GetLimitTimeFirstPayActivityCfg(req: components.NullReq, nasCommons: any = {}) {
	const func = "GetLimitTimeFirstPayActivityCfg"
	let rsp: components.GetLimitTimeFirstPayActivityCfgRsp 
	rsp = <components.GetLimitTimeFirstPayActivityCfgRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 领取礼包码
 * @param req
 */
export async function GetGiftCodeReward(req: components.GetGiftCodeRewardReq, nasCommons: any = {}) {
	const func = "GetGiftCodeReward"
	let rsp: components.GetGiftCodeRewardRsp 
	rsp = <components.GetGiftCodeRewardRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取个人优惠道具列表
 * @param req
 * @param headers
 */
export async function GetPromoItemList(req: components.GetPromoItemListReq, nasCommons: any = {}) {
	const func = "GetPromoItemList"
	let rsp: components.GetPromoItemListRsp 
	rsp = <components.GetPromoItemListRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 个人使用优惠道具
 * @param req
 */
export async function UsePromoItem(req: components.UsePromoItemReq, nasCommons: any = {}) {
	const func = "UsePromoItem"
	let rsp: components.UsePromoItemRsp 
	rsp = <components.UsePromoItemRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 个人优惠道具使用记录
 * @param req
 * @param headers
 */
export async function PromoItemUseRecord(req: components.PromoItemUseRecordReq, nasCommons: any = {}) {
	const func = "PromoItemUseRecord"
	let rsp: components.PromoItemUseRecordRsp 
	rsp = <components.PromoItemUseRecordRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 个人使用优惠道具
 * @param req
 */
export async function MgrUsePromoItem(req: components.UsePromoItemReq, nasCommons: any = {}) {
	const func = "MgrUsePromoItem"
	let rsp: components.UsePromoItemRsp 
	rsp = <components.UsePromoItemRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取用户所有任务信息
 * @param req
 */
export async function GetMyTaskActivityInfo(req: components.GetMyTaskActivityInfoReq, nasCommons: any = {}) {
	const func = "GetMyTaskActivityInfo"
	let rsp: components.GetMyTaskActivityInfoRsp 
	rsp = <components.GetMyTaskActivityInfoRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 领取任务积分奖励
 * @param req
 */
export async function GetUserTaskPointReward(req: components.GetUserTaskPointRewardReq, nasCommons: any = {}) {
	const func = "GetUserTaskPointReward"
	let rsp: components.GetUserTaskPointRewardRsp 
	rsp = <components.GetUserTaskPointRewardRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取用户信息
 * @param req
 */
export async function GetUserInfo(req: components.NullReq, nasCommons: any = {}) {
	const func = "GetUserInfo"
	let rsp: components.GetUserInfoRsp 
	rsp = <components.GetUserInfoRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取用户金币
 * @param req
 */
export async function GetUserPoint(req: components.NullReq, nasCommons: any = {}) {
	const func = "GetUserPoint"
	let rsp: components.GetUserPointRsp 
	rsp = <components.GetUserPointRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 修改用户昵称头像
 * @param req
 */
export async function EditUserInfo(req: components.EditUserInfoReq, nasCommons: any = {}) {
	const func = "EditUserInfo"
	let rsp: components.NullRsp 
	rsp = <components.NullRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 查询的绑定银行信息
 * @param req
 */
export async function GetBankInfo(req: components.GetBankInfoReq, nasCommons: any = {}) {
	const func = "GetBankInfo"
	let rsp: components.GetBankInfoRsp 
	rsp = <components.GetBankInfoRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 获取短地址
 * @param req
 */
export async function GetUserShareUrl(req: components.GetUserShareUrlReq, nasCommons: any = {}) {
	const func = "GetUserShareUrl"
	let rsp: components.GetUserShareUrlRsp 
	rsp = <components.GetUserShareUrlRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 收藏游戏
 * @param req
 */
export async function CollectGame(req: components.CollectGameReq, nasCommons: any = {}) {
	const func = "CollectGame"
	let rsp: components.MyGameListRsp 
	rsp = <components.MyGameListRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 我的游戏
 */
export async function MyGameList(nasCommons: any = {}) {
	const func = "MyGameList"
	let rsp: components.MyGameListRsp 
	rsp = <components.MyGameListRsp> await NatsRequest(mod, func,{}, true, nasCommons) 
	return rsp
}

/**
 * @description checkversion
 * @param req
 */
export async function CheckVersion(req: components.CheckVersionReq, nasCommons: any = {}) {
	const func = "CheckVersion"
	let rsp: components.CheckVersionRsp 
	rsp = <components.CheckVersionRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 公告邮件列表
 * @param req
 */
export async function GetMsgList(req: components.GetMsgListReq, nasCommons: any = {}) {
	const func = "GetMsgList"
	let rsp: components.GetMsgListRsp 
	rsp = <components.GetMsgListRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 读公告或者读邮件
 * @param req
 */
export async function ReadMsg(req: components.ReadMsgReq, nasCommons: any = {}) {
	const func = "ReadMsg"
	let rsp: components.ReadMsgRsp 
	rsp = <components.ReadMsgRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 提现、兑换
 * @param req
 */
export async function ApplyCash(req: components.ApplyCashReq, nasCommons: any = {}) {
	const func = "ApplyCash"
	let rsp: components.AppleCashRsp 
	rsp = <components.AppleCashRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 游戏流水记录
 * @param req
 * @param headers
 */
export async function GetGameRecord(req: components.UserGameRecordReq, nasCommons: any = {}) {
	const func = "GetGameRecord"
	let rsp: components.UserGameRecordRsp 
	rsp = <components.UserGameRecordRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 兑换记录
 * @param req
 * @param headers
 */
export async function ApplyCashList(req: components.ApplyCashListReq, nasCommons: any = {}) {
	const func = "ApplyCashList"
	let rsp: components.ApplyCashListRsp 
	rsp = <components.ApplyCashListRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 充值记录
 * @param req
 * @param headers
 */
export async function GetUserPayList(req: components.GetUserPayListReq, nasCommons: any = {}) {
	const func = "GetUserPayList"
	let rsp: components.GetUserPayListRsp 
	rsp = <components.GetUserPayListRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 用户充值
 * @param req
 */
export async function UserNewDownPay(req: components.UserNewDownPayReq, nasCommons: any = {}) {
	const func = "UserNewDownPay"
	let rsp: components.UserNewDownPayRsp 
	rsp = <components.UserNewDownPayRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 用户充值url
 * @param req
 */
export async function GetUserDownPayData(req: components.GetUserDownPayDataReq, nasCommons: any = {}) {
	const func = "GetUserDownPayData"
	let rsp: components.UserDownPayRsp 
	rsp = <components.UserDownPayRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 我的奖励
 */
export async function MyRewards(nasCommons: any = {}) {
	const func = "MyRewards"
	let rsp: components.MyRewardsRsp 
	rsp = <components.MyRewardsRsp> await NatsRequest(mod, func,{}, true, nasCommons) 
	return rsp
}

/**
 * @description 领取奖励
 * @param req
 */
export async function ReceiveRewards(req: components.ReceiveRewardsReq, nasCommons: any = {}) {
	const func = "ReceiveRewards"
	let rsp: components.ReceiveRewardsRsp 
	rsp = <components.ReceiveRewardsRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}

/**
 * @description 奖励获取记录
 * @param req
 * @param headers
 */
export async function MyRewardHistory(req: components.MyRewardHistoryReq, nasCommons: any = {}) {
	const func = "MyRewardHistory"
	let rsp: components.MyRewardHistoryRsp 
	rsp = <components.MyRewardHistoryRsp> await NatsRequest(mod, func, req, true, nasCommons) 
	return rsp
}
