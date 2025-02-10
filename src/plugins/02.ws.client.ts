import { messageBase } from '~/schema/ws'

export default defineNuxtPlugin((app) => {
  const config = useRuntimeConfig()
  const { port, protocol, host } = config.public.ws

  const socket = new WebSocket(`${protocol}://${host}:${port}`)

  socket.addEventListener('open', (event) => {
    console.info('🌿 已与服务端 WebSocket 建立连接')
  })

  socket.addEventListener('message', (event) => {
    console.info('⭐️', event.data.toString())

    try {
      const message = messageBase.parse(event.data)
      switch (message.name) {
        case 'socketIdAssigned':
          useState('socketId', () => message.data.socketId)
          break
        default:
          break
      }
    } catch (error) {
      console.error(error)
    }
  })

  socket.addEventListener('close', (event) => {
    const socketId = useState('socketId')
    socketId.value = ''
  })

  return { provide: { socket } }
})
