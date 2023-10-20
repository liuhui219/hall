
export default defineEventHandler(async (event) => {
	// const config = useRuntimeConfig()
	// if (event.context.user != undefined) {
	// 	deleteCookie(event, config.cookieName, {
	// 		httpOnly: true,
	// 		path: '/',
	// 		sameSite: 'strict',
	// 	})
	// 	event.context.user = undefined
	// }

	return 'logout'
})
