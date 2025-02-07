import { isServerApi } from '../utils/app/common'

export default defineEventHandler(async (event) => {
  if (!isServerApi(event)) return

  authGuard(event, ['/api/console/**'])
})
