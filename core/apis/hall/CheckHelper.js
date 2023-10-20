export default class CheckHelper {
	checkNum = 0
	MAXCHECKNUM = 1000000

	clear() {
		this.checkNum = 0
	}
	updateChecker() {
		this.checkNum++
		if (this.checkNum > this.MAXCHECKNUM) {
			this.checkNum = 0
		}
	}
	getChecker() {
		return this.checkNum
	}

	getNomalChecker() {
		return this.checkNum + '_' + this._getNowTimeStr()
	}
	_getNowTimeStr() {
		let date = new Date()
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		let D = date.getDate() + ' '
		let h = date.getHours() + ':'
		let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
		let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
		return M + D + h + m + s
	}
}
