import { connect, NatsConnection, Msg, NatsError, Subscription, StringCodec, ErrorCode, JSONCodec } from 'nats'
import * as os from 'os'
import * as util from 'util'
import * as process from 'process'
import { DoRegistNatsHandler } from './libNats'

import { GetTimestamp } from '../utils/utils'
import { GetServerName, GetServerID, NatsMsg, server_config } from './request'

const subjectForReportService = 'system.service.report'

const processConfig = useRuntimeConfig()
const servers = {
	servers: processConfig.natsurl,
	user: processConfig.natsuser,
	pass: processConfig.natspass,
	maxReconnectAttempts: 10,
	reconnect: true,
}

export let g_natsConn: NatsConnection

let subscribeForReportService: any
let subscribeForReportServerAsk: any

type CallBackHandler = (msg: Msg) => void

//连接对象
interface NatsConnect {
	ServerName: string
	ServerId: number
	name: string
	subscriptions_list: string[]
	UpdateTime: Date
	cmd: string
}

export class serviceSubscription {
	subj: string
	queue: string
	//     ch: chan * nats.Msg
	handler: (msg: Msg) => void
	threadNum: number
	oSubs?: Subscription[]

	constructor() {
		this.subj = ''
		this.queue = ''
		this.handler = (msg: Msg) => {}
		this.threadNum = 0
	}
}

//全局订阅类型
let g_natsSubjects: serviceSubscription[]

let natsServers = new Map<string, NatsConnect>()
let natsServices = new Map<string, boolean>()

let serverNameToNats = ''

export async function StartNatsService() {
	g_natsConn = await connect(servers)
	;(async () => {
		console.info(`connected ${g_natsConn.getServer()}`)
		for await (const s of g_natsConn.status()) {
			console.log(`${s.type}:${s.data}`)
			switch (s.type) {
				case 'update':
					console.info('连接重置了')
					break
				case 'disconnect':
					console.error('连接断开')
					break
				case 'reconnecting':
					console.error('重新连接中~')
					break
				default:
					console.info('nats状态变更~')
			}
			if (s.type == 'update') {
				// await g_natsConn.close();
				// await StartNatsService();
			}
		}
	})().then()

	g_natsConn.closed().then((err: any) => {
		console.log(`connection closed ${err ? ' with error: ' + err.message : ''}`)
	})

	ReregistSubject()

	subscribeForReportService = g_natsConn.subscribe(subjectForReportService, {
		queue: genNameToNats(),
		callback: onServerReportService,
	})

	//先把别人的服务器接收过来
	reportAllServices('start')
	sleep(50)

	subscribeForReportServerAsk = g_natsConn.subscribe(genAskSubjToNats(), {
		callback: onServerAsk,
	})
}

export function onServerReportService(_err: any, _msg: Msg) {
	let string = new TextDecoder().decode(_msg.data)
	let conn = JSON.parse(string)

	conn.UpdateTime = GetTimestamp()
	if (conn.Cmd == 'start') {
		//有服务刚起来了. 立刻上报一次
		// logs.Trace("Server %+v is start now", conn)
		reportAllServices('hello')
	}
	let key = conn.name //字符串

	let needUpdate = false

	if (natsServers.has(key) == false) {
		needUpdate = true
	} else {
		let SubList = natsServers.get(key)?.subscriptions_list as string[]
		if (SubList != undefined) {
			SubList.forEach((val, idx, array) => {
				if (InArrayString(natsServers.get(key)?.subscriptions_list as string[], val)) {
					needUpdate = true
					return
				}
			})
		}
	}

	if (conn.Cmd == 'stop') {
		natsServers.delete(key)
	} else {
		natsServers.set(key, conn)
	}
	if (needUpdate == false) {
		//没有变化, 忽略
		return
	}

	//最后生成新的service 列表
	let smap = new Map<string, boolean>()

	if (natsServers != undefined) {
		natsServers.forEach((val, idx, array) => {
			if (val.subscriptions_list != undefined) {
				val.subscriptions_list.forEach((val, idx, array) => {
					smap.set(val, true)
				})
			}
		})
	}
	natsServices = smap
	// console.log(natsServices)
}

export function genNameToNats() {
	if (serverNameToNats != '') {
		return serverNameToNats
	}

	const hostName = os.hostname()
	serverNameToNats = util.format('goserver.%s.%d-%s.%d', hostName, process.pid, server_config.ServerName, server_config.ServerID)

	return serverNameToNats
}

export function reportAllServices(cmd: string) {
	let service: NatsConnect = {
		ServerName: GetServerName(),
		ServerId: GetServerID(),
		name: genNameToNats(),
		subscriptions_list: [],
		UpdateTime: new Date(),
		cmd: cmd,
	}
	if (g_natsSubjects != undefined) {
		if (service.cmd == 'hello' && g_natsSubjects.length == 0) {
			return
		}
	}

	// val: 当前值
	// idx：当前index
	// array: Array
	if (g_natsSubjects != undefined) {
		g_natsSubjects.forEach((val, idx, array) => {
			service.subscriptions_list.push(val.subj)
		})
	}

	const json = JSONCodec()
	let data = json.encode(service)

	g_natsConn.publish(subjectForReportService, data)

	if (service.cmd != 'hello') {
	}
}

function sleep(ms: number) {
	setTimeout((args: void) => {}, ms)
}

function genAskSubjToNats() {
	return util.format('system.service.ask.%s.%d', GetServerName(), GetServerID())
}

function onServerAsk(err: NatsError | null, msg: Msg) {
	let buffer = new TextEncoder().encode(genNameToNats())

	g_natsConn.publish(msg.reply as string, buffer)
}

function ReregistSubject() {
	const natsSubjects = new Array<serviceSubscription>()

	if (g_natsSubjects != undefined) {
		g_natsSubjects.forEach((val, idx, array) => {
			natsSubjects.push(val)
		})
	}

	UnloadAllSubject()

	natsSubjects.forEach((val, idx, array) => {
		DoRegistNatsHandler(g_natsConn, val.subj, val.queue, val.handler, val.threadNum, onRegSubject)
	})
	// for _, sSub := range natsSubjects {
	//     DoRegistNatsHandler(g_natsConn, sSub.subj, sSub.queue, sSub.handler, sSub.threadNum, onRegSubject)
	// }
	reportAllServices('hello')
}

function UnloadAllSubject() {
	reportAllServices('stop')
	if (g_natsSubjects != undefined) {
		g_natsSubjects.forEach((val, idx, array) => {
			// natsSubjects.push(val.subj)
			// val.oSubs.forEach((val, idx, array) => {
			//     val.unsubscribe()
			// })
		})
	}
}

function InArrayString(arr: string[], x: string) {
	arr.forEach((val, idx, array) => {
		if (val == x) {
			return true
		}
	})
	return false
}

export function onRegSubject(sSub: serviceSubscription) {
	if (g_natsSubjects == undefined) {
		g_natsSubjects = new Array<serviceSubscription>()
	}

	//sSub := &serviceSubscription{subj: subj, queue: queue, handler: handler, threadNum: num, oSubs: oSubs}
	// g_natsSubjects = append(g_natsSubjects, sSub)
	g_natsSubjects.push(sSub)
	// logs.LogDebug("append subject %+v", sSub)
}

async function askServer(conn: NatsConnection) {
	const sc = StringCodec()
	if (GetServerID() == 0) {
		for (let i = 1000; i < 1100; i++) {
			server_config.ServerID = i
			console.log('Block statement execution no.' + i)
			try {
				const reply = await conn.request(genAskSubjToNats(), sc.encode('are you here?'))
			} catch (err) {
				if (err instanceof NatsError) {
					if (err.code == ErrorCode.NoResponders) {
						return ''
					}
				}
			}

			// if(reply.respond)
		}
	}
}

export function CheckNatsService(subj: string) {
	return true

	// if (natsServices.has(subj) == true) {
	//     return true
	// }
	// // if _, ok := (* natsServices)[subj]; ok {
	// //     return ok
	// // }
	// return false
}
