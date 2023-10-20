//检查登录态
export default defineEventHandler(async (event) => {
	return event.context.user
})
