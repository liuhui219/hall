import { EditUserInfo } from '~~/server/serviceapi/appserver'
import { EditUserInfoReq, NullRsp } from '~/types/appserverComponents'
//修改用户昵称头像
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <NullRsp>await EditUserInfo(body as EditUserInfoReq, event)
	return rsp
})
