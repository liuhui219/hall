// //google验证测试
// export default defineEventHandler(async (event) => {
//
//     //AIzaSyDSde46LYz8ujBFq8LXl89PYuGioau06Xs
//     //	new_pwd: string
//     const body = await readBody<{ token: string }>(event)
//     console.info("token:", body.token);
//     const projectId = "bxtestnew4digcc-1677674733989";
//     const apiId = "AIzaSyDSde46LYz8ujBFq8LXl89PYuGioau06Xs";
//     const res = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiId}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             "event": {
//                 "token": body.token,
//                 "siteKey": "6LemusIkAAAAAA9SSWHZ2xD0pONmVobOq3rSPxQg",
//             }
//         }),
//     });
//     let json = await res.json();
//     console.info("\ngoogle返回的数据为：", json);
//     return json;
//
// })
//

//6Lc8FsQkAAAAAIHItXd2U4cXB7EKvu56g_dhFHHp
//6Lc8FsQkAAAAAHoMGRxaB7b7hjFzB67U4dcpQaYs

//google验证测试
export default defineEventHandler(async (event) => {
	const body = await readBody<{ token: string }>(event)
	console.info('token:', body.token)
	const form = new FormData()
	form.set('secret', '6Lc8FsQkAAAAAHoMGRxaB7b7hjFzB67U4dcpQaYs')
	form.set('response', body.token)
	const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		body: form,
	})
	console.info('google返回的数据为：', await res.json())
	return 'success'
})
