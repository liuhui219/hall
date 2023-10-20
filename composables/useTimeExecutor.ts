// ~~/hooks/useTimeExecutor.js

import { ref, onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue'
import mitt from 'mitt'

export const mitter = mitt()

export const timer = setInterval(() => {
	mitter.emit('time_update')
}, 1000)

/**
 * 统一处理定时函数的hooks
 * @param options: Object
 * options.second: Number      请求的间隔秒
 * options.func: Function      需要执行的函数
 * options.immediate: Boolean  是否立即执行
 * options.wait: Boolean       是否等待执行(如果上一个loading未执行完，就不会执行)
 * options.disabled: Boolean   是否禁用(如果希望手动执行exec就开启此选项)
 */
export default function (options = {}) {
	const { second = 5, immediate = true, wait = true, disabled = false, func = function () {} } = options

	let current = 0
	let isListening = false
	const isPause = ref(false)
	const isLoading = ref(false)

	// 页面挂载时执行一次，且开启监听
	onMounted(() => {
		immediate && exec()
		on()
	})

	// 使用keep-alive页面激活时开启监听
	onActivated(() => on())

	// 开启监听
	const on = () => {
		if (!disabled && !isListening) {
			isListening = true
			mitter.on('time_update', onTime)
		}
	}

	// 关闭监听
	const off = () => {
		mitter.off('time_update', onTime)
		isListening = false
	}

	// 监听到时间改变, 当满足时间间隔时执行函数
	const onTime = () => {
		if (isPause.value) return
		current++
		if (current % second === 0) exec()
	}

	// 暂停执行
	const pause = () => (isPause.value = true)

	// 继续执行
	const play = () => (isPause.value = false)

	// 执行函数
	const exec = async () => {
		if (wait && isLoading.value) return
		isLoading.value = true
		let res
		try {
			res = await func()
		} catch (e) {
			throw new Error(e) // 可统一处理错误
		} finally {
			isLoading.value = false
		}
		return res
	}

	// 页面卸载时销毁监听
	onBeforeUnmount(() => off())

	// 使用keep-alive页面隐藏时销毁监听
	onDeactivated(() => off())

	return {
		play,
		pause,
		exec,
		isPause,
		isLoading,
	}
}
