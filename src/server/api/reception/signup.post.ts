import { signupInput } from '~/schema/reception'
import { row } from '~/schema/user'
import { signToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, signupInput.parseAsync)
  try {
    const [result] = await db.create('user', body)
    const parsed = row.parse(result)

    const token = signToken(parsed)

    return {
      id: parsed.id,
      name: parsed.name,
      token,
    }
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: '👻 注册失败',
    })
  }
})
