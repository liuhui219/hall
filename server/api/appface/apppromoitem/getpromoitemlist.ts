import { GetPromoItemList } from '~~/server/serviceapi/appserver'
import { GetPromoItemListReq, GetPromoItemListRsp } from '~/types/appserverComponents'
//获取个人优惠道具列表
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.used_status = parseInt(body.used_status, 10)
		body.page = parseInt(body.page, 10)
		body.limit = parseInt(body.limit, 10)
		body.item_type = parseInt(body.item_type, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetPromoItemListRsp>await GetPromoItemList(body as GetPromoItemListReq, event)
	return rsp
})
