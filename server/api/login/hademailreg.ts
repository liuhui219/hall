import { HadEmailReg } from '~~/server/serviceapi/appserver'
import { HadEmailRegReq, HadAccountRegRsp } from '~/types/appserverComponents'
//检测邮箱是否存在
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <HadAccountRegRsp>await HadEmailReg(body as HadEmailRegReq, event)
	return rsp
})
