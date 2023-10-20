// import Rollbar, { LogArgument } from 'rollbar'
// import StorageKey from '~~/apis/tool/StorageKey'

import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'

export function errorHandleBoot() {
	// const rollbar = new Rollbar({
	// 	enabled: useRelease().value,
	// 	accessToken: 'bdaeec36c24f415c973b63ec159451e3',
	// 	captureUncaught: true,
	// 	captureUnhandledRejections: true,
	// 	reportLevel: 'error',
	// 	payload: {
	// 		environment: process.env.NODE_ENV,
	// 		client: {
	// 			javascript: {
	// 				source_map_enabled: true,
	// 				code_version: useRuntimeConfig().public.version,
	// 				guess_uncaught_frames: true,
	// 			},
	// 		},
	// 		person: {
	// 			id: vueStorage(StorageKey.LastUid, 0).value,
	// 		},
	// 		//filter condition for sending notification
	// 		team: 'quasar',
	// 	},
	// })

	const app = useNuxtApp()
	app.vueApp.config.errorHandler = (err: unknown) => {
		console.error(err)
		// rollbar.error(err as LogArgument)
	}

	window.onerror = function (message, source, lineno, colno, error) {
		console.error(error)
		// rollbar.error(error)
	}
}

export function testVersion() {
	if (!window.c_version) {
		window.c_version = sysConfig.client_version
		setTimeout(() => {
			testVersion()
		}, 1000)
		return
	}
	if (!window.versionTestTimer) {
		//1个小时检测一次版本更新
		window.versionTestTimer = setInterval(() => {
			testVersion()
		}, 3600 * 1000)
	}
	HallLog.log('testVersion start c_version:' + window.c_version)
	window.s_version = ''
	const timeParam = new Date().toISOString()
	useHead({
		script: [
			{
				src: `${resConfig['root-url-source']}version.js?${timeParam}`,
			},
		],
	})

	window.test_version_count = 0
	setTimeout(() => {
		matchVersion()
	}, 1000)
}

function matchVersion() {
	HallLog.log('matchVersion ' + 'c_version' + window.c_version + ' s_version:' + window.s_version + ' c:' + window.test_version_count)
	if (window.test_version_count >= 10) {
		return
	}
	window.test_version_count++
	if (window.s_version) {
		if (window.s_version > window.c_version) {
			if (window.versionForceUpdate) {
				versionUpdate()
			} else {
				useDialogStore().open({
					title: 'Version Update',
					text: '',
					ok: () => {
						versionUpdate()
					},
					cancel_text: 'No',
					ok_text: 'Yes',
				})
			}
		}
		return
	}
	setTimeout(() => {
		matchVersion()
	}, 3000)
}

function versionUpdate() {
	let newUrl = window.location.href
	let newReqParam = 'version_up=1'
	newUrl = Helper.urlAddParam(newUrl, newReqParam)
	window.location.href = newUrl
}
