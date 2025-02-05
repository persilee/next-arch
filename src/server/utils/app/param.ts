import type { H3Event } from 'h3'
import { parseQuery } from './parse'
import { paginationParam } from '~/schema/app/param'

export const getPagination = (event: H3Event) => {
  const {
    pagination: { page, pageSize },
  } = parseQuery(event, paginationParam)

  const start = page === 1 ? 0 : (page - 1) * pageSize

  return { page, pageSize, start, limit: pageSize }
}
