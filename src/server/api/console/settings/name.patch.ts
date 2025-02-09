import { forbiddenError } from '~/server/utils/app/error'
import { abilityGuard } from '~/server/utils/guard'

export default defineEventHandler(async (event) => {
  const { user } = event.context

  abilityGuard(event, { action: 'update', subject: user, field: 'name' })

  return {
    message: '成功更新了用户名',
  }
})
