export default defineEventHandler(async (event) => {
  const { user } = await readBody(event)

  const result = await playgroundQueue.add('welcome', {
    user,
    content: '👏 欢迎来到黑喵',
  })

  return result
})
