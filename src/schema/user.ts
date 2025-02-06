import { z } from 'zod'
import { record } from './common'

const id = record('user')
const name = z.string()
const password = z.string().optional()
const email = z.string().email().optional()
const mobile = z.string().max(11).optional()

export const item = z.object({
  id,
  name,
  password,
  email,
  mobile,
})

export type Item = z.infer<typeof item>

export const list = z.array(item)
export type List = z.infer<typeof list>
