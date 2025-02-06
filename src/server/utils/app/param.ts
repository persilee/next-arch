import type { H3Event } from 'h3'
import { parseQuery } from './parse'
import {
  filterOperator,
  filterParam,
  paginationParam,
  sortParam,
} from '~/schema/app/param'
import { forEach, isArray, isString } from 'lodash-es'
import { item } from '~/schema/startup'

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

// 判断是否是 or 操作符
const isOr = (value: string) => {
  return value === '$or'
}

/**
 * 将给定的数据数组连接成一个包含 OR 条件的字符串。
 *
 * @param {Array<any>} data - 要处理的数据数组。
 * @returns {string} 包含 OR 条件的字符串。
 */
const connectWithOr = (data: Array<any>) => {
  const items: Array<string> = []

  data.forEach((item) => {
    const [[k1, v1]] = Object.entries(item)
    const [[k2, v2]] = Object.entries(v1 as any)

    if (isOperator(k2)) {
      items.push(`${k1} ${k2} ${v2}`)
    }
  })

  const conditions = items.length > 1 ? `(${items.join(' OR ')})` : items.join('')

  return conditions
}

/**
 * 从事件中解析过滤器并生成 SQL 查询条件。
 *
 * @param {H3Event} event - H3 事件对象。
 * @returns {Object} 包含 SQL 查询条件的对象。
 * @returns {string} return.where - SQL 查询的 WHERE 子句。
 * @returns {string} return.conditions - 过滤条件的字符串表示。
 * @returns {Object} return.filter - 解析后的过滤器对象。
 */
export const getFilter = (event: H3Event) => {
  const { filter } = parseQuery(event, filterParam)

  if (!filter) {
    return { where: '', conditions: '', filter }
  }

  const items: Array<string> = []

  forEach(filter, (v1, k1) => {
    if (isOr(k1) && isArray(v1)) {
      const item = connectWithOr(v1)

      return items.push(item)
    }

    forEach(v1, (v2, k2) => {
      if (!isOperator(k1) && isOperator(k2) && isString(v2)) {
        const item = `${k1} ${k2} ${v2}`
        items.push(item)
      }

      if (!isOperator(k1) && isOperator(k2) && isArray(v2)) {
        const item = `${k1} ${k2} [${v2.join(', ')}]`
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
