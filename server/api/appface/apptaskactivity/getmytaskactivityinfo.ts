import { GetMyTaskActivityInfo } from '~~/server/serviceapi/appserver'
import { GetMyTaskActivityInfoReq, GetMyTaskActivityInfoRsp } from '~/types/appserverComponents'
//获取用户所有任务信息
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetMyTaskActivityInfoRsp>await GetMyTaskActivityInfo(body as GetMyTaskActivityInfoReq, event)
	return rsp
})
