import * as argon2 from 'argon2'

/**
 * 创建一个哈希值。
 *
 * @param text - 要哈希的文本字符串。
 * @returns 返回生成的哈希值。
 */
export const createHash = async (text: string) => {
  return await argon2.hash(`${text}`)
}

/**
 * 异步比较哈希值和文本。
 *
 * @param hash - 要比较的哈希值。
 * @param text - 要比较的文本。
 * @returns 如果哈希值和文本匹配，则返回 `true`，否则返回 `false`。
 */
export const compareHash = async (hash: string, text: string) => {
  return await argon2.verify(hash, text)
}
