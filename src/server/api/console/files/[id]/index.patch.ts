import path from 'node:path'
import { StringRecordId } from 'surrealdb'
import { params, updateInput, type Row } from '~/schema/file'
import { isJsonContent, isMultipartContent } from '~/server/utils/app/common'
import fs from 'node:fs/promises'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, params.parse)
  const result = await db.select<Row>(new StringRecordId(id))

  if (!result) {
    throw createError({ statusCode: 404 })
  }

  const { uid } = result

  if (isMultipartContent(event)) {
    const [_, files] = await fileForm.parse(event.node.req)

    if (files.file) {
      for (const item of files.file) {
        const { size, filepath, originalFilename: filename, mimetype: type } = item
        const newPath = path.join(fileSystemBase, uid)

        await fs.rename(filepath, newPath)

        const result = await db.merge(new StringRecordId(id), { size, filename, type })

        if (type) {
          await fileProcessor(type, result.id.toString(), uid, fileSystemBase)
        }
      }

      return { id }
    }
  }

  if (isJsonContent(event)) {
    const parsed = await readValidatedBody(event, updateInput.parse)
    await db.merge(new StringRecordId(id), parsed)

    return { id }
  }
})
