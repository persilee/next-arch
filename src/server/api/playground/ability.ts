export default defineEventHandler(async (event) => {
  const {
    user,
    ability,
    ability: { rules },
  } = event.context

  const abilities = {
    canManageUser: ability.can('manage', 'User'),
    canDeleteUser: ability.can('delete', 'User'),
  }

  return { user, rules, abilities }
})
