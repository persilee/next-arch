import fs from 'node:fs/promises'
import path from 'node:path'
import { createInput, type Row } from '~/schema/file'

export default defineEventHandler(async (event) => {
  const { fileSystem } = useRuntimeConfig()

  const data = await readMultipartFormData(event)
  const file = data?.find((item) => item.name === 'file')
  if (!file) return

  try {
    const uid = await guid()
    const parsed = createInput.parse({
      uid,
      type: file.type,
      filename: file.filename,
      size: file.data.length,
    })
    await fs.writeFile(path.resolve(fileSystem.directory, uid), file.data)
    const [result] = await db.create('file', parsed)

    return result
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: '文件上传失败',
      data: error,
    })
  }
})
