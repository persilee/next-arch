import Client, { SingleSendMailRequest } from '@alicloud/dm20151123'
import { Config } from '@alicloud/openapi-client'
import { RuntimeOptions } from '@alicloud/tea-util'
import { subject } from '@casl/ability'
import { singleSendMailInput } from '~/schema/aliyun/mail'

const {
  aliyun: {
    accessKeyId,
    accessKeySecret,
    mail: { endpoint, notificationAccountName, fromAlias },
  },
} = useRuntimeConfig()

const config = new Config({
  accessKeyId,
  accessKeySecret,
  endpoint,
})

export const aliyunMail: Client = new (Client as any).default(config)

export const sendVerificationCodeMail = async (toAddress: string, code: string) => {
  try {
    const request = new SingleSendMailRequest(
      singleSendMailInput.parse({
        accountName: notificationAccountName,
        addressType: 1,
        replyToAddress: false,
        toAddress,
        subject: '验证码',
        textBody: `你的验证码是 ${code}， 该验证码 5 分钟内有效，请勿泄露给他人`,
        fromAlias,
      }),
    )

    const runtime = new RuntimeOptions({})

    await aliyunMail.singleSendMailWithOptions(request, runtime)
  } catch (error) {
    console.error(error)
  }
}
