import { GetActivityZhuanpanUseRecord } from '~~/server/serviceapi/appserver'
import { GetActivityRecordReq, GetActivityRecordRsp } from '~/types/appserverComponents'
//转盘使用记录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.page = parseInt(body.page, 10)
		body.page_size = parseInt(body.page_size, 10)
		body.start = parseInt(body.start, 10)
		body.end = parseInt(body.end, 10)
		body.atype = parseInt(body.atype, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetActivityRecordRsp>await GetActivityZhuanpanUseRecord(body as GetActivityRecordReq, event)
	return rsp
})
