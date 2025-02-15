import { Queue, Worker } from 'bullmq'
import { email, phoneNumber } from '~/schema/app/common'
import { sendVerificationCodeSms } from './aliyun/sms'
import { sendVerificationCodeMail } from './aliyun/mail'

/**
 * 检查是否允许重发验证码。
 *
 * 此函数会查询数据库中是否存在指定标识符的验证记录，
 * 并且该记录的创建时间在当前时间的60秒内。
 * 如果存在这样的记录，则返回 `false`，否则返回 `true`。
 *
 * @param identifier - 用于标识验证记录的标识符。
 * @returns 如果允许进行验证操作，则返回 `true`，否则返回 `false`。
 */
export const isAllowVerify = async (identifier: string) => {
  const statement = /* surql */ `
   array::len(
    SELECT created FROM verification
      WHERE identifier = $identifier AND time::now() - created < 60s
      ORDER BY created DESC LIMIT 1
   );
  `
  const statementParams = { identifier }
  const [result] = await db.query<number[]>(statement, statementParams)

  return result ? false : true
}

/**
 * 检查验证码是否有效。
 *
 * @param identifier - 标识符字符串
 * @param verification - 验证码字符串
 * @returns 一个Promise对象，解析为布尔值，表示验证码是否有效
 */
export const compareVerification = async (identifier: string, verification: string) => {
  const statement = /* surql */ `
   array::len(
    SELECT * FROM verification
      WHERE 
        identifier = $identifier
        AND code = $verification
        AND time::now() - created < 5m
      ORDER BY created DESC LIMIT 1
   )
  `
  const statementParams = { identifier, verification }
  const [result] = await db.query<number[]>(statement, statementParams)

  return result ? true : false
}

export const verificationQueue = new Queue('verification', {
  connection: redisConnection,
})

/**
 * 创建一个新的 verificationWorker 实例，用于处理验证任务。
 * 
 * @constant
 * @type {Worker}
 * 
 * @param {string} 'verification' - Worker 的名称。
 * @param {Function} async (job) - 异步函数，用于处理传入的任务。
 * @param {Object} job - 任务对象，包含任务数据。
 * @param {Object} job.data - 任务数据对象。
 * @param {string} job.data.target - 需要验证的目标（手机号或邮箱）。
 * 
 * @param {Object} options - Worker 的配置选项。
 * @param {Object} options.connection - Redis 连接对象。
 * @param {boolean} options.autorun - 是否自动运行 Worker。
 * @param {Object} options.limiter - 任务限制配置。
 * @param {number} options.limiter.max - 每次运行的最大任务数。
 * @param {number} options.limiter.duration - 任务运行的时间间隔（毫秒）。
 * 
 * @description
 * 该 Worker 根据传入的目标（手机号或邮箱）发送相应的验证码。
 * 如果目标是手机号，则发送短信验证码；如果目标是邮箱，则发送邮件验证码。
 * 
 * @example
 * // 创建并运行 verificationWorker
 * verificationWorker.run();
 */
export const verificationWorker = new Worker(
  'verification',
  async (job) => {
    const { target } = job.data
    const { success: isPhoneNumber } = phoneNumber.safeParse(target)
    const { success: isEmail } = email.safeParse(target)

    if (isPhoneNumber) {
      sendVerificationCodeSms(target, '6666')
      console.log('💬 发送短信验证码', target)
    }

    if (isEmail) {
      sendVerificationCodeMail(target, '8888')
      console.log('📧 发送邮件验证码', target)
    }
  },
  {
    connection: redisConnection,
    autorun: false,
    limiter: {
      max: 1,
      duration: 1000,
    },
  },
)
