import { token, Token } from '~/schema/jwt'
import jwt, { type Algorithm } from 'jsonwebtoken'
import type { StringValue } from 'ms'

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
