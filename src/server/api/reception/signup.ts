import { signupInput } from '~/schema/reception'

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, signupInput.parse)
    const [result] = await db.create('user', body)

    return result
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: '👻 注册失败',
    })
  }
})
