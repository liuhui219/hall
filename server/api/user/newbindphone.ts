import { NewBindPhone } from '~~/server/serviceapi/appserver'
import { NewBindAccountReq, BindPhoneRsp } from '~/types/appserverComponents'
//绑定手机号码
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <BindPhoneRsp>await NewBindPhone(body as NewBindAccountReq, event)
	return rsp
})
