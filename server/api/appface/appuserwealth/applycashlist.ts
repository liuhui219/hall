import { ApplyCashList } from '~~/server/serviceapi/appserver'
import { ApplyCashListReq, ApplyCashListRsp } from '~/types/appserverComponents'
//兑换记录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.page = parseInt(body.page, 10)
		body.page_size = parseInt(body.page_size, 10)
		body.status = parseInt(body.status, 10)
		body.date_type = parseInt(body.date_type, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <ApplyCashListRsp>await ApplyCashList(body as ApplyCashListReq, event)
	return rsp
})
