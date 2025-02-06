import { z } from 'zod'
import { item, type Item } from '~/schema/user'

/**
 * 读取用户数据并验证其符合指定的 Zod 模式。
 *
 * @template T - Zod 模式的类型。
 * @param {Record<string, any>} data - 用户数据对象。
 * @param {'AND' | 'OR'} connector - 连接条件，用于组合多个验证规则。
 * @param {T} schema - 用于验证用户数据的 Zod 模式。
 * @returns {Promise<z.infer<T>>} 返回一个 Promise，解析为符合指定 Zod 模式的用户数据。
 */
export async function readUser<T extends z.ZodTypeAny>(
  data: Record<string, any>,
  connector: 'AND' | 'OR',
  schema: T,
): Promise<z.infer<T>>

/**
 * 读取用户信息。
 *
 * @param data - 包含用户信息的记录对象。
 * @param connector - 连接符，可以是 'AND' 或 'OR'。
 * @returns 返回一个包含用户信息的 Promise 对象。
 */
export async function readUser(
  data: Record<string, any>,
  connector?: 'AND' | 'OR',
): Promise<Item>

/**
 * 读取用户数据。
 *
 * @param data - 包含查询条件的对象。
 * @param connector - 条件连接符，默认为 'AND'，可以是 'AND' 或 'OR'。
 * @param schema - 用于解析结果的 Zod 模式，默认为 `item`。
 * @returns 如果找到匹配的用户数据，返回解析后的用户数据，否则返回 null。
 */
export async function readUser(
  data: Record<string, any>,
  connector: 'AND' | 'OR' = 'AND',
  schema: z.ZodTypeAny = item,
) {
  const statementParams: Record<string, any> = {}
  const conditions = Object.entries(data)
    .map(([key, value]) => {
      // 将键值对存储到 statementParams 对象中
      statementParams[key] = value
      // 返回格式化的字符串
      return `${key} == $${key}`
    })
    // 用 connector 连接所有生成的字符串
    .join(` ${connector}`)

  const statement = /* surql */ `
    SELECT * FROM user WHERE ${conditions};
  `

  const [result] = await db.query<Item[][]>(statement, statementParams)

  return result && result.length ? schema.parse(result[0]) : null
}
