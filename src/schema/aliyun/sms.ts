import { z } from 'zod'
import { phoneNumber } from '../app/common'

const phoneNumbers = phoneNumber
const signName = z.string().optional()
const templateCode = z.string().optional()
const templateParam = z
  .object({
    code: z.string().optional(),
  })
  .optional()
  .transform((value) => JSON.stringify(value))

export const sendSmsInput = z.object({
  phoneNumbers,
  signName,
  templateCode,
  templateParam,
})
