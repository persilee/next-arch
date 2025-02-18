import { isServerApi } from '../utils/app/common'
import { rolesGuard } from '../utils/guard'

export default defineEventHandler(async (event) => {
  if (!isServerApi(event)) return

  authGuard(event, ['/api/console/**'])

  // rolesGuard(event, [
  //   { roles: ['editor', 'administrator'], path: '/api/console/**', method: 'GET' },
  //   { roles: ['editor'], path: '/api/console/**', method: 'POST' },
  // ])
})
