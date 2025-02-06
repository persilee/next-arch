import type { FetchContext, FetchResponse } from 'ofetch'

export const useFetchInterceptor = (options = { showError: true }) => {
  const { showError } = options

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

  return { onResponseError }
}
