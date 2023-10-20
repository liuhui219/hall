import { GetUnderUserDepositAgentRecord } from '~~/server/serviceapi/appserver'
import { GetUnderUserDepositAgentRecordReq, GetUnderUserDepositAgentRecordRsp } from '~/types/appserverComponents'
//获取直属下级用户充值和返佣记录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.page_size = parseInt(body.page_size, 10)
		body.page = parseInt(body.page, 10)
		body.user_id = parseInt(body.user_id, 10)
		body.time_type = parseInt(body.time_type, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetUnderUserDepositAgentRecordRsp>await GetUnderUserDepositAgentRecord(body as GetUnderUserDepositAgentRecordReq, event)
	return rsp
})
