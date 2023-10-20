export default class BaseServerHelper {
	server

	constructor(server) {
		this.server = server
		this.onInit()
	}

	onInit() {}

	run() {}

	//GameServer关闭时 清理适用
	clear() {}

	onUpdate(dt) {}
}
