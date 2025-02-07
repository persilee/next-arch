import { token, Token } from '~/schema/jwt'
import jwt, { type Algorithm } from 'jsonwebtoken'
import type { StringValue } from 'ms'
import { H3Event } from 'h3'

const config = useRuntimeConfig()

export const jwtPublicKey = Buffer.from(config.jwt.publicKey, 'base64')
export const jwtPrivateKey = Buffer.from(config.jwt.privateKey, 'base64')

/**
 * 异步生成 JWT 签名令牌。
 *
 * @param user - 包含用户 ID 和名称的对象。
 * @returns 返回生成的 JWT 签名令牌。
 */
export const signToken = (user: { id: string; name: string }) => {
  const data: Partial<Token> = {
    ID: user.id.toString(),
    name: user.name,
  }

  const payload = token.parse(data)

  const result = jwt.sign(payload, jwtPrivateKey, {
    algorithm: config.jwt.algorithm as Algorithm,
    expiresIn: config.jwt.expiresIn as StringValue,
  })

  return result
}

/**
 * 从 H3 事件中获取 JWT 令牌。
 *
 * @param {H3Event} event - H3 事件对象。
 * @returns {string | null} 如果存在 Authorization 头，则返回去掉 'Bearer ' 前缀的令牌，否则返回 null。
 */
export const getToken = (event: H3Event) => {
  const authHeader = getRequestHeader(event, 'Authorization')

  return authHeader ? authHeader.replace('Bearer ', '') : null
}

/**
 * 验证 JWT 令牌。
 *
 * @param data - 要验证的 JWT 令牌字符串。
 * @returns 验证后的结果。
 */
export const verifyToken = (data: string) => {
  const result = jwt.verify(data, jwtPublicKey, {
    algorithms: [config.jwt.algorithm as Algorithm],
  })

  return result
}
