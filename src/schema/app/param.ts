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
 * 定义排序枚举
 */
const SORT_ORDER = ['asc', 'desc'] as const
const SORT_RULE = ['collate', 'numeric'] as const

/**
 * 定义一个排序数据模式。
 *
 * @property {string} field - 排序字段，长度在1到60之间。
 * @property {('ASC' | 'DESC')} [order='DESC'] - 排序顺序，可选，默认为 'DESC'，并转换为大写。
 * @property {('RULE1' | 'RULE2' | 'RULE3')} [rule] - 排序规则，可选，并转换为大写。
 */
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

/**
 * @constant {string[]} OPERATORS
 * @description 用于 SurrealDB 的操作符数组。
 * 参考网址: {@link https://surrealdb.com/docs/surrealql/operators#containsnone}
 */
const OPERATORS: [string, ...string[]] = [
  '=', // 是否相当
  '!=', // IS NOT 是否不想等
  '==', // 是否绝对相当
  '~', // 用于模糊匹配，检查两个值是否相等，实例： SELECT * FROM "test text" ~ "Test"; 结果：true
  '!~', // 使用模糊匹配，检查两个值不相等。
  '<', // 小于
  '<=', // 小于等于
  '>', // 大于
  '>=', // 大于等于
  '∋', // CONTAINS, 检查一个值是否包含另一个值。实例：SELECT * FROM [10, 20, 30] CONTAINS 10; 结果： true
  '∌', // CONTAINSNOT，检查一个值是否不包含另一个值。实例：SELECT * FROM [10, 20, 30] CONTAINSNOT 15; 结果：true
  '⊇', // CONTAINSALL， 检查一个值是否包含所有多个值。实例：SELECT * FROM [10, 20, 30] CONTAINSALL [10, 20, 10]; 结果： true
  '⊃', // CONTAINSANY，检查一个值是否包含多个值中的任何一个。实例： SELECT * FROM [10, 20, 30] CONTAINSANY [10, 15, 25];结果：true
  '⊅', // CONTAINSNONE，检查一个值是否不包含以下值。
  '∈', // INSIDE or IN， 检查一个值是否包含在另一个值中。实例：SELECT * FROM "text" INSIDE "this is some text"; 结果：true
  '∉', // NOTINSIDE or NOT IN，检查一个值是否不包含在另一个值中。
  '⊆', // ALLINSIDE，检查是否所有多个值都包含在另一个值中。
  '⊂', // ANYINSIDE，检查多个值中的任何一个是否包含在另一个值中。
  '⊄', // NONEINSIDE，检查多个值中是否没有一个包含在另一个值中。
]

export const filterOperator = z.enum(OPERATORS)

export const filterItem = z.record(z.string(), z.any())

export const filterParam = z.object({
  filter: filterItem.optional(),
})
