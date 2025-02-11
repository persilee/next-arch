import { getJobs } from '~/server/utils/bree'

export default defineEventHandler(async (event) => {
  abilityGuard(event, { action: 'read', subject: 'Job' })

  const result = getJobs()

  return result
})
