import fs from 'node:fs/promises'
import path from 'node:path'
import { StringRecordId } from 'surrealdb'
import { params, row, type Row } from '~/schema/file'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, params.parse)
  const result = await db.select<Row>(new StringRecordId(id))

  if (!result) {
    throw createError({ statusCode: 404 })
  }

  abilityGuard(event, { action: 'delete', subject: row.parse(result) })

  const { uid } = result
  const filePath = path.join(fileSystemBase, uid)
  const fileDerived = path.join(fileSystemBase, 'derived', uid)

  try {
    // 删除文件
    await fs.access(filePath, fs.constants.F_OK)
    await fs.unlink(filePath)
    // 删除目录
    await fs.access(fileDerived, fs.constants.F_OK)
    await fs.rm(fileDerived, { recursive: true })
    // 删除数据
    const delRow = await db.delete(new StringRecordId(id))
    if (!delRow) {
      throw createError({ statusCode: 404, message: '删除数据失败' })
    }
    return { id }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: '删除失败~',
    })
  }
})
