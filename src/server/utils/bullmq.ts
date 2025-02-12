import { Queue } from 'bullmq'
import { redisConnection } from './redis'

export const playgroundQueue = new Queue('playground', { connection: redisConnection })
