import { HadPhoneReg } from '~~/server/serviceapi/appserver'
import { HadPhoneRegReq, HadAccountRegRsp } from '~/types/appserverComponents'
//检测手机号是否存在
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <HadAccountRegRsp>await HadPhoneReg(body as HadPhoneRegReq, event)
	return rsp
})
