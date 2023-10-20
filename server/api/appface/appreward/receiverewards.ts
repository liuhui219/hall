import { ReceiveRewards } from '~~/server/serviceapi/appserver'
import { ReceiveRewardsReq, ReceiveRewardsRsp } from '~/types/appserverComponents'
//领取奖励
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <ReceiveRewardsRsp>await ReceiveRewards(body as ReceiveRewardsReq, event)
	return rsp
})
