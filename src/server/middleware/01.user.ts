import { Token } from '~/schema/jwt'
import { isServerApi } from '../utils/app/common'
import { getToken, verifyToken } from '../utils/jwt'
import { item } from '~/schema/user'

export default defineEventHandler(async (event) => {
  if (!isServerApi(event)) return

  const token = getToken(event)
  if (!token) return

  let payload: any

  event.context.token = {}

  try {
    payload = verifyToken(token)
    event.context.token.payload = payload
  } catch (error) {
    event.context.token.error = error as any
    console.error(error)
  }

  if (!payload) return

  try {
    const user = await readUser(
      { name: payload.name },
      'AND',
      item.omit({ password: true }),
    )

    event.context.user = user
    console.log(user)
  } catch (error) {}

  console.info(payload)
  console.log('user middleware ')
})
