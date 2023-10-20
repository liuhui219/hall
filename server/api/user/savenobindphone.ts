import { SaveNoBindPhone } from '~~/server/serviceapi/appserver'
import { SaveNoBindPhoneReq, NullRsp } from '~/types/appserverComponents'
//修改未绑定手机号码
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <NullRsp>await SaveNoBindPhone(body as SaveNoBindPhoneReq, event)
	return rsp
})
