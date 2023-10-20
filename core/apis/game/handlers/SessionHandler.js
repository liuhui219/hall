import GameServer from '../GameServer'
import BaseHandler from './BaseHandler'

export default class SessionHandler extends BaseHandler {
	Handle(session) {
		if (this.server.gid != session._para._gid) {
			console.error('SessionHandler GameServer.gid !== session._para._gid')
			this.server.event(GameServer.EVENT_FORCE_LEAVE_GAME)
			return
		}

		if (session._para._svr_t != undefined && session._para._svr_id != undefined) {
			let newMod = session._para._svr_t + '.' + session._para._svr_id
			this.server.changeMod(newMod)
		}

		this.server.Context.selfSrc = session._src
		this.server.Context.session = session._para
		this.server.setSession(session)
		// Global.HallServer.setSession(session);
	}

	checkInQueue() {
		return false
	}
}
