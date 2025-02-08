import glob from 'glob-to-regexp'
import type { H3Event, HTTPMethod } from 'h3'
import { unauthorizedError } from './app/error'
import { RoleName } from '~/schema/role'
import { item } from '~/schema/startup'

type AuthPath = {
  path: string
  method?: HTTPMethod
}

/**
 * 认证守卫函数，用于检查事件是否符合认证要求。
 *
 * @param event - H3 事件对象。
 * @param data - 一个包含字符串或 AuthPath 对象的数组，用于匹配事件路径和方法。
 *
 * @throws 如果 token 存在错误，抛出未授权错误。
 * @throws 如果用户不存在，抛出未授权错误。
 */
export const authGuard = (event: H3Event, data?: Array<string> | Array<AuthPath>) => {
  if (data && data.length) {
    const result = data.some((item) => {
      if (typeof item === 'string') {
        return glob(item).test(event.path)
      }

      if (typeof item === 'object') {
        const { path, method } = item as AuthPath
        const isMethodMatched = method ? method === event.method : true

        return glob(path).test(event.path) && isMethodMatched
      }
    })

    if (!result) return
  }

  const { token, user } = event.context

  if (token?.error) {
    throw unauthorizedError(token.error.name)
  }

  if (!user) {
    throw unauthorizedError()
  }
}

type Roles = Array<RoleName>
type RolesPath = Array<{ roles: Roles; path: string; method: HTTPMethod }>

/**
 * 检查用户是否具有访问特定路径或执行特定操作的权限。
 *
 * @param event - H3 事件对象，包含请求的上下文信息。
 * @param data - 包含角色或路径和角色的数组。
 *
 * @throws 如果用户没有相应的权限，将抛出 `unauthorizedError` 异常。
 */
export const rolesGuard = (event: H3Event, data: RolesPath | Roles) => {
  const { user } = event.context

  if (typeof data[0] === 'string') {
    const result = data.some((item) => hasRole(user, item as RoleName))

    if (!result) {
      throw unauthorizedError()
    }
  }

  if (typeof data[0] === 'object') {
    ;(data as RolesPath).forEach(({ roles, path, method }) => {
      if (glob(path).test(event.path)) {
        const isMethodMatched = method ? method === event.method : true

        if (!isMethodMatched) return

        const result = roles.some((item) => hasRole(user, item))

        if (!result) {
          throw unauthorizedError()
        }
      }
    })
  }
}
