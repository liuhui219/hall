import { UsePromoItem } from '~~/server/serviceapi/appserver'
import { UsePromoItemReq, UsePromoItemRsp } from '~/types/appserverComponents'
//个人使用优惠道具
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.item_id = parseInt(body.item_id, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <UsePromoItemRsp>await UsePromoItem(body as UsePromoItemReq, event)
	return rsp
})
