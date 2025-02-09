import { subject } from '@casl/ability'

export default defineEventHandler(async (event) => {
  const {
    user,
    ability,
    ability: { rules },
  } = event.context

  const abilities = {
    canManageUser: ability.can('manage', 'User'),
    canDeleteUser: ability.can('delete', 'User'),
    canManageStartup: ability.can('manage', 'Startup'),
    canUpdateUser: ability.can('update', 'User'),
    canUpdateEmail: ability.can('update', 'User', 'email'),
    canUpdatePassword: ability.can('update', 'User', 'password'),
  }

  return { user, rules, abilities }
})
