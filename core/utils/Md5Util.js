import md5 from 'js-md5'

export default class Md5Util {
	//md5字符串接口
	static encode(s) {
		return md5(s)
	}
}
