import { z } from 'zod'

const messageName = z.enum(['socketIdAssigned', 'playground'] as const)
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

const socketId = z
  .string()
  .optional()
  .transform((value) => {
    return value ? value : useState('socketId').value
  })

export const socketIdAssigned = buildMessageSchema(
  'socketIdAssigned',
  z.object({ socketId: z.string() }),
)

export const playground = buildMessageSchema(
  'playground',
  z.object({
    socketId,
    content: z.string(),
  }),
)
