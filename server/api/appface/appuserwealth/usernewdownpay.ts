import { UserNewDownPay } from '~~/server/serviceapi/appserver'
import { UserNewDownPayReq, UserNewDownPayRsp } from '~/types/appserverComponents'
//用户充值
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.activity_id = parseInt(body.activity_id, 10)
		body.price = parseInt(body.price, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <UserNewDownPayRsp>await UserNewDownPay(body as UserNewDownPayReq, event)
	return rsp
})
