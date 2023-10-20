import { GetUserTaskPointReward } from '~~/server/serviceapi/appserver'
import { GetUserTaskPointRewardReq, GetUserTaskPointRewardRsp } from '~/types/appserverComponents'
//领取任务积分奖励
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.need_task_point = parseInt(body.need_task_point, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <GetUserTaskPointRewardRsp>await GetUserTaskPointReward(body as GetUserTaskPointRewardReq, event)
	return rsp
})
