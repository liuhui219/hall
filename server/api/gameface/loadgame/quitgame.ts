import { QuitGame } from '~~/server/serviceapi/appserver'
import { NullRsp } from '~/types/appserverComponents'
//离开游戏
export default defineEventHandler(async (event) => {
	let rsp = <NullRsp>await QuitGame(event)
	return rsp
})
