import { z } from 'zod'
import { email } from '../app/common'

const accountName = email
const addressType = z.number()
const replyToAddress = z.boolean()
const toAddress = email
const subject = z.string()
const textBody = z.string().optional()
const fromAlias = z.string()

export const singleSendMailInput = z.object({
  accountName,
  addressType,
  replyToAddress,
  toAddress,
  subject,
  textBody,
  fromAlias,
})
