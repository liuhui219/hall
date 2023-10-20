import { ReadMsg } from '~~/server/serviceapi/appserver'
import { ReadMsgReq, ReadMsgRsp } from '~/types/appserverComponents'
//读公告或者读邮件
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.id = parseInt(body.id, 10)
		body.msg_type = parseInt(body.msg_type, 10)
		body.read_status = parseInt(body.read_status, 10)
		body.lang = parseInt(body.lang, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <ReadMsgRsp>await ReadMsg(body as ReadMsgReq, event)
	return rsp
})
