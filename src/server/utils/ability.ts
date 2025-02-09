import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { MongoAbility, ExtractSubjectType } from '@casl/ability'
import { capitalize, get } from 'lodash-es'
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
 * 定义用户的权限。
 *
 * @param user - 用户对象。
 * @returns 构建的权限对象。
 *
 * @remarks
 * 根据用户的角色（标准用户、编辑、管理员）定义不同的权限。
 * - 标准用户可以更新自己的名称、邮箱和手机号码。
 * - 编辑可以管理所有的 Startup。
 * - 管理员可以管理所有内容。
 *
 * @example
 * ```typescript
 * const ability = defineAbilityFor(user);
 * ```
 */
export const defineAbilityFor = (user: Item) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (isStandard(user)) {
    can('update', 'User', ['name', 'email', 'mobile'], { id: { $eq: user.id as any } })
  }

  if (isEditor(user)) {
    can('manage', 'Startup')
  }

  if (isAdministrator(user)) {
    can('manage', 'all')
  }

  return build({
    detectSubjectType(subject) {
      const id: string = get(subject, 'id') ?? ''
      const subjectType = capitalize(id.split(':')[0]) as ExtractSubjectType<Subjects>

      return subjectType
    },
  })
}
