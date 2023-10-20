import { EnterGame } from '~~/server/serviceapi/appserver'
import { EnterGameReq, EnterGameRsp } from '~/types/appserverComponents'
//游戏链接
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.lang = parseInt(body.lang, 10)
		body.app_id = parseInt(body.app_id, 10)
		body.os_type = parseInt(body.os_type, 10)
		body.gid = parseInt(body.gid, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <EnterGameRsp>await EnterGame(body as EnterGameReq, event)
	return rsp
})
