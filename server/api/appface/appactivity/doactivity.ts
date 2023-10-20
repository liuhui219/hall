import {DoActivity} from "~~/server/serviceapi/appserver";
import {ActivityReq} from "~/types/appserverComponents";
import {NullRsp} from "~/types/appserverComponents";
//用户参与活动（例如：签到）
export default defineEventHandler(async (event) => {
	let body:any;
	if (getMethod(event) == "GET"){
		body = getQuery(event)
		body.atype = parseInt(body.atype,10)
	}else{
		body = await readBody(event)
	}
	let rsp = <NullRsp> await DoActivity(body as ActivityReq,event)
	return rsp
})
