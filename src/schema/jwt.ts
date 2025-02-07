import { z } from 'zod'
import { record, tableId } from './common'

const config = useRuntimeConfig()

/**
 * 定义一个 JWT token 对象的模式。
 *
 * @constant
 * @type {z.ZodObject}
 *
 * @property {z.ZodString} NS - 命名空间，默认为 config.surreal.namespace。
 * @property {z.ZodString} DB - 数据库，默认为 config.surreal.database。
 * @property {z.ZodString} SC - 作用域，默认为 config.surreal.scope。
 * @property {z.ZodString} TK - 令牌名称，默认为 config.surreal.tokenName。
 * @property {z.ZodString} ID - 用户 ID。
 * @property {z.ZodString} name - 用户名。
 * @property {z.ZodString} iss - 签发者。
 * @property {z.ZodNumber} [iat] - 签发时间，可选。
 * @property {z.ZodNumber} [exp] - 过期时间，可选。
 */
export const token = z.object({
  NS: z.string().default(config.surreal.namespace),
  DB: z.string().default(config.surreal.database),
  SC: z.string().default(config.surreal.scope),
  TK: z.string().default(config.surreal.tokenName),
  ID: z.string(),
  name: z.string(),
  iss: z.string().optional(),
  iat: z.number().optional(),
  exp: z.number().optional(),
})

export type Token = z.infer<typeof token>
