import { PromoItemUseRecord } from '~~/server/serviceapi/appserver'
import { PromoItemUseRecordReq, PromoItemUseRecordRsp } from '~/types/appserverComponents'
//个人优惠道具使用记录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.page = parseInt(body.page, 10)
		body.limit = parseInt(body.limit, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <PromoItemUseRecordRsp>await PromoItemUseRecord(body as PromoItemUseRecordReq, event)
	return rsp
})
