import { z } from 'zod'

export const phoneNumber = z.string().regex(/^1[3456789]\d{9}$/, '不是有效的手机号')
export const email = z.string().email('不是有效的邮件地址')
