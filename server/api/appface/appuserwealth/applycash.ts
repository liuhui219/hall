import { ApplyCash } from '~~/server/serviceapi/appserver'
import { ApplyCashReq, AppleCashRsp } from '~/types/appserverComponents'
//提现、兑换
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.usdt_rate = parseInt(body.usdt_rate, 10)
		body.point = parseInt(body.point, 10)
		body.type = parseInt(body.type, 10)
		body.usdt_point = parseInt(body.usdt_point, 10)
		body.sub_type = parseInt(body.sub_type, 10)
		body.usdt_type = parseInt(body.usdt_type, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <AppleCashRsp>await ApplyCash(body as ApplyCashReq, event)
	return rsp
})
