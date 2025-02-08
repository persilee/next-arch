import { z } from 'zod'
import { record } from './common'

const id = record('role')

const name = z.enum(['administrator', 'editor', 'standard'] as const)

const title = z.string().optional()

export const item = z.object({
  id,
  name,
  title,
})

export type Item = z.infer<typeof item>
export type RoleName = z.infer<typeof name>
