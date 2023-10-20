import { GetShareInviteSummary } from '~~/server/serviceapi/appserver'
import { GetShareInviteSummaryRsp } from '~/types/appserverComponents'
//用户推广邀请统计
export default defineEventHandler(async (event) => {
	let rsp = <GetShareInviteSummaryRsp>await GetShareInviteSummary(event)
	return rsp
})
