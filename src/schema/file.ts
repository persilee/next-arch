import { z } from 'zod'
import { record } from './common'

const id = record('file')
const uid = z.string()
const type = z.enum(['image/png', 'image/jpeg'] as const)
const filename = z.string()
const size = z.number()

export const createInput = z.object({
  uid,
  type,
  filename,
  size,
})

export const row = z.object({
  id,
  uid,
  type,
  filename,
  size,
})

export type Row = z.infer<typeof row>

export const item = z.object({
  id,
  uid,
  type,
  filename,
  size,
})

export type Item = z.infer<typeof item>

export const params = z.object({
  id: z.string().transform((value) => `file:${value}`),
})
