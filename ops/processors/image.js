import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { z } from 'zod'

const extract = (data) => {
  let result = {}
  const metadata = z.object({
    format: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })

  try {
    result = metadata.parse(data)
  } catch (error) {
    console.error(error)
  }

  return Object.keys(result).length ? result : null
}

export default async (job) => {
  const {
    items,
    meta: { uid, directory },
  } = job.data

  let extractResult
  const filePath = path.join(directory, uid)
  const metadata = await sharp(filePath).metadata()
  console.log(metadata)
  if (!metadata) return
  const base = path.resolve(directory, 'derived', uid)

  try {
    await fs.access(base)
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fs.mkdir(base, { recursive: true })
      } catch (error) {
        console.error('创建目录失败', directory, error)
      }
    }
  }

  for (const item of items) {
    switch (item.action) {
      case 'extract':
        extractResult = extract(metadata)
        break
      case 'format':
        break
      case 'resize':
        break
      default:
        break
    }
  }

  return { extract: extractResult }
}
