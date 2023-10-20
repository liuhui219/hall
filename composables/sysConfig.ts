import { mapFace } from '~~/apis/types'

//系统配置
export const sysConfig: mapFace = {
	client_version: '202310140930',
	lang: '11',
	ios_download_url: '',
	android_download_url: '',
	point_format: '1',
	currency_symbol: 'R$',
	currency_abbr: 'BRL',
	default_acode: '+55',
	phone_length: [11],
	gtk_time: 3600, //游戏模板缓存有效期：1小时
	head_img_count: 15,
	share_list: [
		{
			url: 'http://www.facebook.com/sharer.php?u={url}&t={text}',
			icon: 'facebook',
			sort: '1',
		},
		{
			url: 'https://telegram.me/share/url?url={url}&text={text}',
			icon: 'telegram',
			sort: '2',
		},
		{
			url: 'https://twitter.com/intent/tweet?url={url}&text={text}',
			icon: 'twitter',
			sort: '3',
		},
		{
			url: 'https://api.whatsapp.com/send?text={text}  {url}',
			icon: 'whats_app',
			sort: '4',
		},
	],
	share_text: {
		'1': 'Join today and start off with a R$100 bonus',
		'11': 'Junte-se à hoje e comece com um bônus de R$100.',
		'12': 'Únete hoy y comienza con un bono de R$100.',
	},

	gclass_name_list: [
		{
			name: {
				'1': 'Original',
				'11': 'Originais',
				'12': 'Original',
			},
			gclass: '10',
			icon: 'fire',
			sort: '0',
			urlKey: 'Original',
		},
		{
			name: {
				'1': 'Leisure',
				'11': 'Lazer',
				'12': 'Casuales',
			},
			gclass: '1',
			icon: 'badge',
			sort: '3',
			urlKey: 'Special',
		},
		{
			name: {
				'1': 'Slots',
				'11': 'Slots',
				'12': 'Slots',
			},
			gclass: '2',
			icon: 'cherry',
			sort: '1',
			urlKey: 'Slots',
		},
		{
			name: {
				'1': 'Live',
				'11': 'Ao vivo',
				'12': 'En vivo',
			},
			gclass: '3',
			icon: 'play',
			sort: '2',
			urlKey: 'Live',
		},
		{
			name: {
				'1': 'Sport',
				'11': 'Esportes',
				'12': 'Deporte',
			},
			gclass: '4',
			icon: 'ball',
			sort: '5',
			urlKey: 'Sport',
		},
		{
			name: {
				'1': 'Shows',
				'11': 'Shows',
				'12': 'Concurso',
			},
			gclass: '5',
			icon: 'TV',
			sort: '4',
			urlKey: 'Shows',
		},
	],

	name_min_len: '2',
	name_max_len: '60',
	name_regexp: '',

	realname_min_len: '2',
	realname_max_len: '60',
	realname_regexp: '',

	nickname_min_len: '1',
	nickname_max_len: '15',
	nickname_regexp: '^[\\s\\S]{1,15}$',

	email_regexp: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',

	password_min_len: '6',
	password_max_len: '30',
	password_regexp: '^[0-9a-zA-Z!@#$%^&*()_+-=,./<>?;\':\\"\\[\\]\\\\\\{\\}|`~]{6,30}$',

	promoto_min_len: '6',
	promoto_max_len: '12',
	promoto_regexp: '^[0-9]{6,12}$',

	account_min_len: '6',
	account_max_len: '16',
	account_regexp: '',

	task_rate_list: [
		{
			id: '2001',
		},
		{
			id: '2002',
		},
		{
			id: '3002',
		},
		{
			id: '4201',
		},
		{
			id: '4202',
		},
		{
			id: '4204',
		},
		{
			id: '4205',
		},
	],

	phone_duration: '300',
	email_duration: '300',
	mobile_game_num: '18',
	pc_game_num: '36',
	reward_types: [
		{
			title: {
				'1': 'All',
				'11': 'Todas',
				'12': 'Todo',
			},
			type: '0',
		},
		{
			title: {
				'1': 'Task',
				'11': 'Tarefa',
				'12': 'Tarea',
			},
			type: '29',
		},
		{
			title: {
				'1': 'Code',
				'11': 'Código',
				'12': 'Código',
			},
			type: '48',
		},
		{
			title: {
				'1': 'Register',
				'11': 'Registro',
				'12': 'Registro',
			},
			type: '2',
		},
		{
			title: {
				'1': 'VIP Level',
				'11': 'Nível VIP',
				'12': 'Nivel VIP',
			},
			type: '36',
		},
		{
			title: {
				'1': 'VIP monthly bonus',
				'11': 'Bônus mensal VIP',
				'12': 'Bono mensual VIP',
			},
			type: '37',
		},
		{
			title: {
				'1': 'Cashback',
				'11': 'Cashback',
				'12': 'Cashback',
			},
			type: '55',
		},
		{
			title: {
				'1': 'Refferal',
				'11': 'Indique',
				'12': 'Referencia',
			},
			type: '26',
		},
		{
			title: {
				'1': 'Refferal First Deposit',
				'11': 'Primeiro Depósito de Indicação',
				'12': 'Primer Depósito de Referencia',
			},
			type: '50',
		},
		{
			title: {
				'1': 'First Deposit',
				'11': 'Primeiro Depósito',
				'12': 'Primer Depósito',
			},
			type: '47',
		},
		{
			title: {
				'1': 'Check-In',
				'11': 'Check-In',
				'12': 'Check-In',
			},
			type: '56',
		},

		{
			title: {
				'1': 'Weekly Bonus',
				'11': 'Bônus Semanal',
				'12': 'Bono Semanal',
			},
			type: '58',
		},
		{
			title: {
				'1': 'Invitation Chest',
				'11': 'Baú de Convites',
				'12': 'Cofre de Invitación',
			},
			type: '59',
		},
		{
			title: {
				'1': 'Task Point Reward',
				'11': 'Recompensa de Ponto de Tarefa',
				'12': 'Recompensa de Punto de Tarea',
			},
			type: '22',
		},
		{
			title: {
				'1': 'Props',
				'11': 'Adereços',
				'12': 'Accesorios',
			},
			type: '54',
		},
		{
			title: {
				'1': 'Task Point',
				'11': 'Ponto de Tarefa',
				'12': 'Punto de Tarea',
			},
			type: '52',
		},
		{
			title: {
				'1': 'Tournament',
				'11': 'Torneio',
				'12': 'Torneo',
			},
			type: '60',
		},
		{
			title: {
				'1': 'Lucky Draw',
				'11': 'Sorteio',
				'12': 'Sorteo',
			},
			type: '61',
		},
		{
			title: {
				'1': 'Deposit Offers',
				'11': 'Sorteio',
				'12': 'Sorteo',
			},
			type: '63',
		},
		// 代理
		{
			title: {
				'1': 'Commission Rewards',
				'11': 'Recompensas de Comissão',
				'12': 'Recompensas de Comisión',
			},
			type: '101',
		},
		{
			title: {
				'1': 'Invite Rewards',
				'11': 'Recompensas de Convite',
				'12': 'Recompensas por Invitación',
			},
			type: '103',
		},
		{
			title: {
				'1': 'VIP Upgrade Rewards',
				'11': 'Recompensas de Upgrade VIP',
				'12': 'Recompensas por Actualización VIP',
			},
			type: '104',
		},
		{
			title: {
				'1': 'Distribution Commission Rewards',
				'11': 'Recompensas de Comissão de Distribuição',
				'12': 'Recompensas de Comisión de Distribución',
			},
			type: '105',
		},
		{
			title: {
				'1': 'Distribution Recharge Rewards',
				'11': 'Recompensas de Recarga de Distribuição',
				'12': 'Recompensas por Recarga de Distribución',
			},
			type: '106',
		},
		// 下级奖励 接口返其他自己匹配
		{
			title: {
				'1': 'Subordinate Rewards',
				'11': 'Recompensas de Subordinados',
				'12': 'Recompensas por Referidos',
			},
			type: '未知',
		},
		// 宝箱活动奖励
		// {
		// 	title: {
		// 		'1': 'aaa',
		// 		'11': 'bbb',
		// 		'12': 'ccc',
		// 	},
		// 	type: '107',
		// },
		{
			title: {
				'1': 'Invitation Reward',
				'11': 'Recompensa de convite',
				'12': 'Recompensa de invitación',
			},
			type: '103',
		},
		{
			title: {
				'1': 'VIP Upgrade Reward',
				'11': 'Recompensa de convite e upgrade VIP',
				'12': 'Recompensa de invitación y mejora VIP',
			},
			type: '104',
		},
		{
			title: {
				'1': 'Referral - Commission Reward',
				'11': 'Recompensa de comissão de referência',
				'12': 'Recompensa de comisión de referencia',
			},
			type: '105',
		},
		{
			title: {
				'1': 'Referral - Recharge Reward',
				'11': 'Recompensa de recarga de referência',
				'12': 'Recompensa de recarga de referencia',
			},
			type: '106',
		},
		{
			title: {
				'1': 'Special Reward',
				'11': 'Ofertas de Depósito',
				'12': 'Ofertas de Depósito',
			},
			type: '8',
		},
	],
	activity: {
		task: true,
		download: true,
	},

	menuConfig: {
		carnival: false,
		tournament: false,
	},

	kycConfig: {
		status: false,
	},
	chatConfig: {
		status: true,
		mod: 'gchat',
		bNoUrlMod: true,
		bOnlyOneRoom: true,
		roomList: [
			{ lang: '1', glv: 'l1', text: langConf['1'].text },
			{ lang: '11', glv: 'l11', text: langConf['11'].text },
			{ lang: '12', glv: 'l12', text: langConf['12'].text },
		],
	},
	rouletteConfig: {
		statusList: [true, true, true],
	},
	oneAllConfig: {
		status: false,
		callbackUrl: '',
		subdomain: 'afun-com',
		socialList: ['google', 'facebook', 'steam'],
	},

	telegramConfig: {
		status: false,
		botName: '',
		oneAllSocial: 'facebook', //用oneall的某个图标代替telegram
		domainList: [
			{ domain: '127.0.0.1', botName: 'AFunLocalTestBot' }, //6066397357:AAHDPiVF0uqm7SMgKwKqLRmbvyjJjBUkAOs
			{ domain: 'afun-dev-a01.ncjimmy.com', botName: 'AFunTestBot' }, //6479391613:AAG12oNjyKypDHsa01RIDCQWSA_Z3munsPY
			{ domain: 'afun-staging-a01.ncjimmy.com', botName: 'AFunStagingBot' }, //6564142939:AAG3xCXqlttLehA6LpAcyN7ZXW_5wHukC_Y
			{ domain: 'afun-dev-b01.ncjimmy.com', botName: 'AFunTestB01Bot' }, //6506462195:AAH0N_3zeQ9kKxWwkrfp1q4maBVXFO5pkoI
			{ domain: 'afun-staging-b01.ncjimmy.com', botName: 'AFunStagingB01Bot' }, //6380258409:AAFI58yhgYnzqGZZEcWwcNDqM01YQkn7GQA

			{ domain: 'www.afun.com', botName: 'AFunComBot' }, //6400803098:AAGD6QR1toMqjwg4Wl-rdlrHMGonWxSzwZ8
			{ domain: 'www.afun.games', botName: 'AFunGamesBot' }, //6585868181:AAGK1Txxz2TB1ZQ2oL52lOgsCXVoh0Rp1Ic
			{ domain: 'www.megabossbr.com', botName: 'MegabossComBot' }, //6635410971:AAHGxxDMBOqLGm0HDbthEwin1EGjopD5GmA
			{ domain: 'www.megaboss.io', botName: 'MegabossIoBot' }, //6065134468:AAE3SuRtYkRUWzLacEiET6xfol8j6xInyrA
			{ domain: 'www.cbet777.com', botName: 'Cbet777ComBot' }, //6661352066:AAE7U2r0ApSHmOQ6UXdWpnzF2sfzmLCJGIM
			{ domain: 'www.dgjogo.com', botName: 'DgjogoComBot' }, //6560848776:AAF-XQvUYdVejTphfYagfo1mZ7A0nik1BME

			{ domain: 'www.gmc02.com', botName: 'GmcComBot' }, //6193901984:AAHh_1hoota74FIGh8msx2SOWC33ThMSCYM
			{ domain: 'www.a5.game', botName: 'A5GameBot' }, //6683031126:AAG6rMwOa0ql2fBEBpeLwswrk6Bbnj4UAT8
			{ domain: 'www.okd77.com', botName: 'Okd77ComBot' }, //6332220584:AAHPSjlhiO8f9sH0FQ_HyELD_C44EwqPROk
			{ domain: 'www.bcjogo.com', botName: 'BcjogoComBot' }, //6423509808:AAFfd0RhIuqYNOhzubsf4c7cRzj4pE6tT9k
			{ domain: 'www.rico33.com', botName: 'Rico33ComBot' }, //6637533751:AAH-JU-AwP_paUFpRJRHad-rJ3ZvRV6GAd8
			{ domain: 'www.coin777.cc', botName: 'Coin777CcBot' }, //6551094639:AAHd-wTv3_-fvZDS_L-BfZGscJ0k0Sd2uIk

			{ domain: 'www.bbet.games', botName: 'BbetGamesBot' }, //6423559302:AAFq0EeuZlP3T8mdc_l5keJmqQYmN8V4hd4
		],
	},
}
