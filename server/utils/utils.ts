import { JSONCodec } from 'nats'

export function GetTimestamp() {
	return Date.now()
}

//时间戳 10位
export function GetUnix() {
	return Date.now() / 1000
}

//时间戳 13位
export function GetUnixNino() {
	return Date.now()
}

export function Encode(data: any) {
	const sc = JSONCodec()
	return sc.encode(data)
}

export function Decode(str: Uint8Array) {
	const sc = JSONCodec()
	return sc.decode(str)
}

export function JsonToBuffer(data: any) {
	return Buffer.from(JSON.stringify(data)).toString()
}

export async function JwtGenerate(rsp: any) {
}

