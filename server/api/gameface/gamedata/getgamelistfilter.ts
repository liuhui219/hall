import { GetGameListFilter } from '~~/server/serviceapi/appserver'
import { GetGameListReq, GetGameListRsp } from '~/types/appserverComponents'
//获取游戏列表 通过分类 平台
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.page = parseInt(body.page, 10)
		body.page_size = parseInt(body.page_size, 10)
		body.gclass = parseInt(body.gclass, 10)
		body.gplat = parseInt(body.gplat, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetGameListRsp>await GetGameListFilter(body as GetGameListReq, event)
	return rsp
})
