import path from 'node:path'
import { Queue, Worker, QueueEvents, FlowProducer, type WorkerOptions } from 'bullmq'
import { redisConnection } from './redis'
import { delay } from './app/common'

const processor = (name: string) => {
  return path.resolve(path.join('ops', 'processors', `${name}.js`))
}

const options: WorkerOptions = {
  connection: redisConnection,
  autorun: false,
  limiter: {
    max: 1,
    duration: 3600,
  },
}

export const playgroundQueue = new Queue('playground', { connection: redisConnection })

export const playgroundWorker = new Worker(
  'playground',
  async (job) => {
    await job.updateProgress(0)

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
  },
  options,
)

export const playgroundSandboxWorker = new Worker('playground', processor('playground'), {
  ...options,
  useWorkerThreads: true,
})

export const playgroundQueueEvents = new QueueEvents('playground', {
  connection: redisConnection,
})

export const rollerCoasterFlow = new FlowProducer({ connection: redisConnection })

export const rollerCoasterQueue = new Queue('rollerCoaster', {
  connection: redisConnection,
})

export const rollerCoasterPrepareQueue = new Queue('rollerCoasterPrepare', {
  connection: redisConnection,
})

export const rollerCoasterPrepareWorker = new Worker(
  'rollerCoasterPrepare',
  async (job) => {
    console.log(`🍷 ${job.data.user.name} 开始准备`)

    await delay(3000)

    const result = `🍷 ${job.data.user.name} 准备完成`

    return result
  },
  options,
)

export const rollerCoasterWorker = new Worker(
  'rollerCoaster',
  async (job) => {
    const values = await job.getChildrenValues()

    console.log(values)

    console.log(`🍷 ${job.data.user.name} 出发～～`)
  },
  options,
)
