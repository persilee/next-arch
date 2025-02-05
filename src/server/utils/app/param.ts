import type { H3Event } from 'h3'
import { parseQuery } from './parse'
import {
  filterOperator,
  filterParam,
  paginationParam,
  sortParam,
} from '~/schema/app/param'
import { forEach, isString } from 'lodash-es'

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

/**
 * 检查给定的值是否为操作符。
 *
 * @param value - 要检查的字符串值。
 * @returns 如果值是操作符，则返回 true；否则返回 false。
 */
const isOperator = (value: string) => {
  const { success } = filterOperator.safeParse(value)

  return success
}

/**
 * 获取过滤条件。
 *
 * @param {H3Event} event - H3 事件对象。
 * @returns {Object} 返回包含过滤条件的对象。
 * @returns {string} returns.where - SQL WHERE 子句。
 * @returns {string} returns.conditions - 过滤条件字符串。
 * @returns {Object} returns.filter - 解析后的过滤条件对象。
 */
export const getFilter = (event: H3Event) => {
  const { filter } = parseQuery(event, filterParam)

  if (!filter) {
    return { where: '', conditions: '', filter }
  }

  const items: Array<string> = []

  forEach(filter, (v1, k1) => {
    forEach(v1, (v2, k2) => {
      if (!isOperator(k1) && isOperator(k2) && isString(v2)) {
        const item = `${k1} ${k2} ${v2}`
        items.push(item)
      }
    })
  })

  const conditions = items.length ? items.join(' AND ') : ''

  return {
    where: conditions ? `WHERE ${conditions}` : '',
    conditions,
    filter,
  }
}
