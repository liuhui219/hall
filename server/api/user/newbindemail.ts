import { NewBindEmail } from '~~/server/serviceapi/appserver'
import { NewBindAccountReq, BindPhoneRsp } from '~/types/appserverComponents'
//绑定邮箱
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <BindPhoneRsp>await NewBindEmail(body as NewBindAccountReq, event)
	return rsp
})
