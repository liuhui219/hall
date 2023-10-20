import { CollectGame } from '~~/server/serviceapi/appserver'
import { CollectGameReq, MyGameListRsp } from '~/types/appserverComponents'
//收藏游戏
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.gid = parseInt(body.gid, 10)
		body.type = parseInt(body.type, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <MyGameListRsp>await CollectGame(body as CollectGameReq, event)
	return rsp
})
