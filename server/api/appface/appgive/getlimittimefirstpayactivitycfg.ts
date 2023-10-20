import { GetLimitTimeFirstPayActivityCfg } from '~~/server/serviceapi/appserver'
import { NullReq, GetLimitTimeFirstPayActivityCfgRsp } from '~/types/appserverComponents'
//限时首充100%返利配置信息
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.lang = parseInt(body.lang, 10)
		body.app_id = parseInt(body.app_id, 10)
		body.read_type = parseInt(body.read_type, 10)
		body.aite_type = parseInt(body.aite_type, 10)
		body.old_app_id = parseInt(body.old_app_id, 10)
		body.user_id = parseInt(body.user_id, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetLimitTimeFirstPayActivityCfgRsp>await GetLimitTimeFirstPayActivityCfg(body as NullReq, event)
	return rsp
})
