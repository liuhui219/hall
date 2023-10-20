import { ReportGameAwardData } from '~~/server/serviceapi/appserver'
import { ReportGameData, NullRsp } from '~/types/appserverComponents'
//用户游戏记录
export default defineEventHandler(async (event) => {
	let body: any
	if (getMethod(event) == 'GET') {
		body = getQuery(event)
		body.gid = parseInt(body.gid, 10)
		body.bet_time = parseInt(body.bet_time, 10)
		body.player_count = parseInt(body.player_count, 10)
		body.status = parseInt(body.status, 10)
		body.count_down = parseInt(body.count_down, 10)
		body.svr_id = parseInt(body.svr_id, 10)
		body.app_id = parseInt(body.app_id, 10)
		body.rate_tag = parseInt(body.rate_tag, 10)
		body.update_time = parseInt(body.update_time, 10)
	} else {
		body = await readBody(event)
	}
	let rsp = <NullRsp>await ReportGameAwardData(body as ReportGameData, event)
	return rsp
})
