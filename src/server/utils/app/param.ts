import type { H3Event } from 'h3'
import { parseQuery } from './parse'
import { paginationParam, sortParam } from '~/schema/app/param'

/**
 * 获取分页信息
 *
 * @param {H3Event} event - H3 事件对象
 * @returns {{ page: number, pageSize: number, start: number, limit: number }} 分页信息对象
 * 包含当前页码、每页大小、起始位置和限制大小
 */
export const getPagination = (event: H3Event) => {
  const {
    pagination: { page, pageSize },
  } = parseQuery(event, paginationParam)

  const start = page === 1 ? 0 : (page - 1) * pageSize

  return { page, pageSize, start, limit: pageSize }
}

/**
 * 获取排序参数。
 *
 * @param {H3Event} event - H3 事件对象。
 * @returns {{ orderBy: string, sort: any }} 包含排序字符串和排序参数的对象。
 *
 * @example
 * // 返回值示例
 * {
 *   orderBy: 'ORDER BY name ASC, age DESC',
 *   sort: { name: 'ASC', age: 'DESC' }
 * }
 */
export const getSort = (event: H3Event) => {
  const { sort } = parseQuery(event, sortParam)
  if (!sort) {
    return { orderBy: '', sort }
  }

  let value
  if (Array.isArray(sort)) {
    value = sort.map((item) => Object.values(item).join(' ')).join(', ')
  } else {
    value = Object.values(sort).join(' ')
  }

  return { orderBy: `ORDER BY ${value}`, sort }
}
