import HttpProxy from './net/http/HttpProxy'
import Setting from './setting/Setting'
import Toolkit from './utils/Toolkit'
import UrlUtil from './utils/UrlUtil'
import AESUtil from './utils/AESUtil'
import EventDispatcher from './event/EventDispatcher'
import HallServer from './apis/hall/HallServer'

export default class Global {
	static Event = new EventDispatcher()
	static Http = new HttpProxy()
	static HallServer = new HallServer()
	static Setting = new Setting()

	static AESUtil = new AESUtil()
	static UrlUtil = new UrlUtil()
	static Toolkit = new Toolkit()

	static setup() {
		window.Global = this
		this.Http.setup()
		this.HallServer.setup()
	}
}
