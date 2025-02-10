import { messageBase, type MessageName } from '~/schema/ws'

export const useSocket = () => {
  const { $socket } = useNuxtApp()

  return $socket
}

/**
 * 监听指定消息名称的 WebSocket 消息，并在接收到消息时调用回调函数。
 *
 * @template T 消息的类型。
 * @param {MessageName} messageName 要监听的消息名称。
 * @param {(message: T) => void} callback 接收到消息时调用的回调函数。
 * @param {(data: any) => T} [parser] 可选的解析函数，用于将接收到的数据解析为指定类型。
 *
 * @example
 * ```typescript
 * useMessageListener<MyMessageType>('myMessage', (message) => {
 *   console.log(message);
 * }, (data) => {
 *   return JSON.parse(data);
 * });
 * ```
 */
export const useMessageListener = <T>(
  messageName: MessageName,
  callback: (message: T) => void,
  parser?: (data: any) => T,
) => {
  const socket = useSocket()

  const onMessage = (event: MessageEvent) => {
    try {
      const message = messageBase.parse(event.data)

      if (message.name !== messageName) return

      if (parser) {
        const parsed = parser(event.data)

        callback(parsed)
      } else {
        callback(JSON.parse(event.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  onMounted(() => {
    socket.addEventListener('message', onMessage)
  }),
    onBeforeMount(() => {
      socket.removeEventListener('message', onMessage)
    })
}
