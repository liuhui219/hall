import { defineStore } from 'pinia'
import HallLog from '~/apis/debug/HallLog'
import StorageKey from '~/apis/tool/StorageKey'
import { mapFace } from '~/apis/types'
export const useOtherStore = defineStore({
	id: 'other-store',
	state: () => {
		return {
			url: '',
			title: '',
			classContent: '',
			classOverlay: '',
			classModal: '',
			showback: false, //PC端返回
			initFunc: <Function | null>null,
			loadFunc: <Function | undefined>undefined,
			destoryFunc: <Function | undefined>undefined,
			data: <mapFace>{}, //额外数据
		}
	},
	actions: {
		mounted() {
			//otherInfo 函数中只可使用window this
			const otherInfo = vueStorage(StorageKey.OtherInfo, '')
			let config: any = {}
			try {
				config = JSON.parse(otherInfo.value, (_, value) => {
					if (value && typeof value === 'string' && value.indexOf('function') > -1) {
						return new Function(`return ${value}`)()
					}
					return value
				})
			} catch (error) {
				HallLog.error('JSON.parse otherInfo error data is: ', otherInfo.value)
			}
			this.title = config.title as string
			this.url = config.url as string
			this.classContent = config.classContent as string
			this.classOverlay = config.classOverlay as string
			this.classModal = config.classModal as string
			this.initFunc = config.initFunc || null
			this.loadFunc = config.loadFunc || undefined
			this.destoryFunc = config.destoryFunc || undefined
			this.data = config.data || {}
			if (this.initFunc && typeof this.initFunc == 'function') this.initFunc()

			setPagePaddingTitle(this.title)
		},
		unmounted() {
			if (this.destoryFunc && typeof this.destoryFunc == 'function') this.destoryFunc()
		},
		iFrameLoad() {
			if (this.loadFunc && typeof this.loadFunc == 'function') this.loadFunc()
		},
	},
	getters: {},
})
