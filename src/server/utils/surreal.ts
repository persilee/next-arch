import Surreal, { NoActiveSocket, SurrealDbError } from 'surrealdb'
import { ZodError, ZodSchema, z } from 'zod'
import { H3Event } from 'h3'

const config = useRuntimeConfig()

const { url, namespace, database, rootUser, rootPass } = config.surreal

export const db = new Surreal()

export const dbConnect = async () => {
  // 连接到 SurrealDB 服务器
  await db.connect(url)
  console.log(`🎉 链接服务器成功 status: ${db.status} ns: ${namespace} , db: ${database}`)

  // 选择命名空间和数据库
  await db.use({ namespace, database })

  // 进行身份验证
  await db.signin({
    username: rootUser,
    password: rootPass,
  })
}

/**
 * 对数据库执行查询，并可选择使用Zod进行序列化.
 *
 * @template ZodSchema - The Zod schema type used for validation.
 * @param {string} statement - The SQL statement to be executed.
 * @param {Record<string, any>} [statementParams] - Optional parameters for the SQL statement.
 * @param {ZodSchema} [schema] - Optional Zod schema to validate the result.
 * @returns {Promise<z.infer<ZodSchema>>} - The result of the query, optionally validated by the schema.
 * @throws {Error} - Throws an error if the query fails or if the result validation fails.
 */
export const executeQuery = async <ZodSchema extends z.ZodTypeAny>(
  statement: string,
  statementParams?: Record<string, any>,
  schema?: ZodSchema,
): Promise<z.infer<ZodSchema>> => {
  try {
    // 执行数据库查询语句
    const [result] = await db.query(statement, statementParams)

    // 如果入参有 Zod 数据验证，就返回序列化后的数据，否则返回原数据
    return schema ? schema.parse(result) : result
  } catch (error) {
    if (error instanceof SurrealDbError) {
      console.error('🚨 数据查询失败', error.message)

      throw createError({
        statusCode: 500,
        message: '🚨 数据查询失败',
      })
    }

    if (error instanceof ZodError) {
      console.error('🪤 数据解释失败', JSON.parse(error.message)[0])

      throw createError({
        statusCode: 500,
        message: '🪤 数据解析失败',
      })
    }
  }
}

/**
 * 计算符合条件的表记录数量。
 *
 * @param {string} table - 要查询的表名。
 * @param {string} where - 查询条件。
 * @returns {Promise<number | null>} 返回符合条件的记录数量，如果没有符合条件的记录则返回 null。
 */
export const countQueryResult = async (table: string, where: string) => {
  const statement = /* surql */ `
    SELECT count() FROM ${table} ${where} GROUP ALL;
  `
  const [result] = await executeQuery(statement)

  return result && result.count ? (result.count as number) : null
}

/**
 * 设置 `x-total-count` 头部信息。
 *
 * @param event - H3 事件对象。
 * @param table - 数据库表名。
 * @param where - 查询条件。
 * @returns 一个 Promise，表示头部信息设置操作的完成。
 */
export const setXTotalCountHeader = async (
  event: H3Event,
  table: string,
  where: string,
) => {
  const count = await countQueryResult(table, where)

  if (count) {
    setHeaders(event, {
      'x-total-count': count,
    })
  }
}
