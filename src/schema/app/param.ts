import { z } from 'zod'

const config = useRuntimeConfig()

export const paginationParam = z.object({
  pagination: z
    .object({
      page: z
        .union([z.number(), z.string()])
        .optional()
        .default(1)
        .transform((value) => Math.abs(parseInt(`${value}`, 10))),
      pageSize: z
        .union([z.number(), z.string()])
        .optional()
        .default(config.api.pageSize)
        .transform((value) => Math.abs(parseInt(`${value}`, 10)))
        .refine((value) => value <= 1000, { message: '每页数据不能超过 1000' }),
    })
    .default({ page: 1, pageSize: config.api.pageSize }),
})
