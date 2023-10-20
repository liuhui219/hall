import { Verifycode } from '~~/server/serviceapi/appserver'
import { GetVerifyCodeReq, VerifyCodeRsp } from '~/types/appserverComponents'
//获取验证码
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <VerifyCodeRsp>await Verifycode(body as GetVerifyCodeReq, event)
	return rsp
})
