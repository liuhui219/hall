import { usePageLoading } from './../composables/usePage'
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.mixin({
		mounted: () => {
			usePageLoading().value = false
		},
		activated: () => {
			usePageLoading().value = false
		},
	})
})
