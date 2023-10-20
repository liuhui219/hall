import { SaveNoBindEmail } from '~~/server/serviceapi/appserver'
import { SaveNoBindEmailReq, NullRsp } from '~/types/appserverComponents'
//修改未绑定邮箱
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <NullRsp>await SaveNoBindEmail(body as SaveNoBindEmailReq, event)
	return rsp
})
