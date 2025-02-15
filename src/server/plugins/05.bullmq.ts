import { playgroundQueueEvents, playgroundSandboxWorker } from '../utils/bullmq'
import { verificationWorker } from '../utils/verification'

export default defineEventHandler(async (event) => {
  // playgroundWorker.run()
  // playgroundSandboxWorker.run()
  rollerCoasterWorker.run()
  rollerCoasterPrepareWorker.run()

  verificationWorker.run()

  playgroundQueue.on('waiting', (job) => {
    console.log('⌛️ 已监听等待队列', job.data)
  })

  playgroundWorker.on('completed', (job, result, prev) => {
    console.log('👷‍♂️ 监听到 worker 任务已完成', job.data, result, prev)
  })

  playgroundQueueEvents.on('progress', ({ jobId, data }, eventId) => {
    console.log('任务完成进度：', eventId, `任务${jobId}完成了${data}%`)
  })
})
