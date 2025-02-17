import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { z } from 'zod'
import exifReader from 'exif-reader'

/**
 * 从图像数据中提取元数据和EXIF信息。
 *
 * @param {Object} data - 包含图像信息的对象。
 * @param {string} [data.format] - 图像格式（可选）。
 * @param {number} [data.width] - 图像宽度（可选）。
 * @param {number} [data.height] - 图像高度（可选）。
 * @param {Object} [data.exif] - 图像的EXIF数据（可选）。
 * @returns {Object|null} 提取的元数据和EXIF信息，如果没有提取到任何信息则返回null。
 */
const extract = (data) => {
  let result = {}
  const metadata = z.object({
    format: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })

  try {
    result = metadata.parse(data)

    if (data.exif) {
      const parsed = exifReader(data.exif)
      result = {
        ...result,
        exif: parsed,
      }
    }
  } catch (error) {
    console.error(error)
  }

  return Object.keys(result).length ? result : null
}

/**
 * 格式化图像文件
 *
 * @param {Object} item - 包含图像处理参数的对象
 * @param {string} item.params - 图像格式参数，例如 'webp'
 * @param {string} base - 基础路径
 * @param {string} filePath - 原始图像文件路径
 * @returns {Promise<Array<Object>>} 返回包含处理结果的数组
 * @throws {Error} 如果创建目录失败或其他文件系统错误
 */
const format = async (item, base, filePath) => {
  const result = []

  const formatBase = path.join(base, item.params)

  const formatFilePath = path.join(formatBase, 'os')

  try {
    await fs.access(formatBase)
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fs.mkdir(formatBase, { recursive: true })
      } catch (error) {
        console.error('创建目录失败', formatBase, error)
      }
    }
  }

  if (item.params === 'webp') {
    const info = await sharp(filePath).webp().toFile(formatFilePath)
    result.push({ name: 'os', ...info })
  }

  return result
}

/**
 * 处理图像任务的异步函数
 *
 * @param {Object} job - 包含任务数据的对象
 * @param {Object[]} job.data.items - 要处理的项目数组
 * @param {Object} job.data.meta - 元数据对象
 * @param {string} job.data.meta.uid - 图像的唯一标识符
 * @param {string} job.data.meta.directory - 图像所在的目录路径
 *
 * @returns {Promise<Object>} 包含提取结果的对象
 */
export default async (job) => {
  const {
    items,
    meta: { uid, directory },
  } = job.data

  let extractResult
  let derivedResult = []
  const filePath = path.join(directory, uid)
  const metadata = await sharp(filePath).metadata()

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
        const formatResult = await format(item, base, filePath)
        derivedResult.push(...formatResult)
        break
      case 'resize':
        break
      default:
        break
    }
  }

  return { extract: extractResult, derived: derivedResult }
}
