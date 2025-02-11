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

/**
 * 获取作业列表或特定作业的状态信息。
 *
 * @param {string} [name] - 可选参数，指定要获取的作业名称。
 * @returns {Array|Object} 返回作业列表或特定作业的状态信息。
 *
 * 作业状态说明：
 * - '完成/停止'：作业已完成或已停止。
 * - '⌛️ 等待作业'：作业在等待中。
 * - '📆 周期作业'：作业是周期性任务。
 * - '👨‍🔧 正在作业'：作业正在进行中。
 */
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
