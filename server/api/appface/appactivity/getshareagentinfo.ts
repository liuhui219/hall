import { GetShareAgentInfo } from '~~/server/serviceapi/appserver'
import { GetShareAgentReq, GetShareAgentInfoRsp } from '~/types/appserverComponents'
//推广的彩金信息
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.ctype = parseInt(body.ctype, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetShareAgentInfoRsp>await GetShareAgentInfo(body as GetShareAgentReq, event)
	return rsp
})
