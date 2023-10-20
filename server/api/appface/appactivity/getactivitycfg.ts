import { GetActivityCfg } from '~~/server/serviceapi/appserver'
import { ActivityCfgRsp } from '~/types/appserverComponents'
//活动配置
export default defineEventHandler(async (event) => {
	let rsp = <ActivityCfgRsp>await GetActivityCfg(event)
	return rsp
})
