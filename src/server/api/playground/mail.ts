import { sendVerificationCodeMail } from '~/server/utils/aliyun/mail'

export default defineEventHandler(async (event) => {
  const { toAddress, code } = await readBody(event)

  await sendVerificationCodeMail(toAddress, code)
  return
})
