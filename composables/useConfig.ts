import { mapFace, popupHeaderAndNavbar } from './../apis/types/index'

export const useAcode = () => useState('init_code_map', () => '+55')
export const useRelease = () => useState('config_release', () => !useRuntimeConfig().public.app_env)
export const useAppEnv = () => useState('app_env', () => Number(useRuntimeConfig().public.app_env || 0))
export const useAppModel = () => useState('app_model', () => useRuntimeConfig().public.app_model)
export const useAppSkin = () => useState('app_skin', () => useRuntimeConfig().public.app_skin)
export const useAppId = () => useState('app_id', () => useRuntimeConfig().appid)
export const useAppName = () => useState('app_name', () => useRuntimeConfig().appname)
export const useServerVersion = () => useState('server_version', () => useRuntimeConfig().public.version) //nodejs编译发布时间
export const useReqVersion = () => useState('req_version', () => '0') //请求回源的时间
export const useAfunFront = () => useState('req_afun_front', () => '')
export const useAfunBack = () => useState('req_afun_back', () => '')

export const getPopupPath = (pageName: string, isPopup = true): string => {
	if (isPopup) {
		const src = useNuxtApp().$device.isDesktop ? 'desktop' : 'mobile'
		return `${src}/popup/${pageName}`
	} else {
		return `skin/${pageName}`
	}
}
//是否显示头和尾
export const popupHeaderNavbarConfig: popupHeaderAndNavbar = {
	login: { overlay: 'login' }, //登录弹窗配置
	register: { overlay: 'register' }, //注册弹窗配置
	reset: { overlay: 'reset' }, //充值密码配置
	menu: { overlay: '' },
	download: { overlay: 'download' },
	deposit: { overlay: 'deposit' },
	withdraw: { overlay: 'deposit' },
	logout: { overlay: 'logout' },
	account: { overlay: 'account' },
	myProfile: { overlay: 'myProfile' },
	myProfileEdit: { overlay: 'myProfileEdit' },
	settings: { overlay: 'settings' },
	inviteRecord: { overlay: 'inviteRecord' },
	reward: { overlay: 'reward' },
	rewardHistory: { overlay: 'rewardHistory' },
	betHistory: { overlay: 'betHistory' },
	transaction: { overlay: 'betHistory' },
	bonus: { overlay: 'betHistory' },
	message: { overlay: 'message' },
	roulette: { overlay: 'roulette' },
	promotioncontent: { overlay: 'promotion' },
	gamedetail: { overlay: 'gamedetail' },
	desc: { overlay: 'desc' },
	other: { overlay: 'other' },
	checkin: { overlay: 'checkin' },
	inviteChest: { overlay: 'inviteChest' },
	userInfo: { overlay: 'userInfo', class: 'user-info', index: 305 },
	chat: { overlay: 'chat' },
	registerCode: { overlay: 'register-code' },
	walletRules: { overlay: 'walletRules' },
	commissionRewards: { overlay: 'commissionRewards' },
	distributionRewards: { overlay: 'distributionRewards' },
	friendsList: { overlay: 'friendsList' },
	referralRewards: { overlay: 'referralRewards' },
	referralVipRewards: { overlay: 'referralVipRewards' },
	agentHistory: { overlay: 'agentHistory' },
	spinRule: { overlay: 'spinRule' },
	referEarn: { overlay: 'referEarn' },
	lossRebate: { overlay: 'deposit' },
}
