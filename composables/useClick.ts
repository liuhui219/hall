import HallLog from '~~/apis/debug/HallLog'
import Helper from '~~/apis/tool/Helper'
//前端自定义点击事件 1-跳转外部链接 2-跳转页面 3-跳转弹窗 4-进入游戏 5-live-chat客服 6-跳转内部文档
//source 来源 默认-空字符串【未知】 banner-轮播图
export const pageConfigClick = (click_id: any, click_params: string, source = '') => {
	HallLog.log('pageConfigClick click_id:' + click_id + ' click_params:' + click_params)
	click_id = Number(click_id)
	switch (click_id) {
		case 1:
			Helper.toOutLink(click_params)
			break
		case 2:
			if (!click_params.startsWith('/')) {
				click_params = '/' + click_params
			}
			navigateTo(click_params)
			break
		case 3:
			if (click_params == 'download') {
				useNavigationStore().openDownload()
			} else {
				openPopup(click_params)
			}
			break
		case 4:
			let bIntoGame = true //默认强制进
			let tempArr = click_params.split('|')
			let game_id = Number(tempArr[0])
			if (tempArr[2] == '0') {
				bIntoGame = false
			}

			let bDemo: any = false //默认真玩
			if (tempArr[1] == '') {
				bDemo = null
			} else if (tempArr[1] == '1') {
				bDemo = true
			}
			useGameStore().tryToGame(game_id, bIntoGame, bDemo)
			break
		case 5:
			clickLiveChat()
			break
		case 6:
			let url = click_params
			if (!url.startsWith('http')) {
				url = resConfig['root-url-source'] + click_params
			}
			Helper.toOutLink(url)
			break
		default:
			break
	}

	if (source) {
		googleEvent({ event: source, click_id, click_params, sendType: 1 })
	}
}
