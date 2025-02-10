import { WebSocketServer } from 'ws'

const config = useRuntimeConfig()

export const socketServer = new WebSocketServer({ port: config.public.ws.port })
