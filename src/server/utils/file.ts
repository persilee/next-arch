import fs from 'node:fs/promises'
import path from 'node:path'

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
