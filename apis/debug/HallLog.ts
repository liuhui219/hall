export enum LogLevel {
	None = 0,
	Log = 0x01,
	Warn = 0x02,
	Net = 0x04,
	Error = 0x08,
	All = 0xff,
}

export default class HallLog {
	static logLevel: LogLevel = LogLevel.All
	static logEnable = true
	public static setLogEnable(logEnable: boolean) {
		this.logEnable = logEnable
	}
	private static getLogContent(args: any[]) {
		for (let i = args.length - 1; i >= 0; i--) {
			if (typeof args[i] == 'object' && args[i] != null && args[i] != undefined) {
				try {
					args[i] = JSON.stringify(args[i])
				} catch (error) {}
			}
		}
		let content = 'HallLog ' + this.getDateStr() + args.join('\t,')
		return content
	}

	private static getDateStr() {
		let d = new Date()
		let str = d.getHours().toString()
		let timeStr = ''
		timeStr += (str.length == 1 ? '0' + str : str) + ':'
		str = d.getMinutes().toString()
		timeStr += (str.length == 1 ? '0' + str : str) + ':'
		str = d.getSeconds().toString()
		timeStr += (str.length == 1 ? '0' + str : str) + ':'
		str = d.getMilliseconds().toString()
		if (str.length == 1) str = '00' + str
		if (str.length == 2) str = '0' + str
		timeStr += str

		timeStr = '[' + timeStr + ']'
		return timeStr
	}

	/***************************************************public ***********************************************/
	static logObj(...args) {
		let logger = console.log
		if (this.logEnable && this.logLevel & LogLevel.Log) {
			logger.call(this, args)
		}
	}

	static log(...args) {
		let logger = console.log
		if (this.logEnable && this.logLevel & LogLevel.Log) {
			logger.call(this, '\x1B[36m ' + this.getLogContent(args))
		}
	}

	static warn(...args) {
		let logger = console.warn
		if (this.logEnable && this.logLevel & LogLevel.Warn) {
			logger.call(this, this.getLogContent(args))
		}
	}

	static net(...args) {
		let logger = console.log
		if (this.logEnable && this.logLevel & LogLevel.Net) {
			logger.call(this, this.getLogContent(args))
		}
	}

	static error(...args) {
		let logger = console.error
		if (this.logEnable && this.logLevel & LogLevel.Error) {
			logger.call(this, this.getLogContent(args))
		}
	}
}
