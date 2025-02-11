export default defineEventHandler(async (event) => {
  abilityGuard(event, { action: 'execute', subject: 'Job' })

  const name = getRouterParam(event, 'name')

  bree.stop(name)

  return getJobs(name)
})
