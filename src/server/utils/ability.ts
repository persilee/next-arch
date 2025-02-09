import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { MongoAbility } from '@casl/ability'
import { build } from 'nuxt'
import type { Item } from '~/schema/user'

/**
 * @typedef {('create' | 'read' | 'update' | 'delete' | 'manage')} Actions
 *
 * 定义了一组可能的操作类型。
 *
 * - `create`: 创建操作
 * - `read`: 读取操作
 * - `update`: 更新操作
 * - `delete`: 删除操作
 * - `manage`: 管理操作
 */
export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage'

/**
 * 定义了一个联合类型 `Subjects`，表示可以是 'User'、'Startup' 或 'all'。
 */
export type Subjects = 'User' | 'Startup' | 'all'

/**
 * 定义应用程序的能力类型。
 *
 * @typedef {MongoAbility<[Actions, Subjects]>} AppAbility
 */
export type AppAbility = MongoAbility<[Actions, Subjects]>

/**
 * 为指定用户定义权限。
 *
 * @param user - 要为其定义权限的用户。
 * @returns 构建的用户权限。
 */
export const defineAbilityFor = (user: Item) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (isAdministrator(user)) {
    can('manage', 'all')
  }

  return build()
}
