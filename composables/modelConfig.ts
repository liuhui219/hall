export const modelConfig = {
	A: {
		game_count: 3, //游戏显示个数配置 未使用
		game_detail: true, //游戏是否显示底部配置
		float_up: false, //游戏鼠标悬停是否上移
		game_help: false, //PC游戏是否显示RTP感叹号图标
		login_way: {
			//登陆注册选项图标配置
			// account: { icon: 'reg-account', way: 2, text: 'U0001' },
			email: { icon: 'mail-outbox', way: 0, text: 'U0026' },
			phone: { icon: 'tel-outbox', way: 1, text: 'U0027' },
		},
		reset_list: [
			{
				icon: 'mail-outbox',
				way: 0,
				key: 'email',
				class: '',
				text: 'U0026',
			},
			{
				icon: 'tel-outbox',
				way: 1,
				key: 'phone',
				class: '',
				text: 'U0027',
			},
		],
	},
	B: {
		game_count: 2,
		game_detail: false,
		float_up: true,
		game_help: false,
		login_way: {
			// account: { icon: 'ic-account', way: 2, class: 'bottom' },
			email: { icon: 'mail-outbox', way: 0, text: 'U0026' },
			phone: { icon: 'tel-outbox', way: 1, text: 'U0027' },
		},
		reset_list: [
			{
				icon: 'mail-outbox',
				way: 0,
				key: 'email',
				class: '',
				text: 'U0026',
			},
			{
				icon: 'tel-outbox',
				way: 1,
				key: 'phone',
				class: '',
				text: 'U0027',
			},
		],
	},
}
