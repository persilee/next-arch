import { isServerApi } from '../utils/app/common'

export default defineEventHandler(async (event) => {
  if (!isServerApi(event)) return

  const ability = defineAbilityFor(event.context.user)
  event.context.ability = ability
})
