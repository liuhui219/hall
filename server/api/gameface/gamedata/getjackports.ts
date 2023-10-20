import { GetJackPorts } from '~~/server/serviceapi/appserver'
import { NullReq, GetJackPortsListRsp } from '~/types/appserverComponents'
//获取所有奖池
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.read_type = parseInt(body.read_type, 10)
		body.aite_type = parseInt(body.aite_type, 10)
		body.lang = parseInt(body.lang, 10)
		body.user_id = parseInt(body.user_id, 10)
		body.old_app_id = parseInt(body.old_app_id, 10)
		body.app_id = parseInt(body.app_id, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetJackPortsListRsp>await GetJackPorts(body as NullReq, event)
	return rsp
})
