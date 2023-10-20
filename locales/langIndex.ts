import appLang from './lang'
import errnoLang from './errnoLang'
const from = [appLang, errnoLang]
Object.keys(appLang).forEach((el) => {
	Object.assign(...from.map((item) => item[el]))
})
export default appLang
