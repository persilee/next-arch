import path from 'node:path'
import fs from 'node:fs'
import { item, params } from '~/schema/file'
import { StringRecordId } from 'surrealdb'

export default defineEventHandler(async (event) => {
  const { fileSystem } = useRuntimeConfig()

  try {
    const { id } = await getValidatedRouterParams(event, params.parse)
    const result = await db.select(new StringRecordId(id))

    if (!result) return { message: '无此记录' }

    const { uid, type } = item.parse(result)
    const filePath = path.resolve(fileSystem.directory, uid)
    const readableStream = fs.createReadStream(filePath)

    setResponseHeaders(event, {
      'Content-Type': type,
    })

    return sendStream(event, readableStream)
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: '无法提供文件服务',
    })
  }
})
