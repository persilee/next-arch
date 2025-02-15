export default defineEventHandler(async (event) => {
  const { target } = await readBody(event)

  return verificationQueue.add('verification', { target })
})
