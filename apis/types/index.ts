import { ComputedOptions, ConcreteComponent, MethodOptions } from 'nuxt/dist/app/compat/capi'
import { GetMsgListInfo, TServer, UserSelfCfg, VipPowerStruct } from '~~/types/appserverComponents'

export interface GameConfig {
	game_id: number //游戏ID
	name: string //游戏名称
	gclass: number //游戏分类
	gplat: number //游戏厂商
	hb_tag?: number //hot标签
	gtype: number //类型
	power: number //排序
	demo: boolean //true/false：有/无试玩模式
	top: number //推荐标签
	icon?: string //图标
	special_icon?: string //图标
	status: number //状态
	direction: number //横竖屏
}

export interface popupHeaderAndNavbar {
	[path: string]: HeaderAndNavbarConfig
}
export interface HeaderAndNavbarConfig {
	overlay: string
	class?: string
	index?: number
}

export interface PopupConfig {
	show: boolean
	name: string
	data: object
	full: boolean
	header: boolean
	navbar: boolean
	position?: string
	overlay?: string
	class?: string
	index?: number | null
}

//页脚具体配置
export interface FooterCfgItem {
	pTitle: string
	descTitle: string
	descList: DesceCfg[]
}

export interface DesceCfg {
	clickID: number
	descTitle: string
	status: number
}

type GlobalDialog = {
	show: Boolean
	title: string
	content: String
	confirmButtonText: string
	cancelButtonText: string
	showConfirmButton: Boolean
	showCancelButton: Boolean
	confirm: Function
	cancel: Function
}

export interface mapFace {
	[code: string | number]: any
}

export interface urlConfig {
	[code: string]: string
}

export interface componentFace {
	[code: string]: string | ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions>
}

//前端错误提示
export interface errorMessage {
	type?: string
	id: string
	msg: string
	icon?: string
}

//厂商数据
export interface platConfig {
	PlatId?: number
	gclass?: number
	logo?: string
	name?: string
	power?: number
	status?: number
	use_point2?: number
}

export interface providerConfig {
	provider_item: string
	plat_id: string | number
}

export interface userPoint {
	point: number
	bonus: number
	code: number
	bonusCode: number
}

export interface userData {
	uid?: number
	token?: string
	nickname?: string
	headimg?: string
	point?: number
	user_type?: number //
	pack_no?: number
	general?: number
	pid?: number
	open_id?: string
	accesstoken?: string
	routes?: Array<TServer> // 返回游戏路由
	lroutes?: Array<TServer> // 返回登录的路由
	t_url?: string // 返回客户端测试的URL
	register_ip?: string
	last_login_ip?: string
	list_ip?: string
	self_cfg?: UserSelfCfg
	vip_power?: VipPowerStruct
	server_id?: string
	merge_point?: number
	merge_type?: number
	sphone?: string // 带星号不加密的手机号码
	bank_point?: number
	vip_coin?: number // 当前等级
	vip_level?: number // 当前等级
	next_coin?: number // 离下一vip差多少
	real_name?: string // 姓名
	account?: string
	phone?: string // 手机
	phone_bind?: boolean // 手机是否绑定
	email?: string // 邮箱
	email_bind?: boolean // 邮箱是否绑定
	is_pay?: number // 是否充值
	all_put_code?: number // 所需要的打码量
	ready_put_code?: number // 已经的打码量
	cpf_account?: string
	fname?: string
	lname?: string
	unusual_name?: number // 异常的姓名
	birth?: string // 生日
	country?: string // 国家
	state?: string // 区
	street_address?: string // 街道
	postal_code?: string // 邮编
	vip?: number //vip层级
	client_json?: string
	activating?: boolean
	coin_vip_level?: number
	user_point: userPoint
}

export interface shareItem {
	url?: string
	name?: mapFace
	icon?: string
	hide?: string | number
}

export interface dialog {
	title?: string
	img?: string
	show?: boolean
	text?: string
	ok?: Function
	cancel?: Function
	ok_text?: string | boolean
	cancel_text?: string | boolean
}

export interface roulette {
	atype: number
	cfg: mapFace
	status: boolean
	job1: mapFace
	job2: mapFace
	active_text: mapFace
	second_title: mapFace
	color_btn: mapFace
	color_left_down: mapFace
	color_right_up: mapFace
	content_title: mapFace
	content_btn_title: mapFace
	lang_name: mapFace
	name: string
	loc_url: string | mapFace
	jump_type: number
	ptype: number
	stime: number
	etime: number
	sort: number
	count_down: number
	rules: mapFace
	pop_ups: number
}

export interface webMessageConfig extends GetMsgListInfo {
	page_read?: boolean //用户操作查看时仅仅修改此字段 后续切换才设置red_status
}

export interface otherStoreConfig {
	title?: String
	url?: String
	classContent?: String
	classOverlay?: String
	classModal?: String
	initFunc?: Function
	loadFunc?: Function
	destoryFunc?: Function
	data?: mapFace
}
