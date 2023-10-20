import { MyRewards } from '~~/server/serviceapi/appserver'
import { MyRewardsRsp } from '~/types/appserverComponents'
//我的奖励
export default defineEventHandler(async (event) => {
	let rsp = <MyRewardsRsp>await MyRewards(event)
	return rsp
})
