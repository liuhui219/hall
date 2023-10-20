import { NatsRequest, ESMR_SUCCEED, ESMR_FAILED, RetMsg } from '../nats/libNats'
import { MsgBody } from '../nats/request'
import * as components from '~~/types/appserverComponents'
//用户信息
const mod = 'http_mini.appserver'

export async function UserEmailLogin(req_param: any) {
	const func = 'UserEmailLogin'
	let rsp: components.UserLoginRsp
	rsp = <components.UserLoginRsp>await NatsRequest(mod, func, req_param, true)
	return rsp
}

export async function UserPhoneLogin(req_param: any) {
	const func = 'UserPhoneLogin'
	let rsp: any

	rsp = await NatsRequest(mod, func, req_param, true)
	return rsp
}

//获取验证码
export async function Verifycode(req_param: any) {
	const func = 'Verifycode'
	let rsp: any

	rsp = await NatsRequest(mod, func, req_param, true)
	return rsp
}

/**
 * @description
 * @param req
 */
export async function UserRegister(req_param: any) {
	const func = 'UserRegister'
	let rsp: any

	rsp = await NatsRequest(mod, func, req_param, true)
	return rsp
}

/**
 * @description
 * @param req
 */
export async function CheckLogin(req_param: any) {
	const func = 'CheckLogin'
	let rsp: any

	rsp = await NatsRequest(mod, func, req_param, true)
	return rsp
}
