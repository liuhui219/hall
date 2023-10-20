export default class BaseHandler {
	server

	constructor(server) {
		this.server = server
	}

	checkInQueue(msgParam) {
		return true
	}
}
