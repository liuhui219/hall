import { UserPhoneLogin } from '~~/server/serviceapi/appserver'
import { UserLoginReq, UserLoginRsp } from '~/types/appserverComponents'
import { ESMR_SUCCEED } from '~~/server/nats/libNats'
import { JwtGenerate } from '~/server/utils/utils'
//手机登录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <UserLoginRsp>await UserPhoneLogin(body as UserLoginReq, event)
	if (rsp && rsp.ret == ESMR_SUCCEED) {
		await JwtGenerate(rsp)
	}
	return rsp
})
