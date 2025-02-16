import fs from 'node:fs/promises'
import path from 'node:path'

export default async (job) => {
  const {
    items,
    meta: { uid, directory },
  } = job.data

  const filePath = path.join(directory, uid)
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
        break
      case 'format':
        break
      case 'resize':
        break
      default:
        break
    }
  }

  return '🌝'
}
