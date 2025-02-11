import Bree from 'bree'
import path from 'node:path'
import { item } from '~/schema/bree'

const config: Bree.BreeOptions = {
  logger: false,
  root: path.resolve(path.join('ops', 'jobs')),

  workerMessageHandler(message) {
    console.info('🫡 收到子线程消息：', message)
  },
}

export const bree = new Bree(config)

export const getJobs = (name?: string) => {
  const jobs = bree.config.jobs.map((job) => {
    let status = '完成/停止'

    if (bree.timeouts.has(job.name)) {
      status = '⌛️ 等待作业'
    }

    if (bree.intervals.has(job.name)) {
      status = '📆 周期作业'
    }

    if (bree.workers.has(job.name)) {
      status = '👨‍🔧 正在作业'
    }

    return item.parse({ ...job, status })
  })

  return name ? jobs.find((item) => item.name === name) : jobs
}
