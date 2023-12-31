// Code generated by goctl. DO NOT EDIT.

export interface UserEmailLoginReq {
	email: string // email
	pwd: string // 密码
	rememberMe?: number
}

export interface UserPhoneLoginReq {
	phone: string // 电话
	pwd: string // 密码
}

export interface UserSelfCfg {
	head: number // 0默认 头像框
	pao: number // 0默认 捕鱼炮台
}

export interface VipPowerStruct {
	power: Array<number> // 有啥权力 1 可以设置相框 2可以设置炮台
	head: Array<number> // 可以设置那几个头像 1 2 3 4 5
	pao: Array<number> // 可以设置那几个炮台 1 2 3 4 5
}

export interface Conditoin {
	vip: number // vip 等级
	level: number // level 等级
	os_type: number // 手机类型 0全部 2 android 3 ios 4原生
	app_ver: string // APP版本
}

export interface TServer {
	id: number
	appId: number
	gameId: number
	uids: Array<number>
	// Uids       string    `json:"-"`
	serverType: number
	serverName: string
	serverId: number
	host?: string
	sad?: string
	port?: number
	us_port?: number
	lo_type?: number
	lo_port?: number
	conditoin: Conditoin
	attr?: Blob
}

export interface UserLoginRsp {
	uid: number
	token: string
	nickname: string
	real_name: string
	account?: string
	cpf_account?: string
	lname?: string
	fname?: string
	headimg: string
	point: number
	user_type: number // -----
	phone: string // ------
	pack_no: number
	general: number
	pid: number
	bank_point: number // 银行金币
	open_id: string
	accesstoken: string
	routes: Array<TServer> // 返回游戏路由
	lroutes: Array<TServer> // 返回登录的路由
	t_url: string // 返回客户端测试的URL
	register_ip: string
	last_login_ip: string
	list_ip: string
	vip_coin: number // 当前等级
	vip_level: number // 当前等级
	next_coin: number // 离下一vip差多少
	self_cfg: UserSelfCfg
	vip_power?: VipPowerStruct
	server_id: string
	merge_point?: number
	merge_type: number
}
