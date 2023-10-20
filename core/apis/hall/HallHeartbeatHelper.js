import Global from '../../Global'
import { NetOnline } from './NetEvent'

export default class HallHeartbeatHelper {
	CHECK_HEARTBEAT_INTERVAL = 6
	heartData
	heartParam
	server
	internalEvent
	//下一次心跳间隔
	sendInterval = 0
	//6秒没收到心跳 则主动发送心跳
	lastSendInterval = 6

	lastSendTimeout = 6

	isRunning = false

	constructor(server, interalEvent) {
		this.server = server
		this.internalEvent = interalEvent
	}

	setSession(session) {
		if (!session) {
			this.heartData._param.game = undefined
		} else {
			let game = {}
			game._gid = session._para._gid
			game._chair = session._para._chair
			game._gsc = session._para._gsc
			game._glv = session._para._glv
			game._gt = session._para._gt
			this.heartData._param.game = game
		}
	}

	_initHeartBeatData() {
		this.heartParam = {}
		this.heartParam.filter = {}
		this.heartParam.msgseq = 0
		this.heartParam.max_msg = Global.Setting.boardcastCount

		this.heartData = {}
		this.heartData._mod = NetOnline.mod
		this.heartData._func = NetOnline.HeartBeat
		this.heartData._param = this.heartParam
	}

	//登录成功开始
	run() {
		this.isRunning = true
		this.sendHeartBeat()
	}

	//切换账号时stop
	stop() {
		this.isRunning = false
		this.heartParam.msgseq = 0
		this.sendInterval = 0
		this.lastSendInterval = this.CHECK_HEARTBEAT_INTERVAL
	}

	sendHeartBeat(extraStr = '') {
		this.lastSendInterval = this.lastSendTimeout + 3
		this.server.sendHeartBeat(NetOnline.mod, NetOnline.HeartBeat, this.heartParam, null, null, 0, extraStr)
	}

	//下次心跳seq
	onUpdateMsgseq(msgseq, msgseq1, nti_seq) {
		this.heartParam.msgseq = msgseq
		this.heartParam.msgseq_1 = msgseq1
		this.heartParam.nti_seq = nti_seq
	}

	//心跳消息返回
	onHeartBeat(param) {
		//设置下次心跳请求时间
		if (param && param.timeout) {
			this.sendInterval = param.timeout
		} else {
			this.sendInterval = 3
		}
		this.lastSendTimeout = this.sendInterval
		Global.HallServer.broadcastHelper.handleHeartbeat(param)
	}

	onUpdate(dt) {
		if (!this.isRunning) {
			return
		}
		if (this.sendInterval > 0) {
			this.sendInterval -= dt
			if (this.sendInterval <= 0) {
				this.sendHeartBeat()
			}
		}
		//防止心跳断掉
		this.lastSendInterval -= dt
		if (this.lastSendInterval < 0) {
			this.sendHeartBeat()
		}
	}
}
