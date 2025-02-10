import { WebSocket } from 'ws'
import { socketIdAssignedBuilder } from '~/utils/ws'
import { guid } from '../utils/surreal'
import { removeSocket, setSocket } from '../utils/ws'

export default defineNitroPlugin(async (nitroApp) => {
  socketServer.once('listening', () => {
    console.info('😈 WebSocket 服务器正在监听')
  })

  socketServer.on('connection', async (socket) => {
    console.info('🌿 已与客户端 Websocket 建立连接')
    console.info(
      '🧶 已与客户端 Websocket 建立连接的数量是：',
      Array.from(socketServer.clients).length,
    )

    const socketId = await guid()
    socket.send(socketIdAssignedBuilder.build({ socketId }))

    await setSocket(socketId, socket)

    socket.on('close', async () => {
      await removeSocket(socketId)
    })

    socket.send('欢迎来到黑喵大家庭🐱')

    socket.on('message', (data, isBinary) => {
      console.info('💬', data.toString())
      socket.send(`🌙 已收到消息：${data.toString()}`)

      socketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client != socket) {
          client.send(data, { binary: isBinary })
        }
      })
    })
  })
})
