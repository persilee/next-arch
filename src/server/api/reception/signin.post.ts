import { signinInput } from '~/schema/reception'
import { signToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, signinInput.parseAsync)
  const token = signToken(body.user)

  setCookie(event, 'token', token, { httpOnly: true })

  return {
    id: body.user.id,
    name: body.user.name,
    token,
  }
})
