import { GetIndex } from '~~/server/serviceapi/appserver'
import { IndexReq, IndexRsp } from '~/types/appserverComponents'
//配置内容
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.app_id = parseInt(body.app_id, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <IndexRsp>await GetIndex(body as IndexReq, event)
	return rsp
})
