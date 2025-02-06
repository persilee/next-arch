import { signinInput } from '~/schema/reception'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, signinInput.parseAsync)

  return '登录成功'
})
