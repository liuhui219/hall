import { GetActivityAwardRecord } from '~~/server/serviceapi/appserver'
import { GetActivityAwardRecordRsp } from '~/types/appserverComponents'
//转盘奖励轮播
export default defineEventHandler(async (event) => {
	let rsp = <GetActivityAwardRecordRsp>await GetActivityAwardRecord(event)
	return rsp
})
