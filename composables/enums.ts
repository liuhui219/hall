export enum DepositKeyTypeEnum {
	pix = 'brapay', //PIX支付KEY
	spei = 'international', //SPEI支付key
	usdt = 'usdtPay',
}

export enum ActivityTypeEnum {
	roulette = 5, //转盘活动
	payTime = 21, //限时首充活动ID
	shareCommi = 24, //代理活动
	vipRebate = 27, //vip返利
	checkIn = 28, //签到
	vipWeekly = 29, //vip周福利
	vipDay = 39, //vip日福利
	vipMonth = 40, //vip月福利
	vipReturn = 41, //vip回归
	vipLossRebate = 42, //vip亏损返利
	inviteChest = 30, //邀请宝箱
	vipUpgrade = 31, //vip升级

	proxyAward = 33, //代理奖励
	disCommission3 = 35, //三级分销佣金活动
	disRecharge3 = 36, //三级分销充值活动
	inviteUsers = 37, //邀请新用户奖励活动
	inviteUsersVip = 38, //邀请新用户vip升级奖励活动
}

export enum VipActivityEnum {
	vipRoulette = ActivityTypeEnum.roulette, //转盘未登录及faq使用
	vipRoulette1 = 5001, //转盘1已登录
	vipRoulette2 = 5002, //转盘2已登录
	vipRoulette3 = 5003, //转盘3已登录
	vipRebate = ActivityTypeEnum.vipRebate,
	vipWeekly = ActivityTypeEnum.vipWeekly,
	vipUpgrade = ActivityTypeEnum.vipUpgrade,
	vipReturn = ActivityTypeEnum.vipReturn,
	vipDay = ActivityTypeEnum.vipDay,
	vipMonth = ActivityTypeEnum.vipMonth,
	vipHost = 6001,
	vipExclusive = 6002,
	vipLuxury = 6003,
}

export enum PutTypeEnum {
	usdt = 5,
	pixCpf = 7,
	pixCnpj = 8,
	pixEmail = 9,
	pixPhone = 10,
	speiCalbe = 3,
}

export enum PutGroupEnum {
	spei = 3,
	usdt = 5,
	pix = 7,
}
export enum RewardEnum {
	deposit = 1,
	point = 2,
	roulette = 3,
	vipMul = 4,
	vipAdd = 5,
}
export enum LoginWayEnum {
	email = 0,
	phone = 1,
	account = 2,
}

export enum CarouselLoginTypeEnum {
	notLogin = 0, //不需要登录
	needLogin = 1, //需要登录
}
export enum CarouselDeviceTypeEnum {
	all = 0, //全部
	mobile = 1, //移动设备
	desktop = 2, //pc
}

export enum PageIndexEnum {
	vip = 100,
	home = 101, //首页
	casino = 101, //娱乐城
	rewards = 104,
	brandAmbassador = 1001, //
	bonusCenter = 1000, //奖金中心
	game = 1002, //游戏页面
	mygame = 1003,
	promotion = 1004,
	provider = 1005,
	providers = 1006,
	referAndEarn = 1007,
	sport = 1008,
	task = 1009,
	classGame = 1010, //游戏类型展示游戏列表页面
}

export enum TipsTypeEnum {
	success = 'success',
	error = 'error',
	warning = 'warning',
}

//新增游戏标签
export enum GameTagEnum {
	highPayOut = 1,
	highMultiple = 2,
	easyWin = 3,
	fortune = 4,
	rocket = 5,
	sport = 6,
	dice = 7,
	poker = 8,
	roulette = 9,
	wheel = 10,
	table = 11,
	fruit = 12,
	stickyWids = 13,
	magic = 14,
	horror = 15,
	egyptian = 16,
	animats = 17,
	dragon = 18,
	candy = 19,
}
//账变大类
export enum TransactionTypeEnum {
	all = -1,
	gift = 0,
	commission = 1,
	depoistOrWithdraw = 2,
	game = 3,
}

//Infinite状态
export enum InfiniteTypeEnum {
	loading = 0,
	init = 1,
	compelete = true,
	loaded = false,
	error = null,
}

//转盘key
export enum RouletteKeyEnum {
	lucky = 'lucky',
	super = 'super',
	mega = 'mega',
}

export enum ImageKeyEnum {
	roulette = 'roulette',
	home = 'home',
	menu = 'menu',
	login = 'login',
	task = 'task',
	bonusCenter = 'bonusCenter',
	inviteChest = 'inviteChest',
	affiliate = 'affiliate',
	userinfo = 'userinfo',
	deposit = 'deposit',
	checkin = 'checkin',
	rewards = 'rewards',
	vip = 'vip',
	referAndEarn = 'referAndEarn',
}

export enum TimeKeyEnum {}

export enum PopupEnum {
	login = 'login',
	register = 'register',
	registerCode = 'registerCode',
	reset = 'reset',
	gamedetail = 'gamedetail',
	deposit = 'deposit',
	account = 'account',
	roulette = 'roulette',
	inviteChest = 'inviteChest',
	checkin = 'checkin',
	withdraw = 'withdraw',
	spinRule = 'spinRule',
	walletRules = 'walletRules',
	myProfile = 'myProfile',
	myProfileEdit = 'myProfileEdit',
	message = 'message',
	bonus = 'bonus',
	betHistory = 'betHistory',
	transaction = 'transaction',
	agentHistory = 'agentHistory',
	rewardHistory = 'rewardHistory',
	promotioncontent = 'promotioncontent',
	referEarn = 'referEarn',
	lossRebate = 'lossRebate',
	referralRewards = 'referralRewards',
	referralVipRewards = 'referralVipRewards',
	commissionRewards = 'commissionRewards',
	distributionRewards = 'distributionRewards',
	friendsList = 'friendsList',
	other = 'other',
}
