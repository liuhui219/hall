import { mapFace } from './../apis/types/index'
import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
import Global from '~~/core/Global'
import { NetLogin } from '~~/core/apis/hall/NetEvent'
export const useHttpLoading = () => useState('http-loading', () => false)
export const useUserLoading = () => useState('user-loading', () => false)
const httpRequestMap: mapFace = {}

// CONN请求
export function useHttpConn(func: string, options: mapFace = {}, onSuc = null, onError = null) {
	if (!options.body) {
		options.body = {}
	}

	let bNeedLogin = options.login
	if (options.login) {
		delete options.login
		if (!useUserStore().isLogin) {
			if (onError) {
				onError({
					_errno: -2,
					_errstr: 'no login ' + func,
				})
			}
			return
		}
	}
	let mod = options.mod ?? 'appserver'
	delete options.mod
	if (!bNeedLogin) {
		//无需登录态的业务请求协议，需要加上前缀【NA.】
		if (mod != NetLogin.root && mod != NetLogin.login && mod != NetLogin.verifycode) {
			func = 'NA.' + func
		}
	}
	const rmk = mod + '_' + func + '_' + JSON.stringify(options)
	if (httpRequestMap[rmk]) {
		if (onError) {
			onError({
				_errno: -3,
				_errstr: 'same request ' + func,
			})
		}
		return
	}

	if (options.loading) {
		httpRequestMap[rmk] = true
	}

	const loading = useHttpLoading()
	let thisLoading: any = null
	//options loading参数0 不loading 1强制loading 2延迟loading
	if (options.loading && !loading.value) {
		if (options.loading === 1) {
			loading.value = true
		} else {
			thisLoading = setTimeout(() => {
				loading.value = true
			}, 200)
		}
	}

	// HallLog.log('conn send', func)
	if (!options.body.app_id) {
		options.body.app_id = useAppId().value
	}
	// if (!options.body.appid) {
	// 	options.body.appid = useAppId().value //checkversion需要
	// }
	// if (!options.body.device) {
	// 	options.body.device = getDeviceObject()
	// }
	Global.HallServer.send(
		mod,
		func,
		options.body,
		(res: any) => {
			// HallLog.log('conn onSuc ' + func, res)
			httpConnEnd(thisLoading, rmk)
			if (onSuc) {
				onSuc(res)
			}
		},
		(err: any) => {
			HallLog.error('conn onError ' + func, err)
			httpConnEnd(thisLoading, rmk)
			httpConnError(err, options)
			if (onError) {
				onError(err)
			}
		}
	)
}

function httpConnEnd(thisLoading: any, rmk: any) {
	if (thisLoading) {
		clearTimeout(thisLoading)
		thisLoading = null
	}

	delete httpRequestMap[rmk]
	if (Object.keys(httpRequestMap).length == 0) {
		const loading = useHttpLoading()
		loading.value = false
	}
}

function httpConnError(err: any, options: any) {
	// //网络已断开，请重新登录
	// _CheckLoginFailed = 401;
	// //第三方登录失败
	// _OpenidLoginFailed = 402;
	// //系统维护
	// _SystemMaintain = 403;
	// //访问受限，不是在返回error中，而是返回状态码
	// static LimitAccess = 403;
	// //信息过期，重新登录
	// _LoginOverTime = 517;

	setTimeout(() => {
		const { addErrorMessage } = useSysConfigStore()
		if (err._errno) {
			if (err._errno == -1) {
				return
			} else if (err._errno == 1030) {
				err._param = [options.body.errname]
			}
			addErrorMessage({ id: err._errno, icon: '', msg: Helper.getErrnoStr(err), type: TipsTypeEnum.error })

			if (err._errno == 401 || err._errno == 402 || err._errno == 403 || err._errno == 517) {
				//重新登录
				useDialogStore().logOutCallback()
			}
		}
	})
}
