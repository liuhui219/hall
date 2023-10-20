import { MyGameList } from '~~/server/serviceapi/appserver'
import { MyGameListRsp } from '~/types/appserverComponents'
//我的游戏
export default defineEventHandler(async (event) => {
	let rsp = <MyGameListRsp>await MyGameList(event)
	return rsp
})
