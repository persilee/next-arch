import { z, ZodSchema } from 'zod'
import { socketIdAssigned } from '~/schema/ws'

/**
 * 构建一个消息生成器，用于根据给定的 Zod 模式进行数据的构建和解析。
 *
 * @template ZodSchema - Zod 模式类型
 * @param {ZodSchema} schema - 用于验证和解析数据的 Zod 模式
 * @returns {object} 返回一个包含 `build` 和 `parse` 方法的对象
 * @returns {function} build - 根据给定的数据构建一个 JSON 字符串
 * @returns {function} parse - 解析一个 JSON 字符串并验证其数据
 */
export const messageBuilder = <ZodSchema extends z.ZodTypeAny>(schema: ZodSchema) => {
  type S = z.infer<ZodSchema>
  type D = Pick<S['data'], keyof S['data']>

  return {
    build: (data: D) => {
      return JSON.stringify(schema.parse({ data }))
    },

    parse: (data: string): z.infer<ZodSchema> => {
      return schema.parse(JSON.parse(data))
    },
  }
}

export const socketIdAssignedBuilder = messageBuilder(socketIdAssigned)
