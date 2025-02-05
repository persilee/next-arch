import { list } from '~/schema/startup'
import { executeQuery } from '~/server/utils/surreal'
import { parseQuery } from '~/server/utils/app/parse'
import { getPagination, getSort } from '~/server/utils/app/param'

export default defineEventHandler(async (event) => {
  // 解析查询参数
  const queryParams = parseQuery(event)
  console.log('queryParams', queryParams)

  // 获取分页数据
  const { limit, start } = getPagination(event)

  // 排序
  const { orderBy } = getSort(event)
  console.log('orderBy', orderBy)

  // 数据库查询语句
  const statement = /* surql */ `
    SELECT * FROM startup ${orderBy} LIMIT $limit START $start;
  `
  // 数据库查询语句参数
  const statementParams = {
    limit,
    start,
  }

  // 执行查询语句
  const result = executeQuery(statement, statementParams, list)

  return result
})
