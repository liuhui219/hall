import {StartNatsService} from '../nats/natsServices'


export default defineNitroPlugin((nitroApp) => {
    const config = useRuntimeConfig()

    const asyncFunc = async () => {
        await StartNatsService()
        return '启动nats！'
    }

    asyncFunc().then((value) => {

    })
})
