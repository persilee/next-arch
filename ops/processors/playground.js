export default async (job) => {
  await job.updateProgress(0)

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  delay(3600)

  const endTime = Date.now() + 3000
  while (Date.now() < endTime) {
    console.log('👨‍🔧')
  }

  console.log(
    'worker 1:',
    `你好${job.data.user.name}, ${job.data.content}`,
    new Date().toLocaleDateString(),
  )
  await job.updateProgress(100)
  return '👍'
}
