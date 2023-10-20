export class HallErrorHelper {
	handleError(serverData, errorHandler) {
		if (serverData == null) {
			return false
		}
		if (serverData._errno == null) {
			return true
		}
		if (errorHandler) {
			return errorHandler(serverData)
		}
	}
}
