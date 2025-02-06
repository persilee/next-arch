import { verificationInput } from '~/schema/reception'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, verificationInput.parseAsync)

  return body
})
