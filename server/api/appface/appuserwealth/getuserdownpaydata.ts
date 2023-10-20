import { GetUserDownPayData } from '~~/server/serviceapi/appserver'
import { GetUserDownPayDataReq, UserDownPayRsp } from '~/types/appserverComponents'
//用户充值url
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.order_id = parseInt(body.order_id, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <UserDownPayRsp>await GetUserDownPayData(body as GetUserDownPayDataReq, event)
	return rsp
})
