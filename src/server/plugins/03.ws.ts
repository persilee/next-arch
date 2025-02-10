export default defineNitroPlugin(async (nitroApp) => {
  socketServer.once('listening', () => {
    console.info('😈 WebSocket 服务器正在监听')
  })

  socketServer.on('connection', async (socket) => {
    console.info('🌿 已与客户端 Websocket 建立连接')

    socket.send('欢迎来到黑喵大家庭🐱')

    socket.on('message', (data, isBinary) => {
      console.info('💬', data.toString())
      socket.send(`🌙 已收到消息：${data.toString()}`)
    })
  })
})
