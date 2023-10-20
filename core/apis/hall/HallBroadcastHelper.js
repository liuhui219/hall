import Global from '../../Global'

export const ServerPushType = {
	TYPE_ONLINE_COUNT: 29999, //前端自定义：在线人数

	TYPE_UPDATE_INFO: 20003, //余额更新
	TYPE_MARQEE_HAVEMAIL: 20008, //收到新邮件
	TYPE_PURCHASE: 20024, //充值成功
	TYPE_WITHDRAW: 20025, //提现成功
	TYPE_USER_PAY_FIRST_SUCC: 20026, // 首充成功
	TYPE_USER_REGISTER_SUCC: 20027, // 注册成功
	TYPE_USER_LOGIN_SUCC: 20028, // 登录成功
	TYPE_USER_PAY_TOP_SUCC: 20030, // 一级首充成功

	//以下为暂时无用的
	// TYPE_MARQEE_MSG: 20000, // 普通跑马灯消息
	// TYPE_PAY_ALERT: 20022, //充值成功赠送提示
	// TYPE_MARQEE_PAY_BACK: 20013, // 充值返利跑马灯
	// TYPE_MARQEE_COMMI: 20014, // 可领取佣金
	// TYPE_VIP_UPDATE: 20011, //vip积分等级变化
	// TYPE_FINISH_TASK: 20015, // 完成任务
}

export default class HallBroadcastHelper {
	server
	internalEvent

	constructor(server, internalEvent) {
		this.server = server
		this.internalEvent = internalEvent
	}

	//处理心跳并发方法
	handleHeartbeat(param) {
		if (!param) {
			return
		}
		//解析心跳消息
		let msgFuncMap = {}
		this._handleMsgList(param.list, msgFuncMap)
		this._handleMsgList(param.list_1, msgFuncMap)
		this._handleMsgList(param.ntis, msgFuncMap)
		if (param.uc) {
			//在线人数
			this._handleMsgList([{ msg: { type: ServerPushType.TYPE_ONLINE_COUNT, data: { uc: param.uc } } }], msgFuncMap)
		}
		//执行对应心跳合并方法
		for (let msgType in msgFuncMap) {
			let func = msgFuncMap[msgType][0]
			let msg = msgFuncMap[msgType][1]
			func.apply(this, [msg])
		}
		Global.HallServer.heartbeatHelper.onUpdateMsgseq(param.msg_seq, param.msg_seq_1, param.nti_seq)
	}

	_checkMsgseq(serverSeq, localMsgSeq) {
		// if (
		// 	serverSeq &&
		// 	serverSeq > 0 && //不等0
		// 	localMsgSeq >= serverSeq && //小于等于本地seq
		// 	localMsgSeq - serverSeq < 1000
		// ) {
		// 	//差值小于1000
		// 	return false
		// }
		return true
	}

	_handleMsgList(list, msgFuncMap, priority = 0) {
		if (list == null) {
			return
		}
		for (let element of list) {
			let msg = element.msg
			if (!msg) {
				return
			}
			let msgType = msg.type
			if (!this._dealMap[msgType]) {
				// console.error('HallBroadcastHelper _handleMsgList msg not found handler' + msgType)
				continue
			}
			let func = this._dealMap[msgType].func
			let merge = this._dealMap[msgType].merge
			if (!merge) {
				func.apply(this, [msg])
			} else {
				msgFuncMap[msgType] = [func, msg]
			}
		}
	}

	//服务器广播消息和处理方法对应数组,支持function 和 handler
	_dealMap = {}

	//注册广播监听
	registerMsg(type, jsonObj) {
		this._dealMap[type] = jsonObj
	}
}
