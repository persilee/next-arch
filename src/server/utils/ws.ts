import { WebSocketServer, type WebSocket } from 'ws'

const config = useRuntimeConfig()

export const socketServer = new WebSocketServer({ port: config.public.ws.port })

/**
 * 存储 WebSocket
 *
 * @param socketId - WebSocket 连接的唯一标识符。
 * @param socket - WebSocket 实例。
 * @returns 一个 Promise，表示存储操作的完成。
 */
export const setSocket = async (socketId: string, socket: WebSocket) => {
  return useStorage('socket').setItemRaw(socketId, socket)
}

/**
 * 获取指定 socketId 的 WebSocket 实例。
 *
 * @param {string} socketId - 要获取的 WebSocket 实例的 socketId。
 * @returns {Promise<WebSocket>} 返回一个包含 WebSocket 实例的 Promise。
 */
export const getSocket = async (socketId: string) => {
  return useStorage('socket').getItemRaw(socketId) as Promise<WebSocket>
}

/**
 * 移除指定的 socket。
 *
 * @param {string} socketId - 要移除的 socket 的 ID。
 * @returns {Promise<void>} 返回一个 Promise，当 socket 被移除时 resolve。
 */
export const removeSocket = async (socketId: string) => {
  return useStorage('socket').removeItem(socketId)
}
