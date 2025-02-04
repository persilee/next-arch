import { z } from 'zod'

const name = z.string()
const avatar = z.string()
const oneline = z.string()
const description = z.string()
const industry = z.string()
const teamSize = z.number().nullable()
const isTopValuation = z.boolean()
const isTopRevenue = z.boolean()

export const item = z.object({
  name,
  avatar,
  oneline,
  description,
  industry,
  teamSize,
  isTopRevenue,
  isTopValuation,
})

export const list = z.array(item)
export type List = z.infer<typeof list>

export const create = z.object({
  name,
  oneline,
  teamSize: teamSize.optional(),
})
