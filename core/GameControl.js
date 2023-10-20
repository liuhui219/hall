import GameServer, { GameCommand } from './apis/game/GameServer'
import SessionHandler from './apis/game/handlers/SessionHandler'
import Global from './Global'

export default class GameControl {
	gameServer = null

	gameKey = 'nokey'

	constructor(gameKey) {
		this.gameKey = gameKey || 'game'
		console.log('GameControl constructor gameKey:' + this.gameKey)
		this.setup()
	}

	setup() {
		this.gameServer = new GameServer()
		this.gameServer.setup()
		Global.Http.onRegister(this.gameKey, this.onUpdate.bind(this))

		this.gameServer.on(GameServer.Event_GameSocketOpen, this, this.onGameSocketOpen)

		this.gameServer.registDefaultHandler(GameCommand.Session, new SessionHandler(this.gameServer))
	}

	onGameSocketOpen() {
		if (this.gameServer.isRunning) {
			this.gameServer.sendEnter()
		}
	}

	onUpdate(dt) {
		this.gameServer.onUpdate(dt)
	}

	registHandler(key, handler) {
		this.gameServer.registHandler(key, handler)
	}

	unregistHandler(key) {
		this.gameServer.unregistHandler(key)
	}

	//关闭游戏统一入口
	shutDown() {
		this.gameServer.stop()
		this.gameServer.clearHandlers()
		Global.Http.unRegister(this.gameKey)
	}

	//进入游戏统一入口，参数带 serverRoutes gid glv mod 之类的
	enterGame(gameInfo, socketFuncName = 'event') {
		//需要从外部获取数据，生成gameInfo结构体
		this.gameServer.serverRoutes = gameInfo.serverRoutes
		this.gameServer.gid = gameInfo.gid
		this.gameServer.glv = gameInfo.glv

		if (gameInfo.mod) {
			let arr = gameInfo.mod.split('.')
			gameInfo._svr_t = arr[0]
			gameInfo._svr_id = arr[1]
		}
		if (gameInfo._svr_t != undefined) {
			this.gameServer._svr_t = gameInfo._svr_t
		}
		if (gameInfo._svr_id != undefined) {
			this.gameServer._svr_id = Number(gameInfo._svr_id)
		}
		this.gameServer.bNoUrlMod = gameInfo.bNoUrlMod

		if (gameInfo.demoUid != undefined) {
			this.gameServer.demoUid = gameInfo.demoUid
		}
		if (gameInfo.demoToken != undefined) {
			this.gameServer.demoToken = gameInfo.demoToken
		}
		this.connectGame(socketFuncName)
	}

	connectGame(socketFuncName) {
		this.gameServer.run()
		this.gameServer.connect(socketFuncName)
	}
}
