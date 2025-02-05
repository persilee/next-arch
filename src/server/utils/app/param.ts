import type { H3Event } from 'h3'
import { parseQuery } from './parse'
import { paginationParam } from '~/schema/app/param'

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
