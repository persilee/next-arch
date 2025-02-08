export default defineEventHandler(async (event) => {
  deleteCookie(event, 'token')

  return { message: '成功登出' }
})
