import { z } from 'zod'

const kind = z.enum(['Job']).default('Job')
const name = z.string()
const path = z.string()
const timeout = z.union([z.string(), z.number(), z.boolean()]).optional()
const interval = z
  .union([z.string(), z.number(), z.record(z.string(), z.any())])
  .optional()
const date = z.string().optional()
const cron = z.string().optional()
const timezone = z.string().optional()
const status = z.string().optional()

export const item = z.object({
  kind,
  name,
  path,
  timeout,
  interval,
  date,
  cron,
  timezone,
  status,
})

export type Item = z.infer<typeof item>
