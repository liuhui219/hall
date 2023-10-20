import { connect, NatsConnection, Msg, NatsError, Subscription, JSONCodec } from 'nats'

import * as util from 'util'
import { JsonToBuffer } from '../utils/utils'

import { g_natsConn, serviceSubscription, CheckNatsService } from '../nats/natsServices'
import { GetServerName, GetServerID, NatsMsg, NewSession, GetPlatformId, MsgBody } from './request'
import { H3Event } from 'h3'
import { Exception } from 'sass'
import { Body } from '~~/.nuxt/components'

export const ESMR_SUCCEED = 0
export const ESMR_FAILED = 1
export const ESMR_TIMEOUT = 2

export const RSP_SUCCEED = 200

const brLine = (): string => {
	return '\n ======================================================================\n ======================================================================'
}

const timeStr = (t: number): string => {
	if (t < 1000 && t > 100) {
		return `0${t}`
	}
	if (t < 100 && t > 10) {
		return `00${t}`
	}
	if (t < 10 && t > 1) {
		return `000${t}`
	}
	return t.toString()
}

export interface ErrRsp {
	ret?: number
	msg?: string
	Params?: any
}

export interface Response {
	//返回消息
	ret: number
	err?: ErrRsp //错误信息
	msg?: string
}

//返回消息
export interface RetMsg {
	msg?: string | unknown
	ret?: number
	Params?: any
}

// Ret int32  `json:"ret"`
// 	Msg string `json:"msg"`
// 	// PopupNo   int32  `json:"_popno,omitempty"` // 弹窗样式
// 	// PopupJump int32  `json:"_popjp,omitempty"` // 弹窗跳转
// 	Params *[]interface{}

//错误消息
export interface ErrMsg {
	ret?: number
	_errno?: number
	_errstr?: string
	_param?: any
}

function GetRpcCallTimeout() {
	return 10000
}

export function GenReqSubject(mod: string, cmd: string, svrid: number) {
	if (svrid <= 0) {
		return util.format('msg.%s.%s', mod, cmd)
	} else {
		return util.format('msg.%s.%d.%s', mod, svrid, cmd)
	}
}

export function DoRegistNatsHandler(
	natsConn: NatsConnection,
	subj: string,
	queue: string,
	handler: (msg: Msg) => void,
	threadNum: number,
	onReg: (msg: serviceSubscription) => void
) {
	const oSubjs = new Array<Subscription>()

	const oSubj = g_natsConn.subscribe(subj, {
		queue: queue,
		callback: function (err: NatsError | null, msg: Msg) {
			handler(msg) //事件回调
		},
	})

	oSubjs.push(oSubj)

	natsConn.flush()
	if (onReg != undefined) {
		const sSub: serviceSubscription = {
			subj: subj,
			queue: queue,
			handler: handler,
			threadNum: threadNum,
			oSubs: oSubjs,
		}
		onReg(sSub)
	}
}

//调用
async function NatsCall(mod: string, svrid: number, cmd: string, req: NatsMsg, ...args: number[]) {
	if (req.Sess != undefined) {
		//增加判断
		req.Sess.PlatId = GetPlatformId()
		req.Sess.SvrFE = GetServerName()
		req.Sess.Time = Date.now()
		req.Sess.Channel = 0
	}

	const timeout = GetRpcCallTimeout()

	return await NatsCallMsg(g_natsConn, mod, svrid, cmd, req, timeout, CheckNatsService)
}

//调用
async function NatsCallMsg(
	natsConn: NatsConnection,
	mod: string,
	svrid: number,
	cmd: string,
	req: any,
	timeout: number,
	CheckNatsService: (string: string) => boolean
) {
	let rsp: RetMsg = {}
	const sc = JSONCodec()

	let subj = GenReqSubject(mod, cmd, svrid)

	let startTime: number = new Date().getTime()
	console.info(`请求拦截${cmd}:\n---->${JSON.stringify(req)}${brLine()}`)
	try {
		let msg = await natsConn.request(subj, sc.encode(req), { timeout: timeout })
		let body: NatsMsg = Object.assign(new NatsMsg(), sc.decode(msg.data)) //解析
		const { _errno, _errstr, _param } = body.GetParam() //异常报错
		if (_errno != undefined && _errno > 0) {
			return {
				ret: ESMR_FAILED,
				_errno: _errno,
				_errstr: _errstr,
				_param: _param,
			} //报错
		}
		rsp = _param ? <RetMsg>_param : {}
	} catch (error) {
		console.error(
			`调用${cmd}失败耗时：${timeStr(Date.now() - startTime)}\n错误：${error}\n----->携带参数为：${JSON.stringify(req?.Body?._param)}`
		)
		return {
			_errno: 508,
			_errstr: 'Service Unavailable',
			ret: ESMR_FAILED,
		}
	}
	console.info(`${cmd}:调用成功耗时：${timeStr(Date.now() - startTime)}`)
	rsp.ret = ESMR_SUCCEED
	return rsp
}

export async function NatsRequest(mod: string, func: string, req_param: any, needRsp?: boolean, event?: H3Event) {
	const config = useRuntimeConfig()
	req_param.app_id = config.appid //赋值 appid
	let remoteAddress: any
	if (event?.node.req != null) {
		// req_param.uid = event.context?.user?.uid
		remoteAddress =
			event?.node.req.headers['x-forwarded-for'] || event?.node.req.connection?.remoteAddress || event?.node.req.socket?.remoteAddress
		if (remoteAddress != null && remoteAddress.length > 1) {
			remoteAddress = remoteAddress.split(',')[0]
		}
		req_param.remoteaddr = remoteAddress
		req_param.host = event?.node.req.headers.host
		console.log('客户端请求真实IP为：', req_param.remoteaddr)
	}

	const req = new NatsMsg(NewSession(req_param.uid, config.appid, remoteAddress))
	req.Body._func = func
	req.Body._param = req_param //参数
	if (needRsp == true) {
		return await NatsCall(mod, -1, func, req, 0, 0)
	}
	return ''
}
