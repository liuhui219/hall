import { mapFace } from '~~/apis/types'

export const useTimerConfig = () =>
	useState(
		'timer-refresh',
		() =>
			<mapFace>{
				data: <mapFace>{},
				register(key: string, func: Function | null, play: boolean) {
					this.data[key] = {
						play: play,
						func: func,
						key: key,
					}
				},
				remove(key: string) {
					delete this.data[key]
				},
				pause: <Function | null>null,
				play: <Function | null>null,
			}
	)

export const registerTimer = (key: string, func: Function | null, play = true) => {
	let timer = useTimerConfig()
	timer.value.register(key, func, play)
	// if (timer.value.play) {
	// 	timer.value.play();
	// }
}

export const startTimer = (key: string) => {
	let timer = useTimerConfig()
	let item = timer.value.data[key]
	if (item) {
		item.play = true
		// if (timer.value.play) {
		// 	timer.value.play();
		// }
	}
}

export const pauseTimer = (key: string) => {
	let item = useTimerConfig().value.data[key]
	if (item && item.play) {
		item.play = false
	}
}

export const removeTimer = (key: string) => {
	useTimerConfig().value.remove(key)
}

export const isTimerExist = (key: string) => {
	return useTimerConfig().value.data[key]
}

export const timerIsPlay = (key: string) => {
	let item = isTimerExist(key)
	if (!item) return false
	return item.play
}

//时间选择列表
//
export const timeList = () => {
	return [useNuxtApp().$t('AF0013'), useNuxtApp().$t('AF0010'), useNuxtApp().$t('AF0011'), useNuxtApp().$t('AF0012')]
}
