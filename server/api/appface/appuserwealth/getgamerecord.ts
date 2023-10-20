import { GetGameRecord } from '~~/server/serviceapi/appserver'
import { UserGameRecordReq, UserGameRecordRsp } from '~/types/appserverComponents'
//游戏流水记录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.gid = parseInt(body.gid, 10)
		body.is_win = parseInt(body.is_win, 10)
		body.page = parseInt(body.page, 10)
		body.page_size = parseInt(body.page_size, 10)
		body.gclass = parseInt(body.gclass, 10)
		body.stime = parseInt(body.stime, 10)
		body.etime = parseInt(body.etime, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <UserGameRecordRsp>await GetGameRecord(body as UserGameRecordReq, event)
	return rsp
})
