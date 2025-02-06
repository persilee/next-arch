import { z } from 'zod'
import { createHash } from '~/server/utils/app/hash'

const name = z
  .string({ required_error: '请提供用户名' })
  .min(1, { message: '请提供用户名' })
  .max(36, { message: '用户名的长度不能超过 36 位' })
  .trim()

const password = z
  .string({ required_error: '请提供用户名' })
  .min(6, { message: '密码长度至少是 6 位' })
  .max(36, { message: '密码长度不能超过 36 位' })
  .trim()

export const signupInput = z.object(
  {
    name,
    password: password.transform((value) => createHash(value)),
  },
  { required_error: '请提供注册数据' },
)
