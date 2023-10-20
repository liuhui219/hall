import { NatsConnection, Msg } from 'nats'

import { GetTimestamp, Encode, Decode } from '../utils/utils'

export let server_config = { ServerName: 'node', ServerID: 1000 }

export class MsgBody {
	_mod?: string
	_func?: string
	_check?: Uint8Array
	_sn?: Uint8Array

	_type?: string
	_svr_t?: string
	_svr_id?: number
	_errno?: number
	_errstr?: string
	_popno?: number
	_popjp?: number
	_param: string
	//兼容chess协议的_dst
	_dst?: Uint8Array

	constructor(param: string) {
		this._param = param
	}

	GetParam() {
		return this._param
	}
}

export class NatsMsg {
	Sess?: Session
	Type?: string
	Encrypt?: boolean
	Body: MsgBody

	Conn?: NatsConnection
	NatsMsg?: Msg

	Reply?: NatsMsg

	ExtValue?: number

	constructor(sess?: Session) {
		this.Sess = sess
		this.Body = new MsgBody('')
	}

	GetParam() {
		return this.Body
	}
}

//从登录态获取的信息
export class LoginInfo {
	SessionID?: number
	PriKey?: string
	AppID?: number
	PackNo?: number
	LoginType?: number
	LoginAddr?: string
	RemoteAddr?: string
	Mac?: string
	Src?: string
	Os?: number
	Vip?: number
	Tag?: number
	Lang?: number
	IsFree?: boolean
}

export class Session {
	Uid?: number
	AppID?: number
	PlatId?: number
	SvrFE?: string
	SvrID?: number
	Channel?: number
	Cmd?: string
	Time?: number
	LoginInfo: LoginInfo
	Seq?: number
	Check?: string
	X_RemoteAddr?: string

	constructor() {
		this.LoginInfo = {}
	}
}

export function NewSession(uid: number, appid: number, remoteAddress: string) {
	let sess = new Session()
	sess.PlatId = GetPlatformId()
	sess.SvrFE = GetServerName()
	sess.SvrID = GetServerID()
	sess.Time = GetTimestamp()
	sess.AppID = appid
	sess.LoginInfo = { AppID: appid, RemoteAddr: remoteAddress }
	if (uid == undefined) {
		sess.Uid = 0
	} else {
		sess.Uid = uid
	}

	return sess
}

export function GetServerName() {
	return server_config.ServerName
}

export function GetServerID() {
	return server_config.ServerID
}

export function GetPlatformId() {
	return 100
}

export function GetCallTimeout() {
	return 5000
}
