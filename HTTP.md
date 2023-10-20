# 字段前带 ### 为目前无用字段

==================================================================================================

# /api/sysconfig

## 获取后端系统配置 前端加 cookie

### req

```
{}
```

### rsp

```
{
    app_id: number
	// 层级配置
	vip_list: Array<VipLevelConfig> [{
		 // id
		id: number
		// vip等级
		vip: number
		// vip积分
		vip_coin: number
		// 层级id
		stage_id: number
		// 奖励
		reward: RewardCfg {
			// 配置类型; 1.Vip奖励配置, 2.活动奖励配置, 3.任务奖励配置, ....
			reward_type: number
			 // 标题
			title: { [key: string]: string }
			// 描述
			desc: { [key: string]: string }
			### // 图片
			### img: string
			// 固定金额
			point: number
			### // vip积分
			### vip_int: number
			### // 任务积分
			### task_int: number
			// 道具 id,多个逗号分隔
			props: Array<PromoItemCfg> [{
				### // app_id
				### app_id: number
				### // 配置编号
				### cfg_id: number
				// 道具类型,参考constCom.PromoItemType定义
				item_type: number
				### // 状态; 0.禁用, 1.启用
				### status: number
				### // 是否可重复使用; 0.否, 1.是
				### repeat_use: number
				### // 是否可直接使用; 0.否, 1.是
				### direct_use: number
				// 多语言配置json字符串, map[int32]PromoItemLang
				item_lang: string
				// 存款优惠道具配置
				deposit_reward_cfg?: DepositRewardItemCfg {
					// 优惠类型, 0.固定值, 1.比例
					reward_type?: number
					### // 打码倍数
					### dama_multi?: number
					### // 时间限制,单位:小时; 0.不限制
					### limit_hour?: number
					// 奖励配置
					reward_list?: Array<PayPromoItemRewardCfg> {
						### // 参加金额,*10000
						### join_point?: number
						// 存款奖励金额/比例,*10000
						value?: number
						 // 最高限额,*10000
						limit_point?: number
					}
				}
				### // 金币道具配置
				### point_add_cfg?: PointPromoItemCfg
				### // 转盘道具配置
				### zhuan_pan_cfg?: ZhuanPanPromoItemCfg
				### // VIP积分加倍道具配置
				### vip_point_multi_cfg?: VipPointMultiItemCfg
				### // VIP积分道具配置
				### vip_point_add_cfg?: VipPointAddItemCfg
			}]
			### // 有效时间,单位秒; 0.没有时间限制
			### valid_time: number
		}
	}]
	// 等级配置
	vip_stage_list: Array<VipStageConfig> [{
		// id  1-7
		id: number
		### // 是否弹升级提示
		### ngame: number
		// 起始等级
		start_level: number
		// 结束等级
		end_level: number
		### // 积分比率
		### coin_rate: number
		### // vip层级图标
		### logo: string
		### // 层级名称  {"1":""} 后端转发
		### name: string
		### // vip层级图标
		### image: string
	}]
	// 佣金等级配置
	commi_config_list: Array<GAgentCommiConfig> [{
		### app_id: number
		gclass: number
		commi_list: Array<GAgentCommiLevel> [{
			### min_point: number
			### max_point: number
			### reward_id: string
			commi: number
		}]
		### ignore_game_list: Array<number>
	}]
	 // 活动配置
	activity_cfg_list: Array<ActivityCfg> [{
		atype: number
		cfg: any
		status: boolean
		### job1?: ActivityJob
		### job2?: ActivityJob
		### active_text?: { [key: string]: string } //
		### second_title?: { [key: string]: string } //
		### color_btn: { [key: string]: string } // 按钮颜色
		### color_left_down: { [key: string]: string } // 左下颜色
		### color_right_up: { [key: string]: string } // 右下颜色
		### content_title: { [key: string]: string } // 正文标题
		### content_btn_title: { [key: string]: string } // 按钮文字
		### lang_name?: { [key: string]: string }
		### thum_url?: { [key: string]: string } // 缩略图
		### url?: string
		### lang_url?: { [key: string]: string }
		### name: string //
		### loc_url?: string //
		### loc_name?: string //
		### jump_type: number
		### jump_url?: string
		### ptype: number
		### flag?: number // 标签; 0.无, 1.火爆, 2.新增
		### stime?: number //
		### etime?: number //
		### sort: number // 排序
		### count_down?: number
		rules: { [key: string]: string } // 规则说明
		### pop_ups: number // 弹窗 0 不弹 1 弹
	}]
	// 活动信息
	activity_info_list: GetMyActivityListRsp {
		activity_list: Array<ActivityInfo> [
			{
				atype: number
				### cfg: any
				### status: boolean
				### job1?: ActivityJob
				### job2?: ActivityJob
				active_text?: { [key: string]: string } //
				second_title?: { [key: string]: string } //
				color_btn: { [key: string]: string } // 按钮颜色
				color_left_down: { [key: string]: string } // 左下颜色
				color_right_up: { [key: string]: string } // 右下颜色
				content_title: { [key: string]: string } // 正文标题
				### content_btn_title: { [key: string]: string } // 按钮文字
				lang_name?: { [key: string]: string }
				### thum_url?: { [key: string]: string } // 缩略图
				### url?: string
				lang_url?: { [key: string]: string }
				### name: string //
				loc_url?: string //
				loc_name?: string //
				jump_type: number
				jump_url?: string
				### ptype: number
				### flag?: number // 标签; 0.无, 1.火爆, 2.新增
				### stime?: number //
				### etime?: number //
				### sort: number // 排序
				### count_down?: number
				### rules: { [key: string]: string } // 规则说明
				### pop_ups: number // 弹窗 0 不弹 1 弹
			}
		]
		###md5: string
	}
	### // 页脚配置MD5
	### footer_cfg_md5: string
	### // 轮播图配置MD5
	### banner_cfg_md5: string
	// 游戏配型
	game_type_list: Array<number>
	### // 活动md5
	### my_activity_md5: string
	// 厂商列表
	game_plat_list: Array<GgamePlatform> [{
		PlatId: number // 平台id
		name: string // 平台名字
		logo: string // logo
		### power: number // 排序
		### gclass: number // 分类
		status: number // 状态 0关闭 1开启
	}]
	### //渠道代码
	### pack_ext_code?: string
	// 奖励类型配置
	reward_type_cfg: Array<RewardTypeConfig> [{
		// 配置类型
		reward_type: number
		// 标题
		title: { [key: string]: string }
	}]
	// 客户端更新提示
	### update_notice?: NoticeInfo
	// 注册类型 0都开放  2账号注册 2手机号注册
	### reg_type: number
	// 货币类型
	currency?: string
	 // APP配置的金币比例
	point_ratio: number
	### open_account_popup?: number
	### // 客户端data域名数组
	### data_hosts?: Array<string>
	### // 1 客户端开启debug
	### debug?: number
	### // 官网地址
	### official_url?: string
	### // 服务器生成的唯一ID
	### server_id?: string
	// 可用语言包
	lang: Array<number>
	### // 是否已登录 1 登录 0 未登录
	### login: number
	// 数据 路由
	###data: any
	// 三方最低游戏金额
	third_minpoint: number
	### // 模块提示文本跳转配置
	### desc_content_cfg_list: Array<DescContentCfg>
}
```

==================================================================================================

# /api/login/checklogin

## 获取登录状态

### req

```
{}
```

### rsp

```
    {
		uid: number
		### expiretime: number
		### appid: number
		### token: string
		### is_free: boolean // 是否试玩
	}
```

==================================================================================================

# /api/gameface/gamedata/getgamelistfilter

## 获取游戏列表

### req

```
{}
```

### rsp

```
{
	game_list: {
		game_id?: number
		name?: string
		gplat?: number
		gclass: number // 游戏种类
		direction?: number // 方向横竖屏 1. 横屏  2. 竖屏
		jump?: number // 跳转方式（区分有无返回） 1. 外部链接 2. iframe
		adapter?: number // 特殊适配 0. 无适配 1. ios适配
		icon?: string // 游戏图标
		special_icon?: string // 特殊图标
		demo?: boolean // true 开启试玩
		status?: number
		gtype: number
	}
}
```

==================================================================================================

# /appface/appuser/checkversion

## 获取渠道配置

### req

```
{}
```

### rsp

```
{
	pack_ext_code?: string // 渠道代码
	currency?: string // 货币类型
	point_ratio: number // APP配置的金币比例
	lang: Array<number> // 可用语言包
}
```

==================================================================================================

# /api/appface/appuser/getuserinfo

## 获取用户信息

### req

```
{}
```

### rsp

```
{
	nickname: string
	uid: number
	user_type: number // 1游客 没有绑定手机 2 绑定手机了 3微信 4第三方账号
	bank_point: number
	point: number
	vip_coin: number // 当前等级
	vip_level: number // 当前等级
	next_coin: number // 离下一vip差多少
	real_name?: string // 姓名
	account?: string
	phone: string // 手机
	phone_bind: boolean // 手机是否绑定
	email: string // 邮箱
	email_bind: boolean // 邮箱是否绑定
	is_pay: number // 是否充值
	all_put_code: number // 所需要的打码量
	ready_put_code: number // 已经的打码量
	cpf_account: string
	fname: string
	lname: string
	birth: string // 生日
	country: string // 国家
	state: string // 区
	street_address: string // 街道
	postal_code: string // 邮编
}
```

==================================================================================================

# /api/appface/appuser/getuserpoint

## 获取用户积分余额信息

### req

```
{}
```

### rsp

```
{
	is_pay: number // 是否充值
	bank_point: number
	point: number
	all_put_code?: number // 所需要的打码量
	ready_put_code?: number // 已经的打码量
}
```

==================================================================================================

# /api/login/verifycode

## 获取验证码

### req

```
{
	phone?: string
	code_type?: number
	acode?: string
	device?: ClientDevInfo // 设备信息
	verify_type: number // 0 sms 1 email
	email: string // email地址
	retry: number // 重试 0否 1是
	ostype: number // ostype  1 web
}
```

### rsp

```
{}
```

==================================================================================================

# /api/user/newforgetcodecheck

## 验证验证码有效性

### req

```
{
	acode?: string
	phone?: string
	email?: string // email地址
	code: string // 验证码
}
```

### rsp

```
{}
```

==================================================================================================

# /api/user/newforgetaccountpwd

## 忘记密码页面修改密码

### req

```
{
	key: string // 校验验证码时返回的data
	new_pwd: string // 新密码
}
```

### rsp

```
{}
```

==================================================================================================

# /api/login/useremaillogin

## 邮件登录

### req

```
{
	app_id: number
	email?: string // email
	phone?: string // 电话
	pwd: string // 密码
	code: string // 第三方code
	acode?: string // 区号
	### remoteaddr?: string // 远程
	### host?: string //
	### os?: number // 操作系统
	rememberme?: number // 是否需要记住
	### open_id?: string // 第三方OPENID
	### nickname?: string //
	### real_name?: string // 真实姓名
	### head_img?: string // ---每次都要用
	### source_type?: number // 来源 0// 1 openinstall 2 copy 3 cookie 4 get
	### sub_type?: number // 第三方类型
	### old_app_id?: number // 老appid
	### reg_info?: string // 设备信息
	device?: ClientDevInfo // 设备信息
	### lang: number // 语言
	invite_code?: number
	pack?: number
	// 新加登录注册参数
	first_map: string
	source_map: string
	### is_token_login?: boolean
	### token?: string
	### source_param: string // 来源参数 tracker=aid23cid232&clickid=chh473bcch545
	receive_email: boolean // 是否接收推广邮件
}
```

### rsp

```
{
	uid: number
	token: string
	### nickname: string
	### real_name: string
	### account?: string
	### point: number
	### user_type: number // -----
	### phone: string // 手机
	### phone_bind: boolean // 手机是否绑定
	### email: string // 邮箱
	### email_bind: boolean // 邮箱是否绑定
	pack_no: number
	general: number
	pid: number
	### bank_point: number // 银行金币
	open_id: string
	### register_ip: string
	### last_login_ip: string
	list_ip: string
	### vip_coin: number // 当前等级
	### vip_level: number // 当前等级
	### next_coin: number // 离下一vip差多少
	### self_cfg: UserSelfCfg
	### vip_power?: VipPowerStruct
	### server_id: string
	### merge_point?: number
	### merge_type: number
	### cpf_account: string
	### fname: string
	### lname: string
	### birth: string // 生日
	### country: string // 国家
	### state: string // 区
	### street_address: string // 街道
	### postal_code: string // 邮编
	### all_put_code: number // 所需要的打码量
	### ready_put_code: number // 已经的打码量
}
```

==================================================================================================

# /api/login/userphonelogin

## 手机号登录

### req

```
{
	app_id: number
	email?: string // email
	phone?: string // 电话
	pwd: string // 密码
	code: string // 第三方code
	acode?: string // 区号
	### remoteaddr?: string // 远程
	### host?: string //
	### os?: number // 操作系统
	rememberme?: number // 是否需要记住
	### open_id?: string // 第三方OPENID
	### nickname?: string //
	### real_name?: string // 真实姓名
	### head_img?: string // ---每次都要用
	### source_type?: number // 来源 0// 1 openinstall 2 copy 3 cookie 4 get
	### sub_type?: number // 第三方类型
	### old_app_id?: number // 老appid
	### reg_info?: string // 设备信息
	device?: ClientDevInfo // 设备信息
	### lang: number // 语言
	invite_code?: number
	pack?: number
	// 新加登录注册参数
	first_map: string
	source_map: string
	### is_token_login?: boolean
	### token?: string
	### source_param: string // 来源参数 tracker=aid23cid232&clickid=chh473bcch545
	receive_email: boolean // 是否接收推广邮件
}
```

### rsp

```
{
	uid: number
	token: string
	### nickname: string
	### real_name: string
	### account?: string
	### point: number
	### user_type: number // -----
	### phone: string // 手机
	### phone_bind: boolean // 手机是否绑定
	### email: string // 邮箱
	### email_bind: boolean // 邮箱是否绑定
	pack_no: number
	general: number
	pid: number
	### bank_point: number // 银行金币
	open_id: string
	### register_ip: string
	### last_login_ip: string
	list_ip: string
	### vip_coin: number // 当前等级
	### vip_level: number // 当前等级
	### next_coin: number // 离下一vip差多少
	### self_cfg: UserSelfCfg
	### vip_power?: VipPowerStruct
	### server_id: string
	### merge_point?: number
	### merge_type: number
	### cpf_account: string
	### fname: string
	### lname: string
	### birth: string // 生日
	### country: string // 国家
	### state: string // 区
	### street_address: string // 街道
	### postal_code: string // 邮编
	### all_put_code: number // 所需要的打码量
	### ready_put_code: number // 已经的打码量
}
```

==================================================================================================

# /api/login/userregister

## 用户注册

### req

```
{
	app_id: number
	email?: string // email
	phone?: string // 电话
	pwd: string // 密码
	code: string // 第三方code
	acode?: string // 区号
	### remoteaddr?: string // 远程
	### host?: string //
	### os?: number // 操作系统
	rememberme?: number // 是否需要记住
	### open_id?: string // 第三方OPENID
	### nickname?: string //
	### real_name?: string // 真实姓名
	### head_img?: string // ---每次都要用
	### source_type?: number // 来源 0// 1 openinstall 2 copy 3 cookie 4 get
	### sub_type?: number // 第三方类型
	### old_app_id?: number // 老appid
	### reg_info?: string // 设备信息
	device?: ClientDevInfo // 设备信息
	### lang: number // 语言
	invite_code?: number
	pack?: number
	// 新加登录注册参数
	first_map: string
	source_map: string
	### is_token_login?: boolean
	### token?: string
	source_param: string // 来源参数 tracker=aid23cid232&clickid=chh473bcch545
	receive_email: boolean // 是否接收推广邮件
}
```

### rsp

```
{
	uid: number
	token: string
	### nickname: string
	### real_name: string
	### account?: string
	### point: number
	### user_type: number // -----
	### phone: string // 手机
	### phone_bind: boolean // 手机是否绑定
	### email: string // 邮箱
	### email_bind: boolean // 邮箱是否绑定
	pack_no: number
	general: number
	pid: number
	### bank_point: number // 银行金币
	open_id: string
	### register_ip: string
	### last_login_ip: string
	list_ip: string
	### vip_coin: number // 当前等级
	### vip_level: number // 当前等级
	### next_coin: number // 离下一vip差多少
	### self_cfg: UserSelfCfg
	### vip_power?: VipPowerStruct
	server_id: string
	merge_point?: number
	### merge_type: number
	### cpf_account: string
	### fname: string
	### lname: string
	### birth: string // 生日
	### country: string // 国家
	### state: string // 区
	### street_address: string // 街道
	### postal_code: string // 邮编
	### all_put_code: number // 所需要的打码量
	### ready_put_code: number // 已经的打码量
}
```

==================================================================================================

# /api/gameface/loadgame/entergame

## 进入游戏

### req

```
{
	gid: number // 游戏ID
	ip: string
	lang: number // 语言
	externalURL: string
	demo: boolean // 是否是进试玩demo
	app_id: number
	os_type: number // 0未知 1 pc 2.安卓 app 3.ios APP 4.安卓web 5.ios web
}
```

### rsp

```
{
	url?: string // 登录该游戏的URL
	token?: string // 登录游戏的token
	betby_rsp?: any // BETBY返回的数据
	free_uid?: number // 试玩UID
	free_token?: string // 试玩token
}
```

==================================================================================================

# /api/appface/appuser/getbankinfo

## 获取提现配置

### req

```
{
	bind_type: number
	### device: UserPayDevices // 版本信息
}
```

### rsp

```
{
	### entrus_bank_account: string
	### entrus_bank_user: string
	### entrus_bank_name: string
	### bank_name?: string // 银行支行
	### bank_provcince?: string // 开户省
	### bank_city?: string // 开户市
	### bank_certificate_code?: string // 银行卡身份证
	### ali_account?: string
	### ali_name?: string
	### ali_certificate_code?: string // 支付宝身份证
	### ali_status: number // 支付宝提现 0不可展示 1展示
	### bank_status: number // 银行卡提现 0不可展示 1展示
	### XinYuan_status: number // 新元助手状态 0不显示 1显示 新元助手只在安卓显示
	### XinYuan_fixpoint?: Array<number> // 新元提現金額列表
	### ali_min_put_point?: number
	### bank_min_put_point: number
	### ali_day_max_put_point?: number
	### bank_day_max_put_point: number
	### ali_max_put_point?: number
	### bank_max_put_point: number
	### ali_put_server_charge?: number
	### ali_put_server_charge_set?: Array<PutServerChargeSetting>
	### bank_put_server_charge: number
	### bank_put_server_charge_set: Array<PutServerChargeSetting>
	### forzen_point: number
	### ali_put_day_max_num?: number
	### bank_put_day_max_num: number
	### min_put_server_charge: number
	### over_sea_entrus_bank_account: string // 账号
	### over_sea_entrus_bank_user: string // 姓名
	### over_sea_entrus_bank_name: string // 银行名字
	### over_sea_bank_status: number // 是否打开海外银行卡提现
	### over_sea_bank_min_put_point: number // 海外银行卡单笔最小
	### over_sea_bank_day_max_put_point: number // 海外银行卡一天最大
	### over_sea_bank_max_put_point: number // 海外银行卡单笔最大
	### over_sea_bank_put_server_charge: number // 海外银行卡手续费
	### over_sea_bank_put_server_charge_set: Array<PutServerChargeSetting>
	### over_sea_bank_put_day_max_num: number // 海外银行卡提现次数
	// USDT绑定信息
	usdt_status?: number // USDT提现标签是否显示, 0.不显示, 1.显示
	### usdt__min_put_point?: number // USDT单笔最小
	### usdt__day_max_put_point?: number // USDT一天最大
	### usdt__max_put_point?: number // USDT单笔最大
	### usdt__put_server_charge?: number // USDT手续费
	usdt__put_server_charge_set?: Array<PutServerChargeSetting>
	### usdt__put_day_max_num?: number // USDT提现次数
	### usdt_erc_addr?: string // erc20地址
	### usdt_trc_addr?: string // TRC20地址
	### usdt_omni_addr?: string // omni地址
	usdt_rate: number // USDT兑换法币的汇率, *100
	// 电子钱包绑定信息
	### ewallet_status: number // 电子钱包提现总开关, 0.关闭 1.开启
	### ewallet_list: Array<EWalletPutInfo> // 电子钱包列表
	// 巴西提现绑定信息
	bra_pay_status: number // 巴西代付开关, 0.关闭 1.开启
	bra_pay_list: Array<BRAPayPutInfo> // 巴西代付方式列表
	### put_code_per_cen: number // 打码量倍数
	### lave_put_code: number // 剩余打码量
	### put_server_charge_fee: number // 免提现手续费次数
	### quick_put_status: number // 快速提现开关 0关闭 1开启
}
```

==================================================================================================

# /api/appface/appfirst/getnewpayconfig

## 获取存款配置

### req

```
{}
```

### rsp

```
{
	### need_bind_phone: boolean
	// 新支付
	new_pay_info: Array<NewPayTypeRsp> [{
		### app_id: number
		### name: string
		pay_key: string
		### tip_status: number
		### tip: string
		### sale_num: number
		### dest: string
		### rand_sort: number // 页签内是否随机排序  0默认是 1 否
		data: Array<{ [key: string]: any }> [{
			### app_version:0
			### currency:1
			icon:""
			id:"6181271fee7a3b8becd2d0f8"
			lang_app_pay:"{\"1\":{\"name\":\"USDT_ERC20\",\"tip\":\"Use Ethereum blockchain USDT Pay\"},\"11\":{\"name\":\"USDT_ERC20\",\"tip\":\"Use Ethereum blockchain USDT Pay\"}}"
			### name:"USDT_ERC20"
			### pay_num_channel_id:0
			pay_num_list:[50, 100, 200, 500, 1000, 2000, 0, 0]
			pay_num_max:10000
			pay_num_min:10
			### pay_num_type:1
			pay_type:""
			### seq:0
			### status:1
			### tip:"Use Ethereum blockchain USDT Pay"
			ui_type:0
			### update_time:"2023-01-25 14:58:41"
		}]
	}]
	// USDT兑换法币的汇率, *100
	usdt_rate: number
}
```

==================================================================================================

# /api/appface/appuserwealth/usernewdownpay

## 发起充值

### req

```
{
	pay_key: string // 充值类型,参考constCom.NewPayType
	pay_type_id: string //
	price: number // 金额,单位:元,可带两位小数
	attach: string // 附加参数
	### device: UserPayDevices // 版本信息
	activity_id: number // 参加的活动id, 参考constCom.LimitTimeFirstPayActivity
	activity_param: string // 参加的活动附加参数
}
```

### rsp

```
{
	url: string // 充值链接
	qr_code: string // 充值二维码字符串
	type: string
	order_id: number
	### order_no: string
	ret: number // 1返回数据
}
```

==================================================================================================

# /api/appface/appuserwealth/getuserdownpaydata

## 获取充值订单发起结果

### req

```
{
	order_id: number
}
```

### rsp

```
{
	url: string
	### type: string
	### order_id: number
	### order_no: string
	### pay_sdk_type: number
	### token?: string
	### le_pay_url?: string
	### attach_param: string // 附加参数 json字符串格式
	### ret: number // 1返回数据
	### tServer: any // 支付盾
	qr_code: string // 支付二维码
}
```

==================================================================================================

# /api/appface/appuserwealth/applycash

## 申请提现

### req

```
{
	point: number // 提现金额,单位:元
	type: number // 提现类型, constCom.BindType
	sub_type: number // 提现子类型
	pwd: string // 提现密码
	usdt_type?: number // 1erc 2trc 3omni
	usdt_addr?: string // usdt地址
	usdt_rate: number // 本地货币换U的汇率
	usdt_point: number // 换算的USDT金额

	### entrus_bank_account?: string // 账号  密
	### entrus_bank_user?: string // 账号名称 密
	### entrus_bank_name?: string // 银行名称
	### bank_name?: string // 银行支行
	### bank_provcince?: string // 开户省
	### bank_city?: string // 开户市
}
```

### rsp

```
{
	### order_no?: string
	### other_bank_name: string // 异卡信息
	### other_bank_status: number // == 2的时候判断是异卡需要填写异卡信息
}
```

==================================================================================================

# /api/appface/appuser/edituserinfo

## 修改用户信息

### req

```
{
	real_name?: string // 姓名
	nickname: string
	headimg: string
	birth: string // 生日
	country: string // 国家
	state: string // 区
	city: string // 市
	street_address: string // 街道
	postal_code: string // 邮编
}
```

### rsp

```
{}
```

==================================================================================================

# /api/user/newbindphone

## 修改手机号

### req

```
{
	code: string
}
```

### rsp

```
{
	### point: number
	phone: string
	### bind_point: number
	### phone_point: number
}
```

==================================================================================================

# /api/user/newbindemail

## 绑定邮箱

### req

```
{
	code: string
}
```

### rsp

```
{
	### point: number
	phone: string
	### bind_point: number
	### phone_point: number
}
```

==================================================================================================

# /api/user/neweditaccountpwd

## 修改密码页面修改密码

### req

```
{
	pwd: string // 老密码
	new_pwd: string // 新密码
}
```

### rsp

```
{}
```

==================================================================================================

# /api/user/savenobindphone

## 绑定手机号

### req

```
{
	acode?: string
	phone?: string
}
```

### rsp

```
{}
```

==================================================================================================

# /api/user/savenobindemail

## 绑定邮箱

### req

```
{
	email?: string // email地址
}
```

### rsp

```
{}
```

==================================================================================================

# /api/appface/apptaskactivity/getmytaskactivityinfo

## 任务列表

### req

```
{
	### task_id: string
}
```

### rsp

```
{
	task_point: number // 任务积分
	task_point_left_time: number // 任务积分重置倒数时间
	day_left_time: number // 每日任务倒计时
	week_left_time: number // 每周任务倒计时
	month_left_time: number // 每月任务倒计时
	list: Array<GetMyTaskActivityCfgInfo> // 用户的任务信息列表
	progress: Array<UserTaskPointRewardItem> // 用户的任务积分奖励领取进度
}
```

==================================================================================================

# /api/appface/apptaskactivity/getusertaskpointreward

## 领取任务宝箱

### req

```
{
	need_task_point: number // 需要的任务积分
}
```

rsp

```
{
	reward_point: number // 奖励的金币,单位:元/10000
	reward_vip_point: number // 奖励的vip积分
}
```

==================================================================================================

# /api/appface/appuserwealth/getgamerecord

## 投注记录

### req

```
{
	page: number
	page_size: number
	gclass: number
	stime: number
	etime: number
	### gid: number
	### glv: string
	is_win: number // 0 全部 1 win 2 loss
}
```

### rsp

```
{
	list: Array<UserGameRecordInfo> [{
		gname: string // 游戏名字
		bet: number // 投注
		hit: number // 返奖
		itime: number // 时间戳
		### gqh: string // 游戏期号
		### gid: number
		### level: string
		### gd: string
		### subs?: any
		### bno?: string
	}]
}
```

==================================================================================================

# /api/appface/appusermsg/getmsglist

## 邮件公告列表

### req

```
{
	type: number
	### lang: number
	### flag: number // 0=全部；1=未读；2=已读
}
```

### rsp

```
{
	### mail_total: number
	### notice_tital: number
	### notice_total: number
	mail: Array<GetMsgListInfo> [{
		id: number
		title: string
		content?: string
		### itime?: string
		time_unix?: number
		red_status: number
		### give_point: number // 赠送金额
		### give_status: number // 是否领取
		lang_msg?: { [key: string]: MsgInfo }
		### lang_notify?: { [key: string]: NotifyInfo }
		### back_url?: string
		### jump_type?: number
		### jump_text?: string
		### jump_param?: string
		### lang_mail: { [key: string]: Mail }
	}]
	### notice: Array<GetMsgListInfo>
}
```

==================================================================================================

# /api/appface/appusermsg/readmsg

## 读消息接口

### req

```
{
	id: number
	msg_type: number
	read_status: number
	### lang: number
}
```

### rsp

```
{
	### id: number
	### title: string
	### red_status: number // 1已读 0没读
	### give_point: number // 赠送金额
	### give_status: number // 是否领取
	### content: string
	### content_title: string
	### back_url: string
	### from: string
	### send_time: string
	### time_unix: number
	### end_time: string
	### read_time: string
	### msg_type: number
	### jump_text: string // 按钮文本
	### jump_param: string // 跳转参数
	### jump_type: number // 跳转类型
}
```

==================================================================================================

# /api/appface/appuserwealth/getuserpaylist

## 用户充值列表

### req

```
{
	page: number
	limit: number
	status: number // 状态 支付状态 0全部 1未支付 2已支付 3失败
	date_type: number // 时间范围 0 全部 1 当天 2 最近7天 3 最近60天
}
```

### rsp

```
{
	### page: number
	### limit: number
	total: number
	list: Array<GetUserPayListInfo> [{
		### ctime: string // 时间
		ctype: number // 充值类型, SysPayType, 1 VIP充值 2 线上充值 3银行卡充值 4赠送 5小额支付  6 专享支付
		### pay_name: string //
		point: number // 金额
		real_point: number // 实际金额
		status: number // 状态 支付状态 1未支付 2已支付 3失败
		### order_no: string // 交易番号
		time_unix: number
		### cost_point: number // 三分充值手续费
	}]
}
```

==================================================================================================

# /api/appface/appuserwealth/applycashlist

## 用户提现列表

### req

```
{
	page_size: number,
	page: number,
	date_type: number,
	status: number,
}
```

### rsp

```
{
	total: number
	list: Array<ApplyCashListInfo> [{
		### create_date: string // 时间
		time_unix: number
		### account: string // 账号
		point: number // 金额
		status: number // 状态  -1 拒绝  3 成功  其余状态都是审核中
		reason: string // 描述
		type: number // 1 银行卡 2支付宝
	}]
}
```

==================================================================================================

# /api/appface/appactivity/getmyactivitylist

## 用户优惠活动列表

### req

```
{}
```

### rsp

```
{
	activity_list: [{
		atype: number // 活动类型, 值参考constCom.RegisterActivity是注册活动;
		satus: number // 0.不能领取 或者已经领取, 1可以领取
		status: number // 0.不显示, 1.显示
		button_status: number // 0.关闭, 1.显示
		sort: number // 排序
		### job1?: ActivityJob //
		### job2?: ActivityJob //
		ptype: number //
		active_text?: { [key: string]: string } //
		second_title?: { [key: string]: string } //
		color_btn: { [key: string]: string } // 按钮颜色
		color_left_down: { [key: string]: string } // 左下颜色
		color_right_up: { [key: string]: string } // 右下颜色
		content_title: { [key: string]: string } // 正文标题
		content_btn_title: { [key: string]: string } // 按钮文字
		lang_name?: { [key: string]: string }
		jump_type: number // 按钮功能
		jump_url?: string // 跳转内容
		loc_url?: string //
		loc_name?: string //
		stime?: number //
		etime?: number //
		pop_ups?: number // 弹窗状态; 0.不弹窗, 1.每次登录弹窗, 2.每天第一次登录弹窗
	}]
}
```

==================================================================================================

# /api/appface/appactivity/getactivitycfg

## 登陆后获取转盘数据

### req

```
{}
```

### rsp

```
{
	data: Array<ActivityCfg>
}
```

==================================================================================================

# /api/appface/appactivity/receiveactivityaward

## 点击转盘

### req

```
{}
```

### rsp

```
{
	### atype: number // 活动ID
	award: number // 活动奖励金额
	### award_type: number // 奖励类型
	###coin: number // 积分
	count: number // 剩余次数
	ptype: number // 活动子类型 （转盘用） 1 普通 2 高级 3 周
	num: number // 第几个
	end_time: number
}
```

==================================================================================================

# /api/appface/appactivity/getactivityawardrecord

## 转盘轮播记录

### req

```
{}
```

### rsp

```
{
	data: Array<GetActivityAwardRecordInfo> [{
		id: number
		uid: string
		pic: string
		ptype: number
		point_name: string
		point: number
	}]
}
```

==================================================================================================

# /api/appface/appactivity/getactivityzhuanpanuserecord

## 自己转盘记录

### req

```
{}
```

### rsp

```
{
	list: [{
		itime: number // 时间戳
		atype: number // 活动ID
		ptype: number // 转盘类型 金 银
		point: number // 金币
		name: string
	}]
}
```

==================================================================================================

# /api/gameface/loadgame/quitgame

## 用户退出游戏上报

### req

```
{}
```

### rsp

```
{}
```

==================================================================================================

# 分割线

==================================================================================================

# /api/appface/appuser/mygamelist

## 获取用户最近游戏

### req

```
{}
```

### rsp

```
{
	collect_gid: Array<number> // 收藏游戏
	recent_gid: Array<number> // 最近游戏
}
```

==================================================================================================

# /api/appface/appgive/getgiftcodereward

## 礼包码兑换

### req

```
{}
```

### rsp

```
{
###   "item_id": Number,
###  "code": "",
###   "reward_type": 0,
###   "reward_point": 0,
###   "deposit_discount_rate": null,
###   "deposit_discount_value": null,
###   "flow_multi": 0,
###   "close_time": 0,
###   "get_point": 0,
###   "ret": 0
}
```

==================================================================================================

# /api/appface/apppromoitem/getpromoitemlist

## 优惠道具列表

### req

```
{}
```

### rsp

```
{
	list:[
        {
        "item_id":Number //道具编号
        "cfg_id":Number //道具ID,
        "end_time":Number ,//道具结束时间
        "used_status": Number,//道具状态 定义; -1.全部, 0.未使用, 1.使用中, 2.已使用, 3.已过期
        "cfg": { //道具配置
                "app_id": 1012,
                "cfg_id": Number, //道具ID
                "item_type": Number, //道具类型 1.存款优惠道具,2:金币道具,3.转盘道具,4.vip积分加倍道具, 5.vip积分增加道具
            ### "status": Number,//状态; 0.禁用, 1.启用
            ### "repeat_use": Number,// 是否可重复使用; 0.否, 1.是
            ###  "direct_use": Number,// 是否可直接使用; 0.否, 1.是
                "item_lang": "{ //道具内容
                    1: {
                        item_name: string，//道具名称
                        task_desc: string，//道具内容
                    }"
                },
            ### "deposit_reward_cfg": {}, //存款优惠道具配置
            ### "point_add_cfg": {},// 金币道具配置
            ### "zhuan_pan_cfg": {},// 转盘道具配置
            ### "vip_point_multi_cfg": {},// VIP积分加倍道具配置
            ### "vip_point_add_cfg": {}// VIP积分道具配置
            },
            ### "left_time": number// 剩余时间
        }
    ]

}
```

==================================================================================================

# /api/appface/apppromoitem/usepromoItem

## 兑换使用道具

### req

```
{
    item_id: number // 道具编号
}
```

### rsp

```
{
###  "item_id":number // 道具编号
###  "used_status": number // 使用后的状态, 0.未使用, 1.使用中, 2.已使用
###  "end_time": number // 道具过期时间
###  "reward_point":  number // 金币奖励
###  "reward_vip_point": number // vip积分奖励
###  "reward_coin":  number // 转盘积分奖励
     "ret": 0
}
```

==================================================================================================

# /api/appface/appuser/getusershareurl

## 获取分享代理链接

### req

```
{}
```

### rsp

```
{
    "url": string //代理分享链接
### "type": number,//代理分享类型
    "ret": 0
}
```

==================================================================================================

# /api/appface/appactivity/getshareinvitesummary

## 获取代理数据汇总

### req

```
{}
```

### rsp

```
{
	register_count: number // 推广注册总人数
	give_point: number // 推广首充返奖总额
	deposit_count: number // 推广首充总人数
	total_commi: number // 历史流水返佣总额
	yesterday_register_count: number // 昨日推广注册人数
	yesterday_give_point: number // 昨日推广首充返奖金额
	yesterday_deposit_count: number // 昨日推广首充人数
	yesterday_commi: number // 昨日流水返佣金额
}
```

==================================================================================================

# /api/appface/appactivity/getshareagentinfo

## 获取代理数据

### req

```
{
   ctype:  number // 类型, GetShareAgentType; 1推荐福利, 2存款福利
}
```

### rsp

```
{
### "reg_num": number // 邀请注册
### "reg_succ": number // 注册成功
### "all_point": number // 总彩金
### "available": number // 可领取
    "share_down_config": {
        "stime": number //开始时间
        "etime": number //结束时间
        "down_give_point": number // 下级固定的赠送金额
        "pay_point": number // 玩家当天必须大于这个充值金额
        "list": {
            num: number // 人数
            reward: {} // 奖励配置
            total_point: number // 累计彩金
        }
    },
### "share_pay_config": {
    	"stime": number //开始时间
        "etime": number //结束时间
        "list": [
            {
                "pay_point": number // 首充金额
                "reward": {} // 奖励配置
                "code_rate":  number // 打码倍数
            },
        ]
  },
  "ret": 0
}
```

==================================================================================================

# /api/appface/appactivity/getunderuserdepositagentrecord

## 查询分享代理 Record 记录

### req

```
{
    page: 1
    page_size: 100
    time_type: number // 1 当天 2 最近7天 3 最近60天 0 所有
    user_id: number 查询的userID
}
```

### rsp

```
{   total: number //总数
	list: [{
        uid: string // 用户id字符串
    ### nick_name: string // 昵称
        register_time: number // 注册时间
    ### deposit_count: number // 充值人数
        deposit_point: number // 充值总金额
    ### deposit_give_point: number // 首充返佣总额
        flow: number // 流水
    ### commi_give_point: number // 流水返佣总额
        total_give_point: number // 返佣总金额
    }]
}
```

==================================================================================================

# /api/appface/appreward/myrewards

## 用户获取奖励列表

### req

```
{}
```

### rsp

```
{
    data:[
        {
            "id": string, // id 领取时用到
            "reward_type": number // 奖励类型 1:Vip奖励配置,2:动奖励配置,3:任务奖励配置,4:代理奖励配置,5:转盘奖励配置,6:反水奖励配置,7:礼包码奖励配置,8:其他奖励配置
            "title":  { [key: string]: string } // 标题
            "desc":{ [key: string]: string } // 描述
        ### "img":  string // 图片
        ###  "itime": number // 派发时间
            "end_itime": number // 截至领取时间 -1 永久
        ### "props": null,// 道具
        ### "point": number // 固定金额
        ### "vip_int": number // vip积分
        ### "task_int": number // 任务积分
        },
    ]
}
```

==================================================================================================

# /api/appface/appreward/receiverewards

## 申请奖励

### req

```
{
    body: {
            id: string // id
        },
}
```

### rsp

```
###    {
        "point": number // 固定金额
        "pay_pro":  number // 充值比例 n/万
        "flow_pro":number // 流水比例比例 n/万
        "vip_int": number // vip积分
        "task_int": number // 任务积分
        "props": [
            {
            "app_id": number
            "cfg_id": number // 配置编号
            "item_type":number // 道具类型,参考constCom.PromoItemType定义
            "status": number // 状态; 0.禁用, 1.启用
            "repeat_use":number // 是否可重复使用; 0.否, 1.是
            "direct_use": number // 是否可直接使用; 0.否, 1.是
            "item_lang": "{ //内容
                            1: {
                                promo_name: string，//名称
                                task_desc: string，//内容
                            }"
                        },
                "deposit_reward_cfg": {  //存款优惠道具配置
                    reward_type: number // 优惠类型, 0.固定值, 1.比例
                    dama_multi: number // 打码倍数
                    limit_hour: number // 时间限制,单位:小时; 0.不限制
                    "reward_list": [
                            {
                                join_point: number // 参加金额,*10000
                                value: number // 存款奖励金额/比例,*10000
                                limit_point: number // 最高限额,*10000
                            }
                    ]
            },
            "point_add_cfg": {// 金币道具配置
                    dama_multi: number // 打码倍数
                    point: number // 奖励金币金额,*10000
            },
            "zhuan_pan_cfg": {// 转盘道具配置
                    coin: number // 转盘积分
            },
            "vip_point_multi_cfg": {// VIP积分加倍道具配置
                        duration: number // 持续时间,单位:分钟
                        multi_num: number // vip积分获得倍数
            },
            "vip_point_add_cfg": {
                    vip_point: number // 奖励的vip积分,*100
            }
            },
        ],
        "ret": 0
    }
```

==================================================================================================

# /api/appface/appreward/myrewardhistory

## 获取奖励记录

### req

```
{
    page: 1,
    limit: 1000,
    day_type:number//  时间0 ALL 1 今天 2 最近7天 3 最近60天
    reward_type: Number 奖励类型 1:Vip奖励配置,2:动奖励配置,3:任务奖励配置,4:代理奖励配置,5:转盘奖励配置,6:反水奖励配置,7:礼包码奖励配置,8:其他奖励配置
}
```

### rsp

```
{
    data:[
        {
         "reward_type": number,// 奖励类型
         "title":  { [key: string]: string } // 标题
    ###  "desc": { [key: string]: string } // 描述
    ###  "img": string // 图片
    ###  "reward_name": [key: string]: string } // 奖励类型名称
         "point": number // 固定金额,
    ###  "pay_pro": number // 充值比例 n/万
    ###  "flow_pro": number // 流水比例比例 n/万
    ###  "vip_int": number // vip积分
    ###  "task_int": number // 任务积分
    ###  "props": // 道具里面的详细内容
         "itime": number // 领取时间
        },
    ]
}

```

==================================================================================================

# /api/appface/appuser/collectgame

## 设置收藏游戏

### req

```
{
   type: number // 1 收藏 2 取消收藏
   gid: number 游戏ID
}
```

### rsp

```
{
	collect_gid: Array<number> // 收藏游戏
	recent_gid: Array<number> // 最近游戏
}
```
