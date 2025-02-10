import type { FetchContext, FetchResponse } from 'ofetch'

export const useFetchInterceptor = (options = { showError: true }) => {
  const { showError } = options

  /**
   * 处理响应错误的回调函数。
   *
   * @param context - 包含响应数据的 FetchContext 对象。
   *
   * 该函数会根据响应中的错误信息，使用 toast 显示相应的错误提示。
   * 如果错误是 ZodError 类型，则显示第一个问题的消息。
   * 如果错误包含 message 属性，则显示该消息。
   */
  const onResponseError = (
    context: FetchContext & { response: FetchResponse<ResponseType> },
  ) => {
    const toast = useToast()
    const error = context.response?._data

    if (showError && error && error.data?.name === 'ZodError') {
      toast.remove(error.url)
      toast.add({
        id: error.url,
        title: error.data.issues[0].message,
      })

      return
    }

    if (showError && error && error.message) {
      toast.remove(error.url)
      toast.add({
        id: error.url,
        title: error.message,
      })

      return
    }
  }

  /**
   * 在请求过程中设置请求头的回调函数。
   *
   * @param {FetchContext} context - 请求的上下文对象，包含请求的选项和其他信息。
   *
   * 如果当前用户已登录，则在请求头中添加 `Authorization` 字段，值为当前用户的令牌。
   */
  const onRequest = (context: FetchContext) => {
    const { currentUser } = useCurrentUser()

    if (currentUser.value) {
      context.options.headers = new Headers({
        Authorization: `Bearer ${currentUser.value.token}`,
      })
    }

    const socketId = useState<string>('socketId')

    if (socketId.value) {
      context.options.headers.append('x-socket-id', socketId.value)
    }
  }

  return { onResponseError, onRequest }
}
