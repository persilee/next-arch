const buildError =
  (error: { statusCode: number; statusMessage: string; message: string }) =>
  (statusMessage: string = error.statusMessage, message: string = error.message) => {
    const { statusCode } = error

    return createError({
      statusCode,
      statusMessage,
      message,
    })
  }

export const unauthorizedError = buildError({
  statusCode: 401,
  statusMessage: 'Unauthorized',
  message: '未授权',
})

export const forbiddenError = buildError({
  statusCode: 403,
  statusMessage: 'Forbidden',
  message: '没有权限',
})
