import { NewForgetCodeCheck } from '~~/server/serviceapi/appserver'
import { NewForgetCodeCheckReq, NullRsp } from '~/types/appserverComponents'
//检测验证码是否正确
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <NullRsp>await NewForgetCodeCheck(body as NewForgetCodeCheckReq, event)
	return rsp
})
