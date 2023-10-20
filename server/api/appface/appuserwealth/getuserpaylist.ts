import { GetUserPayList } from '~~/server/serviceapi/appserver'
import { GetUserPayListReq, GetUserPayListRsp } from '~/types/appserverComponents'
//充值记录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.limit = parseInt(body.limit, 10)
		body.status = parseInt(body.status, 10)
		body.date_type = parseInt(body.date_type, 10)
		body.page = parseInt(body.page, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetUserPayListRsp>await GetUserPayList(body as GetUserPayListReq, event)
	return rsp
})
