import { GetUserShareUrl } from '~~/server/serviceapi/appserver'
import { GetUserShareUrlReq, GetUserShareUrlRsp } from '~/types/appserverComponents'
//获取短地址
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetUserShareUrlRsp>await GetUserShareUrl(body as GetUserShareUrlReq, event)
	return rsp
})
