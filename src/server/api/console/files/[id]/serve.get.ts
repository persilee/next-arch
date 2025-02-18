import path from 'node:path'
import fs from 'node:fs'
import { item, params, query } from '~/schema/file'
import { StringRecordId } from 'surrealdb'
import { flattenDeep } from 'lodash-es'

export default defineEventHandler(async (event) => {
  const { fileSystem } = useRuntimeConfig()

  try {
    const { size, format } = await getValidatedQuery(event, query.parse)
    const isDerived = size || format
    const { id } = await getValidatedRouterParams(event, params.parse)
    const result = await db.select(new StringRecordId(id))

    if (!result) return { message: '无此记录' }

    const { uid, type } = item.parse(result)
    const items = flattenDeep([
      fileSystemBase,
      isDerived ? ['derived', uid] : uid,
      format ? [format, size] : size,
    ]).filter((item) => item !== undefined) as Array<string>
    const filePath = path.resolve(...items)
    const stats = await fs.promises.stat(filePath)

    if (!stats.isFile()) {
      throw Error('目标不是文件')
    }

    const readableStream = fs.createReadStream(filePath)

    setResponseHeaders(event, {
      'Content-Type': format ? `image/${format}` : type,
    })

    return sendStream(event, readableStream)
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: '无法提供文件服务',
    })
  }
})
