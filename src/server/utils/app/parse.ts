import qs from 'qs'
import { z } from 'zod'
import type { H3Event } from 'h3'

/**
 * 解析查询参数并根据可选的 Zod 模式进行验证。
 *
 * @template ZodSchema - Zod 模式的类型。
 * @param {H3Event} event - H3 事件对象。
 * @param {ZodSchema} [schema] - 可选的 Zod 模式，用于验证解析后的数据。
 * @returns {z.infer<ZodSchema>} - 解析并验证后的查询参数数据。
 * @throws {Error} - 如果验证失败，抛出包含状态码 422 和错误信息的错误对象。
 */
export const parseQuery = <ZodSchema extends z.ZodTypeAny>(
  event: H3Event,
  schema?: ZodSchema,
): z.infer<ZodSchema> => {
  const data = qs.parse(getQuery(event) as any)

  try {
    return schema ? schema.parse(data) : data
  } catch (error) {
    throw createError({
      statusCode: 422,
      message: '🍃 查询参数解析失败',
      data: error,
    })
  }
}
