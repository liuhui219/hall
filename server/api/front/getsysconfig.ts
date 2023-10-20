import { GetSysConfig } from '~~/server/serviceapi/appserver'
import { SysConfigReq, SysConfigRsp } from '~/types/appserverComponents'
//系统配置
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.app_id = parseInt(body.app_id, 10)
		body.uid = parseInt(body.uid, 10)
		body.old_app_id = parseInt(body.old_app_id, 10)
		body.pack = parseInt(body.pack, 10)
		body.lang = parseInt(body.lang, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <SysConfigRsp>await GetSysConfig(body as SysConfigReq, event)
	return rsp
})
