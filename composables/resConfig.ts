import HallLog from '~~/apis/debug/HallLog'
import { mapFace } from '~~/apis/types'

//预加载 图片资源 【转盘】
export const preResConfig: mapFace = [
	'home/game_back.png',
	'home/cursor.svg',
	'home/game_placeholder.png',
	'home/empty.png',
	'home/loading_s.png',
	'inviteChest/bg_01.jpg',
]
//预加载 非图片资源
export const preSourceResConfig: mapFace = []

//包网资源配置
export const resConfig: mapFace = {
	//本地域名下的固定资源目录【不走nodejs】
	'loc-fold': '/res',
	//当前包网资源地址 = 【root-address】 + 【root-fold】 + "/"
	'root-url': '',
	//root-url的源地址【无cdn压缩】
	'root-url-source': '',
	//cdn压缩路径
	'root-format': 'cdn-cgi/image/format=auto/',
	//全部包网资源根地址
	'root-address': 'https://web-res-ccc.afunimg8.com/cdn-cgi/image/format=auto/',
	// 'root-address': 'https://web-res-ccc.afunimg8.com/',
	//全部包网通用资源地址【厂商图标之类】
	'root-res': 'https://web-res-ccc.afunimg8.com/cdn-cgi/image/format=auto/newres/',
	// 'root-res': 'https://web-res-ccc.afunimg8.com/newres/',

	//游戏icon目录
	// 'game-icon-folder': 'newicon',
	'game-icon-folder': 'newres/gameicon',
	//游戏icon地址集合
	'game-icon': [
		'https://web-res-aaa.afunimg5.com/cdn-cgi/image/format=auto/',
		'https://web-res-bbb.afunimg7.com/cdn-cgi/image/format=auto/',
		'https://web-res-ccc.afunimg8.com/cdn-cgi/image/format=auto/',
		'https://web-res-ddd.afunimg6.com/cdn-cgi/image/format=auto/',
		// 'https://web-res-aaa.afunimg5.com/',
		// 'https://web-res-bbb.afunimg7.com/',
		// 'https://web-res-ccc.afunimg8.com/',
		// 'https://web-res-ddd.afunimg6.com/',
	],

	//包网自定义
	'plat-logo': 'A_Original',
	'reg-privacy': {
		click_id: '6',
		click_params: 'pdf/Politica.e.privacidade.pdf',
	},
	'og-image': 'ogimage.jpg',
	'app-title': 'Apostas Esportivas | Plataforma de Cassino online',
	'app-desc': 'Use o melhor aplicativo de apostas para ganhar até 225% em bônus de depósito até R$4.500 de boas-vindas.',
	//注册配置
	'reg-cfg': {
		account: { state: false, sort: '1' },
		email: { state: true, sort: '2' },
		phone: { state: true, sort: '3' },
	},
	//注册全部配置，会自动覆盖注册配置
	'reg-cfg-arr': {
		'1': {
			account: { state: true, sort: '1' },
			email: { state: true, sort: '2' },
			phone: { state: true, sort: '3' },
		},
		'2': {
			account: { state: true, sort: '2' },
			email: { state: true, sort: '1' },
			phone: { state: true, sort: '3' },
		},
		'3': {
			account: { state: true, sort: '3' },
			email: { state: true, sort: '1' },
			phone: { state: true, sort: '2' },
		},
	},
	//弹窗配置
	// 'notice-config': {
	// 	status: true,
	// 	content: [
	// 		{
	// 			title: { 1: 'notice 1', 11: 'notice 1' },
	// 			img: 'https://web-res-ccc.afunimg8.com/afun/banner/checkin_202304291120.jpg',
	// 			click_id: '2',
	// 			click_params: 'casino?tab=Shows',
	// 		},
	// 	],
	// 	pop_config: 1, //status为真时 0或者无配置：每天只弹一次 1：每次登录都弹
	// },
	'withdraw-unnecessary-pay': false,
	//跑马灯配置
	marqueeConfig: {
		status: false,
		rate: 10,
	},
	//充值界面文案
	// depositText: {
	// 	1: '',
	// 	11: `fazer o check in diario para receber o bônus de primeira recarga\nCASHBACK DE\n30% A0 ≧50\nCASHBACK DE\n50% A0 ≧100\n\nDe acordo com os detalhes da recompensa, preencha os requisitos de apostas para sacar a recompensa.`,
	// },
	depositPixConfig: {
		needCPF: true,
	},
	withdrawPixConfig: {
		emailPhoneNeedName: true,
	},

	//模块配置
	modelConfig: modelConfig,
	//maxconv三方统计全局脚本
	maxconv: {
		status: false,
		script: '//wvcfdh.mcattr.com/js/t.js',
		api_domain: 'https://wvcfdh.maxconvtrk.com/conv',
		secret: '',
	},
	//小游戏api统计
	gankapi: {
		status: false,
		api_domain: 'https://testapi.gank.tech/third-api/afun-api/registerCallback',
	},
	//奖金中心配置
	bonusCenterConfig: {
		hide_history_bonus: false, //是否隐藏用户历史获得彩金
	},
	vipConfig: {
		1: { color: '#5C7CCF' },
		2: { color: '#5C7CCF' },
		3: { color: '#5C7CCF' },
		4: { color: '#5C7CCF' },
		5: { color: '#41B0FC' },
		6: { color: '#41B0FC' },
		7: { color: '#41B0FC' },
		8: { color: '#41B0FC' },
		9: { color: '#5BFC41' },
		10: { color: '#5BFC41' },
		11: { color: '#5BFC41' },
		12: { color: '#5BFC41' },
		13: { color: '#4541FC' },
		14: { color: '#FEBF03' },
		15: { color: '#FF6231' },
		setup_1: { color: '#5F9AFF' },
		setup_2: { color: '#FF5C00' },
		setup_3: { color: '#FE4431' },
		//vip 10 13 15等级权限开关
		activity: {
			//key 6001
			[VipActivityEnum.vipHost]: true,
			//key 6002
			[VipActivityEnum.vipExclusive]: true,
			//key 6003
			[VipActivityEnum.vipLuxury]: true,
		},
		//流水返利
		lossRebate: {
			event_start_day: 1, //活动持续时间周一1  周天7
			event_start_hour: 0, //活动持续开始时间小时
			event_start_minute: 0, //活动持续开始时间分
			event_end_day: 7, //活动持续结束时间日期 周一1  周天7
			event_end_hour: 23, //活动持续结束时间小时
			event_end_minute: 59, //活动持续结束时间分
			receive_start_day: 1, //活动领取时间周一1  周天7 活动持续下一周开始计算
			receive_start_hour: 6, //活动领取开始时间小时
			receive_start_minute: 0, //活动领取开始时间分
			receive_end_day: 4, //活动领取结束时间日期 周一1  周天7
			receive_end_hour: 23, //活动领取结束时间小时
			receive_end_minute: 59, //活动领取结束时间分
		},
	},
	// 代理模块配置
	referAndEarnConfig: {
		telegram: '',
		gmail: '',
		// 代理奖励百分比 是否*100 【个别盘口*1 赋false】
		multiplyPercent: true,
	},
	lengthConfig: {
		emailCodeLength: 6,
		phoneCodeLength: 6,
	},
	//1组//////////////////////
	'telegram-group': '',
	// afun:
	30101: {
		// 'root-fold': 'afun', //如果不配置，默认为包网名
		'og-url': 'https://www.afun.com/',
		// 'live-chat-id': '14042772',

		// 'google-tag-m': '', //运营：GTM-KPDN39N PM59：GTM-P7TXHSD
		// 'google-tag-c': '', //运营：G-V2H7J7ZGDL PM59: G-PHF3NXTXJG
		// 'af-s2s-open': false,
		// 'down-tip-close': true,
		// 'tournament-game-list': [], //游戏化排行榜支持的游戏id集合，【-1】为全部游戏

		//google认证
		'google-site-verification': 'q4qOYkTjvwx7NC8NlLGQrdWteyBpuyvsP1JEWJhymKg',
		//facebook认证
		'facebook-domain-verification': '7u8327stcg0zsbtrz5y4921h6xxntk',

		'app-title': 'afun Apostas Esportivas | Plataforma de Cassino online',
		'app-desc': 'afun.com Use o melhor aplicativo de apostas para ganhar até 225% em bônus de depósito até R$4.500 de boas-vindas.',
		keywords: 'afun,plataforma afun,afun cassino,afun.com',
	},
	// mega:
	30102: {
		'og-url': 'https://www.megabossbr.com/',
		// 'live-chat-id': '14942280',

		//facebook认证
		'facebook-domain-verification': 'p6t9moo5w7ta5s0w1vfeknkvntlk7a',

		// 'footer-icon-1': 'logo/footer-icon-1.png',
	},
	// cbet:
	103: {
		'og-url': 'https://www.cbet777.com/',
		// 'live-chat-id': '15718791',
	},
	// dgjogo:
	104: {
		'og-url': 'https://www.dgjogo.com/',
		// 'live-chat-id': '',

		'app-title': 'DGJOGO | Online Casino,Jogos de Criptografia Hash,DgJogo Cassino Justo Rastreável',
		'app-desc':
			'Junte-se ao DGJOGO - o melhor cassino de criptografia justo - o sistema de jogo justo de criptografia mais avançado do mundo; com mais de 3.000 caça-níqueis, peneiras, roleta e muitos outros jogos; desfrute de retiradas imediatas e atendimento ao cliente 24x7 horas.',
		keywords: 'dgjogo,dgjogo casino,dgjogo online casino',
	},
	//3组//////////////////////
	// gmc:
	30301: {
		'og-url': 'https://www.gmc02.com/',
		// 'live-chat-id': 'https://xxxxx',

		'app-desc': 'Use o melhor aplicativo de apostas para ganhar até 40% em bônus de depósito até R$1000 de boas-vindas.',
	},
	// a5:
	30302: {
		'og-url': 'https://www.a5.game/',
		// 'live-chat-id': '15465483',

		// 'footer-icon-1': 'logo/footer-icon-1.svg',
		// 'footer-icon-2': 'logo/footer-icon-2.svg',

		'app-title': 'A5.GAME',
	},
	// okd77:
	30303: {
		'og-url': 'https://www.okd77.com/',
		// 'live-chat-id': '15584187',
	},
	// bcjogo:
	304: {
		'og-url': 'https://www.bcjogo.com/',
		// 'live-chat-id': '15645261',
	},
	// rico333:
	305: {
		'og-url': 'https://www.rico33.com/',
		// 'live-chat-id': '15823161',
	},
	// coin:
	306: {
		'og-url': 'https://www.coin777.cc/',
		// 'live-chat-id': '15953763',
	},
	// cps777:
	307: {
		'og-url': 'https://www.cps777.com/',
		// 'live-chat-id': '15982692',
	},
	//测试/////////////////////
	1012: {
		'og-url': 'https://afun-dev-a01.ncjimmy.com/',
		'app-title': 'afun Apostas Esportivas | Plataforma de Cassino online',
		'app-desc': 'afun.com Use o melhor aplicativo de apostas para ganhar até 225% em bônus de depósito até R$4.500 de boas-vindas.',
		keywords: 'afun,plataforma afun,afun cassino,afun.com',
	},
	1099: {
		'og-url': 'https://www.zbet.net/',
		'app-title': 'Coming',
		'app-desc': 'Coming',
	},
	//6组//////////////////////
	// bbet:
	601: {
		'og-url': 'https://www.bbet.games/',
		// 'live-chat-id': '15908217',

		'app-title': 'BBET',
		'app-desc': 'BBET',
	},
	///////////////////////////分割线/////////////////////////////
	logo: {
		'logo-icon': 'logo/logo-icon.png?20230922',
		'logo-h': 'logo/logo-h.png?20230922',
	},
	'temp-0': {
		temp_mobile: 'temp-0/temp_mobile.jpg?20231013',
		temp_pc: 'temp-0/temp_pc.jpg?20231013',
	},
	'temp-1': {
		temp_mobile: 'temp-1/temp_mobile.jpg?20230923',
		temp_pc: 'temp-1/temp_pc.jpg?20230923',
	},
	country: [
		{
			key: 'BR',
			name: 'Brasil',
			code: '+55',
			state_list: [
				'Acre',
				'Alagoas',
				'Amapa',
				'Amazonas',
				'Bahia',
				'Ceara',
				'Distrito Federal',
				'Espirito Santo',
				'Estado de Sao Paulo',
				'Goias',
				'Maranhao',
				'Mato Grosso',
				'Mato Grosso do Sul',
				'Minas Gerais',
				'Para',
				'Paraiba',
				'Parana',
				'Pernambuco',
				'Piaui',
				'Rio Grande do Norte',
				'Rio Grande do Sul',
				'Rio de Janeiro',
				'Rondonia',
				'Roraima',
				'Santa Catarina',
				'Sao Paulo',
				'Sergipe',
				'Tocantins',
			],
		},
	],
	[ImageKeyEnum.home]: {
		'home-jackpot-bg': 'home/home-jackpot-bg.jpg',
		jackpot: 'home/jackpot-bg.png',
		'join-bg': 'home/join-bg.jpg',
		active_01: 'home/active_01.png?t=20230524',
		active_02: 'home/active_02.png?t=20230524',
		active_03: 'home/active_03.png?t=20230524',
		active_04: 'home/active_04.png',
		active_04_bg1: 'home/active_04/bg1.png?t=1683025384435',
		active_04_bg2: 'home/active_04/bg2.png?t=1683025384435',
		active_04_point: 'home/active_04/point.png?t=1683025384435',
		active_05: 'home/active_05.png',
		active_06: 'home/active_06.png',
		active_07: 'home/active_07.png?t=20230524',
		active_08: 'home/active_08.png',
		'recent-point': 'home/recent-point.png',
		'footer-icon-2': 'home/footer-icon-2.png?t=20230729',
		download: { 1: 'home/add-to-home_1.png', 11: 'home/add-to-home_11.png', 12: 'home/add-to-home_12.png' },
		symbol: 'home/symbol.png',
		wallet: 'home/wallet.png?2023071301',
		laba: 'home/laba.png',
		game_back: 'home/game_back.png',
		game_placeholder: 'home/game_placeholder.png?t=20230809',
		loading: 'home/loading.png?t=20230822',
		cursor: 'home/cursor.svg',
		carousel_text_m: 'home/carsoule-text-m.png?t=20230918',
		carousel_text_p: 'home/carsoule-text-p.png?t=20230919',
		empty: 'home/empty.png',
		wallet_card_01: 'home/wallet_card_01.png?t=20230928',
		wallet_card_02: 'home/wallet_card_02.png?t=20230928',
		wallet_card_03: 'home/wallet_card_03.png?t=20231005',
		telegram: 'home/telegram.png?t=20230908',
		loading_s: 'home/loading_s.png',
		help: 'home/help.png',
		marquee: 'home/marquee.svg?t=20230908',
		record_empty: 'home/record_empty.png',
	},
	[ImageKeyEnum.rewards]: {
		loading: 'rewards/loading.png',
		'reward-bg': 'rewards/reward-bg.png?skin=20230817',
		reward01: 'rewards/reward01.png',
		reward02: 'rewards/reward02.png',
		reward03: 'rewards/reward03.png',
		reward04: 'rewards/reward04.png',
		reward05: 'rewards/reward05.png',
		titleProp: 'rewards/title-black.png?skin=20230817',
		titleReward: 'rewards/title-brown.png?skin=20230817',
		rcade1: 'rewards/rcade1.png',
		rcade2: 'rewards/rcade2.png',
		rcade3: 'rewards/rcade3.png',
		rcade4: 'rewards/rcade4.png',
		rcade5: 'rewards/rcade5.png',
		rcade6: 'rewards/rcade6.png',
		rcade7: 'rewards/rcade7.png',
		rcade8: 'rewards/rcade8.png', //扩展
		rcade9: 'rewards/rcade9.png', //扩展
		rcade10: 'rewards/rcade10.png', //扩展
		rcade99: 'rewards/rcade99.png', //类型为其他奖励
		rprop1: 'rewards/rprop1.png',
		rprop2: 'rewards/rprop2.png',
		rprop3: 'rewards/rprop3.png',
		rprop4: 'rewards/rprop4.png',
		rprop5: 'rewards/rprop5.png',
	},
	[ImageKeyEnum.deposit]: {
		hot: 'deposit/hot.png?t=20230905',
		pix: 'deposit/pix.svg?t=20230816',
		usdt: 'deposit/usdt.svg?t=20230816',
		spei: 'deposit/spei.svg?t=20230816',
		usdt2: 'deposit/usdt2.svg?t=20230816',
	},
	[ImageKeyEnum.task]: {
		'coin-r': 'task/coin-r.svg?skin=20230817',
		'coin-star': 'task/coin-star.svg?skin=20230817',
		'task-banner': 'task/task-banner.jpg?skin=20230817',
		'task-banner-pc': 'task/task-banner-pc.jpg?skin=20230817',
		'award-achieve': 'task/task-award_achieve.png',
		'award-active': 'task/task-award_active.png',
	},
	[ImageKeyEnum.roulette]: {
		disabled_bg: 'roulette/1348/disabled_bg.png',
		start: 'roulette/1348/start.png?t20231013',
		stop: 'roulette/1348/stop.png',
		coin: 'roulette/1348/coin.png',
		physical: 'roulette/1348/physical.png',
		back: 'roulette/1348/back.png',
		back_out: 'roulette/1348/back_out.png',
		base: 'roulette/1348/base.png',
		base_tray: 'roulette/1348/base_tray.png',
		line_1: 'roulette/1348/line_1.png',
		line_2: 'roulette/1348/line_2.png',
		line_3: 'roulette/1348/line_3.png',
		weekly_light: 'roulette/1348/weekly_light.png',
		play: 'roulette/1348/audio/play.mp3?t20231011',
		win: 'roulette/1348/audio/win.mp3?t20231011',
		click: 'roulette/1348/audio/click.mp3?t20231011',
		shelf: 'roulette/1348/shelf.png',
		shelf_pc: 'roulette/1348/shelf_pc.png',
		shelf_btn: 'roulette/1348/shelf_btn.png?t=20230920',
		rt0: 'roulette/1348/rt0.png',
		rt1: 'roulette/1348/rt1.png',
		rt2: 'roulette/1348/rt2.png',
		rt3: 'roulette/1348/rt3.png',

		silver_icon: 'roulette/1348/silver_icon.png',
		silver_icon_disabled: 'roulette/1348/silver_icon_disabled.png',
		silver_bg: 'roulette/1348/silver_bg.png',
		silver_chassis: 'roulette/1348/silver_chassis.png?t20230930',
		silver_frame: 'roulette/1348/silver_frame.png',
		silver_reward: 'roulette/1348/silver_reward.png',

		gold_icon: 'roulette/1348/gold_icon.png',
		gold_icon_disabled: 'roulette/1348/gold_icon_disabled.png',
		gold_bg: 'roulette/1348/gold_bg.png',
		gold_chassis: 'roulette/1348/gold_chassis.png?t20230930',
		gold_frame: 'roulette/1348/gold_frame.png',
		gold_reward: 'roulette/1348/gold_reward.png',

		diamond_icon: 'roulette/1348/diamond_icon.png',
		diamond_icon_disabled: 'roulette/1348/diamond_icon_disabled.png',
		diamond_bg: 'roulette/1348/diamond_bg.png',
		diamond_chassis: 'roulette/1348/diamond_chassis.png?t20230930',
		diamond_frame: 'roulette/1348/diamond_frame.png',
		diamond_reward: 'roulette/1348/diamond_reward.png',

		point_json: 'roulette/1348/point/index.json?t=1',
		qf_json: 'roulette/1348/qf/index.json?t=1',
		point_path: 'roulette/1348/point/images/',
		qf_path: 'roulette/1348/qf/images/',
	},
	[ImageKeyEnum.checkin]: {
		rule: 'checkin/rule.png?skin=20230817',
		mask: 'checkin/mask.png',
		mask1: 'checkin/mask1.png',
		receive: { 1: 'checkin/receive_1.png', 11: 'checkin/receive_11.png', 12: 'checkin/receive_12.png' },
		'receive-bg': 'checkin/receive-bg.png',
		coin: 'checkin/coin.png?t20230930',
		more: 'checkin/more.png',
		'star-1': 'checkin/star-1.png',
		'star-2': 'checkin/star-2.png',
		'star-3': 'checkin/star-3.png',
		'star-4': 'checkin/star-4.png',
		'star-5': 'checkin/star-5.png',
	},
	[ImageKeyEnum.inviteChest]: {
		bj_01: 'inviteChest/bg_01.jpg',
		bj_02: 'inviteChest/bj_02.jpg',
		bj_03: 'inviteChest/bj_03.jpg',
		bj_04: 'inviteChest/bj_04.jpg',
		dbar: 'inviteChest/dbar.png',
		back_1: 'inviteChest/back_1.png',
		back_2: 'inviteChest/back_2.png',
		btn: 'inviteChest/btn.png',
		btn_0: 'inviteChest/btn_0.png',
		btn_1: 'inviteChest/btn_1.png',
		btn_2: 'inviteChest/btn_2.png',
		chest_1: 'inviteChest/chest_1.png',
		chest_2: 'inviteChest/chest_2.png',
		chest_3: 'inviteChest/chest_3.png',

		font_header: {
			1: 'inviteChest/font_header_1.png?20230718',
			11: 'inviteChest/font_header_11.png',
			12: 'inviteChest/font_header_12.png?2023071807',
		},
		font_rules: { 1: 'inviteChest/font_rules_1.png?20230718', 11: 'inviteChest/font_rules_11.png', 12: 'inviteChest/font_rules_12.png?20230718' },
		font_copy: { 1: 'inviteChest/font_copy_1.png', 11: 'inviteChest/font_copy_11.png', 12: 'inviteChest/font_copy_12.png' },
		font_convite: { 1: 'inviteChest/font_convite_1.png', 11: 'inviteChest/font_convite_11.png', 12: 'inviteChest/font_convite_12.png' },
		font_gift: { 1: 'inviteChest/font_gift_1.png?20230718', 11: 'inviteChest/font_gift_11.png', 12: 'inviteChest/font_gift_12.png?20230718' },
	},
	[ImageKeyEnum.userinfo]: {
		// h_1: 'userinfo/header/h_1.png?t=20230801',
		wallet: 'userinfo/wallet.png?skin=20230817',
		change: 'userinfo/change.png?skin=20230817',
		arrow_down: 'userinfo/arrow_down.png?20230724',
		hammer: 'userinfo/hammer.png',
		delete: 'userinfo/delete.png',
		claim: 'userinfo/claim.png',
		h_0: 'userinfo/header/h_0.jpg?t=20231004',
		h_1: 'userinfo/header/h_1.jpg?t=20231005',
		h_2: 'userinfo/header/h_2.jpg?t=20231004',
		h_3: 'userinfo/header/h_3.jpg?t=20231004',
		h_4: 'userinfo/header/h_4.jpg?t=20231004',
		h_5: 'userinfo/header/h_5.jpg?t=20231004',
		h_6: 'userinfo/header/h_6.jpg?t=20231004',
		h_7: 'userinfo/header/h_7.jpg?t=20231004',
		h_8: 'userinfo/header/h_8.jpg?t=20231004',
		h_9: 'userinfo/header/h_9.jpg?t=20231004',
		h_10: 'userinfo/header/h_10.jpg?t=20231004',
		h_11: 'userinfo/header/h_11.jpg?t=20231004',
		h_12: 'userinfo/header/h_12.jpg?t=20231004',
		h_13: 'userinfo/header/h_13.jpg?t=20231004',
		h_14: 'userinfo/header/h_14.jpg?t=20231004',
		vip_1: 'userinfo/header/vip_1.png?t=20231003',
		vip_2: 'userinfo/header/vip_2.png?t=20231003',
		vip_3: 'userinfo/header/vip_3.png?t=20231003',
		vip_4: 'userinfo/header/vip_4.png?t=20231003',
		vip_5: 'userinfo/header/vip_5.png?t=20231003',
		vip_6: 'userinfo/header/vip_6.png?t=20231003',
		vip_7: 'userinfo/header/vip_7.png?t=20231003',
		vip_8: 'userinfo/header/vip_8.png?t=20231003',
		vip_9: 'userinfo/header/vip_9.png?t=20231003',
		vip_10: 'userinfo/header/vip_10.png?t=20231003',
		vip_11: 'userinfo/header/vip_11.png?t=20231003',
		vip_12: 'userinfo/header/vip_12.png?t=20231003',
		vip_13: 'userinfo/header/vip_13.png?t=20231003',
		vip_14: 'userinfo/header/vip_14.png?t=20231003',
		vip_15: 'userinfo/header/vip_15.png?t=20231003',
		profile_vip: 'userinfo/header/profile_vip.png?t=20230925',
		profile_vip2: 'userinfo/header/profile_vip2.png?t=20230925',
	},
	[ImageKeyEnum.login]: {
		banner: 'login/banner.jpg?t=20230811',
		banner_pc: 'login/banner_pc.jpg?t=20230811',
	},
	[ImageKeyEnum.menu]: {
		bonus: 'menu/bonus.png?t=20230928',
		bonus_hide: 'menu/bonus_hide.png?t=20230928',
		affiliate: 'menu/affiliate.png?t=20230928',
		affiliate_hide: 'menu/affiliate_hide.png?t=20230928',
		vip: 'menu/vip.png?t=20230928',
		vip_hide: 'menu/vip_hide.png?t=20230928',
	},
	[ImageKeyEnum.bonusCenter]: {
		affiliate: 'bonusCenter/affiliate.png',
		inviteChest: 'bonusCenter/inviteChest.png',
		banner: 'bonusCenter/banner.jpg',
		banner_pc: 'bonusCenter/banner_pc.jpg?t=20230919',
		bonus: 'bonusCenter/bonus.png',
		checkin: 'bonusCenter/checkin.png',
		deposit: 'bonusCenter/deposit.png',
		props: 'bonusCenter/props.png',
		roulette: 'bonusCenter/roulette.png',
		task: 'bonusCenter/task.png',
		loss_rebate: 'bonusCenter/loss_rebate.png?t20231014',
		vip_rebate: 'bonusCenter/vip_rebate.png',
		vip_upgrade: 'bonusCenter/vip_upgrade.png',
		vip_weekly: 'bonusCenter/vip_weekly.png',
	},
	[ImageKeyEnum.vip]: {
		banner: 'vip/banner.png',
		banner_pc: 'vip/banner_pc.png',
		vip_tip_pc: 'vip/vip_tip_pc.jpg',
		loss_rebate_reward: 'vip/loss_rebate_reward.png?t20231014',
		next: 'vip/next.png',
		bg: 'vip/bg.jpg?t=2',
		bg_pc: 'vip/bg_pc.png',
		setup_1: 'vip/setup_1.png',
		setup_2: 'vip/setup_2.png',
		setup_3: 'vip/setup_3.png',
		setup_1_pc: 'vip/setup_1_pc.png?20230913',
		setup_2_pc: 'vip/setup_2_pc.png?20230913',
		setup_3_pc: 'vip/setup_3_pc.png?20230913',
		setup_1_pc_bg: 'vip/setup_1_pc_bg.png',
		setup_2_pc_bg: 'vip/setup_2_pc_bg.png',
		setup_3_pc_bg: 'vip/setup_3_pc_bg.png',
		bonus: 'vip/r_bonus.png?t20230929',
		rebate: 'vip/r_rebate.png?t20230929',
		daily: 'vip/r_daily.png?t20230929',
		exclusive: 'vip/r_exclusive.png?t20230929',
		host: 'vip/r_host.png?t20230929',
		luxury: 'vip/r_luxury.png?t20230929',
		monthly: 'vip/r_monthly.png?t20230929',
		roulette_1: 'vip/r_roulette_1.png?t20230929',
		roulette_2: 'vip/r_roulette_2.png?t20230929',
		roulette_3: 'vip/r_roulette_3.png?t20230929',
		weekly: 'vip/r_weekly.png',
		vip1: 'vip/vip1.png?t20230923',
		vip2: 'vip/vip2.png?t20230923',
		vip3: 'vip/vip3.png?t20230923',
		vip4: 'vip/vip4.png?t20230923',
		vip5: 'vip/vip5.png?t20230923',
		vip6: 'vip/vip6.png?t20230923',
		vip7: 'vip/vip7.png?t20230923',
		vip8: 'vip/vip8.png?t20230923',
		vip9: 'vip/vip9.png?t20230923',
		vip10: 'vip/vip10.png?t20230923',
		vip11: 'vip/vip11.png?t20230923',
		vip12: 'vip/vip12.png?t20230923',
		vip13: 'vip/vip13.png?t20230923',
		vip14: 'vip/vip14.png?t20230923',
		vip15: 'vip/vip15.png?t20230923',

		vip1_l: 'vip/vip1_l.png?t=216',
		vip2_l: 'vip/vip2_l.png?t=216',
		vip3_l: 'vip/vip3_l.png?t=216',
		vip4_l: 'vip/vip4_l.png?t=216',
		vip5_l: 'vip/vip5_l.png?t=216',
		vip6_l: 'vip/vip6_l.png?t=216',
		vip7_l: 'vip/vip7_l.png?t=216',
		vip8_l: 'vip/vip8_l.png?t=216',
		vip9_l: 'vip/vip9_l.png?t=216',
		vip10_l: 'vip/vip10_l.png?t=216',
		vip11_l: 'vip/vip11_l.png?t=216',
		vip12_l: 'vip/vip12_l.png?t=216',
		vip13_l: 'vip/vip13_l.png?t=216',
		vip14_l: 'vip/vip14_l.png?t=216',
		vip15_l: 'vip/vip15_l.png?t=216',

		loss_rebate_banner: 'vip/loss_rebate_banner.jpg?t20231014',
		loss_rebate_banner_pc: 'vip/loss_rebate_banner_pc.jpg?t20231014',
	},
	[ImageKeyEnum.referAndEarn]: {
		dl_pc_banner: 'referAndEarn/dl_pc_banner.jpg?t=20230919',
		dl_h5_banner: 'referAndEarn/dl_h5_banner.png?t=20231002',
		dl_h5_banner2: 'referAndEarn/dl_h5_banner2.jpg?t=20230919',
		dl_pc_normal_banner: 'referAndEarn/dl_pc_normal_banner.png?t=20230925',
		dl_Telegram: 'referAndEarn/dl_Telegram.png?t=20230916',
		dl_google: 'referAndEarn/dl_google.png?t=20230916',
		dl_pc_invite_bg: 'referAndEarn/dl_pc_invite_bg.png?t=20230918',
		dl_pc_learnmore: 'referAndEarn/dl_pc_learnmore.jpg?t=20231004',
		dl_pc_trumpet: 'referAndEarn/dl_pc_trumpet.png?t=20231004',
		dl_pc_card_0: 'referAndEarn/dl_pc_card_0.png?t=20231005',
		dl_pc_card_1: 'referAndEarn/dl_pc_card_1.png?t=20231005',
		dl_pc_card_2: 'referAndEarn/dl_pc_card_2.png?t=20231005',
		dl_pc_card_3: 'referAndEarn/dl_pc_card_3.png?t=20231005',
		dl_pc_card_4: 'referAndEarn/dl_pc_card_4.png?t=20231005',
		dl_h5_card_0: 'referAndEarn/dl_h5_card_0.png?t=20231004',
		dl_h5_card_1: 'referAndEarn/dl_h5_card_1.png?t=20230919',
		dl_h5_card_2: 'referAndEarn/dl_h5_card_2.png?t=20230919',
		dl_h5_card_3: 'referAndEarn/dl_h5_card_3.png?t=20230919',
	},
}

//获取图片
export const getResConfigImage = (name: any, path?: any) => {
	let result = ''
	if (path) {
		let from = resConfig[path] || {}
		result = from[name]
	} else {
		result = resConfig[name]
	}
	if (typeof result == 'object') {
		result = result[selectLang().value] || result['11']
	}
	if (!result) {
		HallLog.error('getResConfigImage image error==============>name:', name, ';path:', path)
	} else {
		if (result && result.startsWith('http')) {
			return result
		}
		if (result.indexOf('.jpg') < 0 && result.indexOf('.png') < 0) {
			//非图片
			result = resConfig['root-url-source'] + result
		} else {
			result = resConfig['root-url'] + result
		}
	}
	return result
}
