import { ReceiveActivityAward } from '~~/server/serviceapi/appserver'
import { ReceivActivityAwardReq, ReceivActivityAwardRsp } from '~/types/appserverComponents'
//我要领取活动奖励
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.type = parseInt(body.type, 10)
		body.key = parseInt(body.key, 10)
		body.atype = parseInt(body.atype, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <ReceivActivityAwardRsp>await ReceiveActivityAward(body as ReceivActivityAwardReq, event)
	return rsp
})
