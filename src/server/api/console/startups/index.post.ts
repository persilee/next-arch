import { create } from '~/schema/startup'
import { isServerApi } from '~/server/utils/app/common'

export default defineEventHandler(async (event) => {
  const result = isServerApi(event)
  console.log(event.context.user)
  console.log(result)
  const body = readValidatedBody(event, create.parse)
  return body
})
