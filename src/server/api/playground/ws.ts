import { WebSocket } from 'ws'

export default defineEventHandler(async (event) => {
  const socketId = getHeader(event, 'x-socket-id')

  if (socketId) {
    const socket = await getSocket(socketId)

    setTimeout(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({ name: 'playground', data: { content: `😄: ${socketId}` } }),
        )
      }
    }, 3000)
  }
})
