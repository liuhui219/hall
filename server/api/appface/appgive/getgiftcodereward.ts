import { GetGiftCodeReward } from '~~/server/serviceapi/appserver'
import { GetGiftCodeRewardReq, GetGiftCodeRewardRsp } from '~/types/appserverComponents'
//领取礼包码
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetGiftCodeRewardRsp>await GetGiftCodeReward(body as GetGiftCodeRewardReq, event)
	return rsp
})
