import { MyRewardHistory } from '~~/server/serviceapi/appserver'
import { MyRewardHistoryReq, MyRewardHistoryRsp } from '~/types/appserverComponents'
//奖励获取记录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.limit = parseInt(body.limit, 10)
		body.day_type = parseInt(body.day_type, 10)
		body.reward_type = parseInt(body.reward_type, 10)
		body.page = parseInt(body.page, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <MyRewardHistoryRsp>await MyRewardHistory(body as MyRewardHistoryReq, event)
	return rsp
})
