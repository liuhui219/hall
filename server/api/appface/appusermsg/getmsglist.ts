import { GetMsgList } from '~~/server/serviceapi/appserver'
import { GetMsgListReq, GetMsgListRsp } from '~/types/appserverComponents'
//公告邮件列表
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.type = parseInt(body.type, 10)
		body.lang = parseInt(body.lang, 10)
		body.flag = parseInt(body.flag, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetMsgListRsp>await GetMsgList(body as GetMsgListReq, event)
	return rsp
})
