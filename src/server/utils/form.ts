import formidable, { type Options } from 'formidable'
import { type as fileFormAllowedType } from '~/schema/file'
import { z } from 'zod'

export const makeForm = <ZodSchema extends z.ZodTypeAny>(
  name: string,
  schema: ZodSchema,
  maxFileSize: number = 200,
  option?: Options,
) => {
  const form = formidable({
    uploadDir: fileSystemTmp,
    maxFileSize: maxFileSize * 1024 * 1024,
    filter: (part) => {
      const { success: isAllowedType } = schema.safeParse(part.mimetype)
      const isValidName = part.name === name

      if (!(isAllowedType && isValidName)) {
        //@ts-ignore
        form.emit('error', new Error())
      }

      return isAllowedType && isValidName
    },
  })

  return form
}

export const fileForm = makeForm('file', fileFormAllowedType, 3000)
