import { GetBankInfo } from '~~/server/serviceapi/appserver'
import { GetBankInfoReq, GetBankInfoRsp } from '~/types/appserverComponents'
//查询的绑定银行信息
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.bind_type = parseInt(body.bind_type, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetBankInfoRsp>await GetBankInfo(body as GetBankInfoReq, event)
	return rsp
})
