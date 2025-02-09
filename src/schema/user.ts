import { z } from 'zod'
import { record } from './common'
import { item as role } from '~/schema/role'

const kind = z.enum(['User']).default('User')
const id = record('user')
const name = z.string()
const password = z.string().optional()
const email = z.string().email().optional()
const mobile = z.string().max(11).optional()
const roles = z.union([z.array(record('role')), z.array(role)]).optional()

export const item = z.object({
  kind,
  id,
  name,
  password,
  email,
  mobile,
  roles,
})

export type Item = z.infer<typeof item>

export const list = z.array(item)
export type List = z.infer<typeof list>

export const row = z.object({
  id,
  name,
  password,
  email,
  mobile,
  roles,
})
