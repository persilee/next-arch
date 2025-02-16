import { Queue, Worker } from 'bullmq'
import fs from 'node:fs/promises'
import path from 'node:path'
import { processor } from './bullmq'
import { imageType } from '~/schema/app/common'

const { fileSystem } = useRuntimeConfig()

/**
 * 基于文件系统目录解析路径。
 *
 * @constant
 * @type {string}
 */
export const fileSystemBase = path.resolve(fileSystem.directory)

/**
 * @constant {string} fileSystemDerived - 由 fileSystemBase 路径解析而来的派生路径。
 */
export const fileSystemDerived = path.resolve(fileSystemBase, 'derived')

/**
 * @constant {string} fileSystemTmp - 解析并返回 fileSystemBase 路径下的 'tmp' 目录的绝对路径。
 */
export const fileSystemTmp = path.resolve(fileSystemBase, 'tmp')

/**
 * 异步创建目录，如果目录不存在则创建。
 *
 * @param {string} directory - 要创建的目录路径。
 * @returns {Promise<void>} - 一个 Promise，表示目录创建操作的完成。
 *
 * @example
 * ```typescript
 * await mkdir('/path/to/directory');
 * ```
 *
 * @throws {Error} 如果目录创建失败，则抛出错误。
 */
export const mkdir = async (directory: string) => {
  try {
    return await fs.access(directory)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      try {
        await fs.mkdir(directory, { recursive: true })

        console.log('📁 创建目录成功', directory)
      } catch (error) {
        console.log('❌ 创建目录失败', directory, error)
      }
    }
  }
}

export const imageProcessQueue = new Queue('imageProcess', {
  connection: redisConnection,
})

export const imageProcessWorker = new Worker('imageProcess', processor('image'), {
  connection: redisConnection,
  useWorkerThreads: true,
  autorun: false,
})

/**
 * 处理文件的函数，根据文件类型决定处理方式。
 *
 * @param fileType - 文件类型的字符串。
 * @param id - 文件的唯一标识符。
 * @param uid - 用户的唯一标识符。
 * @param directory - 文件所在的目录路径。
 * @returns 如果文件类型是图片，则返回一个添加到图像处理队列的任务。
 */
export const fileProcessor = (
  fileType: string,
  id: string,
  uid: string,
  directory: string,
) => {
  const { success: isImage } = imageType.safeParse(fileType)

  if (isImage) {
    return imageProcessQueue.add('imageProcess', {
      items: [
        {
          action: 'extract',
        },
        {
          action: 'format',
          params: 'webp',
        },
        {
          action: 'resize',
          format: 'webp',
          params: 'all',
        },
        {
          action: 'resize',
          params: 'all',
        },
      ],
      meta: { id, uid, directory },
    })
  }
}
