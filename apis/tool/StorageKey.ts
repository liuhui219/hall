export default class StorageKey {
	//首次进入
	static FIRST_OPEN = 'FIRST_OPEN'
	//上一次登录uid
	static LastUid = 'LastUid'
	//上一次登录账户所属渠道
	static LastChannel = 'LastChannel'
	//上一次登录账户所属总代
	static LastGeneral = 'LastGeneral'
	//马甲包渠道
	static AppChannel = 'AppChannel'
	//语言设置
	static UserLang = 'UserLang'
	//是否已充值过
	static HavePaid = 'HavePaid'
	//会话窗口原始url
	static FirstUrl = 'FirstUrl'
	//上次登录上报的时间
	static LastLoginEventTime = 'LastLoginEventTime'
	//后端上报所需key
	static AppSdkData = 'AppSdkData'
	//上次登录的时间【包含自动登录】
	static LastLoginTime = 'LastLoginTime'
	//用户行为记录(与账号绑定)
	static USER_ACTIONS = 'USER_ACTIONS'
	//聊天室默认房间
	static CHAT_ROOM = 'CHAT_ROOM'

	//新版新增
	//用户信息
	static UserInfo = 'sk_u_i_m'
	//服务端的UUID
	static WebDeviceUUID = 'sk_w_d_u'
	//是否记住账号密码
	static RememberLogin = 'sk_r_m_l'
	//登录账号密码
	static RememberHistory = 'sk_r_m_h'
	//协议18岁点击状态
	static UserAgreement = 'sk_u_a_m'
	//收取邮件通知
	static UserEmailPromos = 'sk_u_e_p'
	//修改密码邮件验证码时间戳
	static VerifyResetEmailCodeTime = 'sk_v_r_e_c_t'
	//修改密码手机验证码时间戳
	static VerifyResetPhoneCodeTime = 'sk_v_r_p_c_t'
	//其他页面信息
	static OtherInfo = 'sk_o_i'
	//弹转盘信息
	static RoulettePopTimer = 'sk_r_p_t'
	//下载Tip状态 0-默认 1-关闭
	static DownloadTipKey = 'sk_d_t_k'
	//url带的特殊优惠参数
	static UrlCodes = 'sk_u_c_s'
	//注册发送手机验证码倒计时
	static RegSendPhoneCodeTime = 'sk_r_s_p_c_t'
	//注册发送邮箱验证码倒计时
	static RegSendEmailCodeTime = 'sk_r_s_e_c_t'
	//找回密码发送手机验证码倒计时
	static ResetSendPhoneCodeTime = 'sk_rs_s_p_c_t'
	//找回密码发送邮箱验证码倒计时
	static ResetSendEmailCodeTime = 'sk_rs_s_e_c_t'
}
