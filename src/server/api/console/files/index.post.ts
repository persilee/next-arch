import { fileForm } from '~/server/utils/form'

export default defineEventHandler(async (event) => {
  try {
    const [fields, files] = await fileForm.parse(event.node.req)

    console.log(fields)
    console.log(files)

    return
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '无法上传文件',
    })
  }
})
