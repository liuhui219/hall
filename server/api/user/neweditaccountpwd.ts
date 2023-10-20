import { NewEditAccountPwd } from '~~/server/serviceapi/appserver'
import { NewEditPwdReq, NullRsp } from '~/types/appserverComponents'
//修改用户登录密码
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <NullRsp>await NewEditAccountPwd(body as NewEditPwdReq, event)
	return rsp
})
