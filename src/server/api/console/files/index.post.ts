import { fileForm } from '~/server/utils/form'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createInput, type Row } from '~/schema/file'

export default defineEventHandler(async (event) => {
  try {
    const [fields, files] = await fileForm.parse(event.node.req)
    const results = []

    if (files.file) {
      for (const item of files.file) {
        const {
          size,
          filepath,
          newFilename: uid,
          originalFilename: filename,
          mimetype: type,
        } = item

        const newPath = path.join(fileSystemBase, uid)

        await fs.rename(filepath, newPath)

        const parsed = createInput.parse({ uid, type, filename, size })

        const [result] = await db.create('file', parsed)
        results.push(result)

        if (type) {
          await fileProcessor(type, result.id.toString(), uid, fileSystemBase)
        }
      }
    }

    return results
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '无法上传文件',
    })
  }
})
