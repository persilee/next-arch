import Client, { SendSmsRequest } from '@alicloud/dysmsapi20170525'
import { Config } from '@alicloud/openapi-client'
import { RuntimeOptions } from '@alicloud/tea-util'
import { sendSmsInput } from '~/schema/aliyun/sms'

const {
  aliyun: {
    accessKeyId,
    accessKeySecret,
    sms: { endpoint, verificationCodeTemplate, signName },
  },
} = useRuntimeConfig()

const config = new Config({
  accessKeyId,
  accessKeySecret,
  endpoint,
})

export const aliyunSms: Client = new (Client as any).default(config)

export const sendVerificationCodeSms = async (phoneNumbers: string, code: string) => {
  try {
    const request = new SendSmsRequest(
      sendSmsInput.parse({
        phoneNumbers,
        templateCode: verificationCodeTemplate,
        signName,
        templateParam: {
          code,
        },
      }),
    )

    const runtime = new RuntimeOptions({})

    await aliyunSms.sendSmsWithOptions(request, runtime)
  } catch (error) {}
}
