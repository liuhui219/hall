import { GetActivityDetails } from '~~/server/serviceapi/appserver'
import { ActivityReq, GetDetailsRsp } from '~/types/appserverComponents'

//用户参与活动的信息
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.atype = parseInt(body.atype, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetDetailsRsp>await GetActivityDetails(body as ActivityReq, event)
	return rsp
})
