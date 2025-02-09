import { subject } from '@casl/ability'
import type { Item as User } from '~/schema/user'

export default defineEventHandler(async (event) => {
  const {
    user,
    ability,
    ability: { rules },
  } = event.context

  const other: User = {
    kind: 'User',
    id: 'user: 7912346863',
    name: '王五',
  }

  const self = user

  const abilities = {
    canManageUser: ability.can('manage', 'User'),
    canDeleteUser: ability.can('delete', 'User'),
    canManageStartup: ability.can('manage', 'Startup'),
    canUpdateUser: ability.can('update', 'User'),
    canUpdateEmail: ability.can('update', 'User', 'email'),
    canUpdatePassword: ability.can('update', 'User', 'password'),
    canUpdateOther: ability.can('update', other),
    canUpdateSelf: ability.can('update', self),
  }

  return { user, rules, abilities }
})
