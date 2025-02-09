import { z } from 'zod'
import { record } from './common'

const kind = z.enum(['Startup']).default('Startup')
const id = record('user')
const name = z.string()
const avatar = z.string()
const oneline = z.string()
const description = z.string()
const industry = z.string()
const teamSize = z.number().nullable()
const isTopValuation = z.boolean()
const isTopRevenue = z.boolean()
const tags = z.array(z.string())

export const item = z.object({
  kind,
  id,
  name,
  avatar,
  oneline,
  description,
  industry,
  teamSize,
  isTopRevenue,
  isTopValuation,
  tags,
})

export type Item = z.infer<typeof item>

export const list = z.array(item)
export type List = z.infer<typeof list>

export const create = z.object({
  name,
  oneline,
  teamSize: teamSize.optional(),
})
