export default defineNuxtPlugin((app) => {
  const config = useRuntimeConfig()
  const { port, protocol, host } = config.public.ws

  const socket = new WebSocket(`${protocol}://${host}:${port}`)

  socket.addEventListener('open', (event) => {
    console.info('🌿 已与服务端 WebSocket 建立连接')
  })

  socket.addEventListener('message', (event) => {
    console.info('⭐️', event.data.toString())
  })

  return { provide: { socket } }
})
