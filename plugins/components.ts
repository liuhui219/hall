import { defineNuxtPlugin } from '#app'
import Vue3autocounter from 'vue3-autocounter'
import { vfmPlugin, $vfm, VueFinalModalProperty } from 'vue-final-modal'
import 'animate.css'
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(vfmPlugin({ componentName: 'VueFinalModal' })).use(Vue3autocounter, { name: 'AutoCounter' })
	return {
		provide: {
			vm: <VueFinalModalProperty>$vfm,
		},
	}
})
