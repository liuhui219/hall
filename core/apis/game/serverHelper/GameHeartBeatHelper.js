import { GameCommand } from '../GameServer'
import BaseServerHelper from './BaseServerHelper'

export default class GameHeartBeatHelper extends BaseServerHelper {
	sendInterval = 0
	lastHeartBeatInterval = 3
	start = false
	//心跳计数
	heartBeatSeq = 1

	onInit() {}

	startHeartbeat() {
		this.start = true
	}

	stopHeartBeat() {
		this.start = false
	}

	sendHeartBeat() {
		if (this.server.isRunning) {
			let seq = this.heartBeatSeq
			this.heartBeatSeq++

			this.server.send(GameCommand.HeartBeat, { _seq: seq, gid: this.server.gid, level: this.server.glv })
		}
	}

	HandleHeartBeat(msg) {
		this.sendInterval = (msg._param._para && msg._param._para.timeout) || 3
		this.lastHeartBeatInterval = this.sendInterval
		this.server.socketReconnectReceiveCheckInteval = this.sendInterval * 2 + 3
	}

	//默认值为1
	resetSeq() {
		this.heartBeatSeq = 1
	}

	onUpdate(dt) {
		if (!this.start) return
		if (!this.server.isRunning) return
		if (this.sendInterval > 0) {
			this.sendInterval -= dt
			if (this.sendInterval <= 0) {
				this.sendHeartBeat()
				this.sendInterval = this.lastHeartBeatInterval
			}
		}
	}
}
