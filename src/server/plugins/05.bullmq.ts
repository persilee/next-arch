import { StringRecordId } from 'surrealdb'
import { playgroundQueueEvents, playgroundSandboxWorker } from '../utils/bullmq'
import { imageProcessWorker } from '../utils/file'
import { verificationWorker } from '../utils/verification'
import { extractResult } from '~/schema/file'

export default defineEventHandler(async (event) => {
  // playgroundWorker.run()
  // playgroundSandboxWorker.run()
  // rollerCoasterWorker.run()
  // rollerCoasterPrepareWorker.run()
  // verificationWorker.run()
  imageProcessWorker.run()

  imageProcessWorker.on('completed', async (job, result, prev) => {
    const { extract, derived } = result || {}
    const { id } = job.data.meta

    if (extract) {
      const parsed = extractResult.parse(extract)
      await db.merge(new StringRecordId(id), { extract: parsed })
    }

    if (derived) {
      await db.merge(new StringRecordId(id), { derived })
    }
    console.log('image 任务已完成')
  })

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
