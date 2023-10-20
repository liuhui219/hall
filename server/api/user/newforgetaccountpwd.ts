import { NewForgetAccountPwd } from '~~/server/serviceapi/appserver'
import { NewForgetPwdReq, NullRsp } from '~/types/appserverComponents'
//保存用户密码
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <NullRsp>await NewForgetAccountPwd(body as NewForgetPwdReq, event)
	return rsp
})
