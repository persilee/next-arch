import { z } from 'zod'

const config = useRuntimeConfig()

/**
 * 定义分页参数的模式。
 *
 * @constant
 * @type {z.ZodObject}
 *
 * @property {Object} pagination - 分页参数对象。
 * @property {number|string} pagination.page - 当前页码，可以是数字或字符串，默认为 1。值会被转换为正整数。
 * @property {number|string} pagination.pageSize - 每页数据量，可以是数字或字符串，默认为配置中的 pageSize。值会被转换为正整数，并且不能超过 1000。
 *
 * @default { page: 1, pageSize: config.api.pageSize }
 */
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

/**
 * 排序
 */
const SORT_ORDER = ['asc', 'desc'] as const
const SORT_RULE = ['collate', 'numeric'] as const

export const sortItem = z.object({
  field: z.string().min(1).max(60),
  order: z
    .enum(SORT_ORDER)
    .optional()
    .default('desc')
    .transform((value) => value?.toUpperCase()),
  rule: z
    .enum(SORT_RULE)
    .optional()
    .transform((value) => value?.toUpperCase()),
})

export const sortParam = z.object({
  sort: z.union([z.array(sortItem), sortItem]).optional(),
})
