import Surreal, { NoActiveSocket, SurrealDbError } from 'surrealdb'
import { ZodError, ZodSchema, z } from 'zod'

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
