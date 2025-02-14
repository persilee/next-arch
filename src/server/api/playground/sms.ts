import { sendVerificationCodeSms } from '~/server/utils/aliyun/sms'

export default defineEventHandler(async (event) => {
  const { phoneNumbers, code } = await readBody(event)

  return sendVerificationCodeSms(phoneNumbers, code)
})
