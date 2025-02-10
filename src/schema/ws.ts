import { z } from 'zod'

const messageName = z.enum(['socketIdAssigned'] as const)
export type MessageName = z.infer<typeof messageName>

export const messageBase = z
  .union([z.string(), z.object({ name: messageName, data: z.any() })])
  .transform((value) => {
    if (typeof value === 'string') {
      return z.object({ name: messageName, data: z.any() }).parse(JSON.parse(value))
    }

    return value
  })

const buildMessageSchema = <ZodSchema extends z.ZodTypeAny>(
  name: MessageName,
  schema: ZodSchema,
) => {
  return z.object({
    name: messageName.default(name),
    data: schema,
  })
}

export const socketIdAssigned = buildMessageSchema(
  'socketIdAssigned',
  z.object({ socketId: z.string() }),
)
