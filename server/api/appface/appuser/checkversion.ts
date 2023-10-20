import { CheckVersion } from '~~/server/serviceapi/appserver'
import { CheckVersionReq, CheckVersionRsp } from '~/types/appserverComponents'
//checkversion
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.ch = parseInt(body.ch, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <CheckVersionRsp>await CheckVersion(body as CheckVersionReq, event)
	return rsp
})
