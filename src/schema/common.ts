import { Table } from 'surrealdb'
import { z } from 'zod'

/**
 * 创建一个自定义验证器，用于验证字符串是否符合特定表的记录格式。
 *
 * @template Table - 表名的类型，默认为字符串类型。
 * @param {Table} [table] - 可选的表名，用于验证字符串是否以该表名开头。
 * @returns {ZodType<`${Table}:${string}`>} - 返回一个 Zod 自定义验证器，用于验证字符串是否符合 `${Table}:${string}` 格式。
 *
 * @example
 * ```typescript
 * const userRecord = record('user');
 * userRecord.parse('user:123'); // 验证通过
 * userRecord.parse('order:123'); // 验证失败
 * ```
 */
export const record = <Table extends string = string>(table?: Table) => {
  return z.custom<`${Table}:${string}`>(
    (value) => {
      return typeof value === 'string' && table ? value.startsWith(`${table}:`) : true
    },
    {
      message: `必须是有效的 ${table ? table : 'table'} 数据记录`,
    },
  )
}
