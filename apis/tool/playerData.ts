
export default class PlayerData {
	uid
	//vip等级
	_vip
	set vip(newVip) {
		if (this._vip == newVip) return
		this._vip = newVip
	}
	get vip() {
		return this._vip ? this._vip : 0
	}

	vipExp
	token
	pack //渠道id
	pid //上级id
	open_id
	accesstoken
	payChannel
	urlSign
	ip
	//玩家标识
	merge_type = ''
	//捕鱼炮台
	buyuPaotai
	//是否充值过
	is_pay = 0
	//玩家类型 1 游客 2 绑定手机
	_type
	set type(newType) {
		if (this._type == newType) {
			return
		}
		this._type = newType
	}
	get type() {
		return this._type
	}
	_deviceId = ''
	get deviceId() {
		if (this._deviceId == null || this._deviceId == '') {
			this._deviceId = getDeviceObject().device_id
		}
		return this._deviceId
	}
	//玩家手机
	_phone = ''
	set phone(newPhone) {
		if (this._phone == newPhone) {
			return
		}
		this._phone = newPhone
	}
	get phone() {
		return this._phone
	}

	//玩家昵称
	_nickname = ''
	set nickname(newNickname) {
		if (this._nickname == newNickname) {
			return
		}
		this._nickname = newNickname
	}
	get nickname() {
		return this._nickname
	}

	//玩家头像
	_headimg = ''
	set headimg(newHeadimg) {
		if (this.headimg == newHeadimg) {
			return
		}
		this._headimg = newHeadimg
	}
	get headimg() {
		return this._headimg
	}

	//玩家头像框
	_headkuang = '0'
	set headkuang(newHeadkuang) {
		if (newHeadkuang == '') {
			newHeadkuang = '0'
		}
		if (this.headkuang == newHeadkuang) {
			return
		}
		this._headkuang = newHeadkuang
	}
	get headkuang() {
		return this._headkuang
	}

	//金币数量
	_point
	set point(newPoint) {
		if (this._point == newPoint) {
			return
		}
		this._point = newPoint
	}
	get point() {
		return this._point
	}

	//银行存款数量
	_bank_point
	set bank_point(newPoint) {
		if (this._bank_point == newPoint) {
			return
		}
		this._bank_point = newPoint
	}
	get bank_point() {
		return this._bank_point
	}

	clear() {
		this.uid = 0
		this.vip = 0
		this.vipExp = 0
		this.headkuang = '0'
		this.buyuPaotai = '0'
		this.token = ''
		this.nickname = ''
		this.headimg = ''
		this.point = 0
		this.type = 0
		this.phone = ''
		this.pack = 0
		this.pid = null
		this.open_id = ''
		this.accesstoken = ''
		this.is_pay = 0
	}

	init(msg) {
		this.clear()
		this.uid = msg.uid
		this.token = msg.token
		this.pack = msg.pack_no ? msg.pack_no : 0
		this.pid = msg.pid ? msg.pid : 0
		this.open_id = msg.open_id
		this.accesstoken = msg.accesstoken
		this.ip = msg.list_ip || ''
		this.vip = msg.vip || 0
		this.vipExp = msg.vip_coin || 0
		//玩家游戏数据
		this.update(msg)
		this.urlSign = '' //Global.getSign(this.uid + this.token + this.deviceId, Global.signKey);
	}

	updateMoney(msg) {
		this.point = msg.point
		this.bank_point = msg.bank_point
		this.is_pay = msg.is_pay
	}

	update(msg) {
		this.uid = msg.uid
		if (msg.self_cfg) {
			this.headkuang = '' + msg.self_cfg['head']
			this.buyuPaotai = '' + msg.self_cfg['pao']
		}

		this.nickname = msg.nickname
		this.headimg = msg.headimg
		this.point = msg.point ? msg.point : 0
		this.bank_point = msg.bank_point ? msg.bank_point : 0
		this.type = msg.user_type
		this.is_pay = msg.is_pay ? msg.is_pay : 0
		this.phone = msg.phone ?? ''
	}
}
