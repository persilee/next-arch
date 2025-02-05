import { list } from '~/schema/startup'
import { executeQuery } from '~/server/utils/surreal'
import { parseQuery } from '~/server/utils/app/parse'
import { getFilter, getPagination, getSort } from '~/server/utils/app/param'

export default defineEventHandler(async (event) => {
  // 解析查询参数
  const queryParams = parseQuery(event)
  console.info('queryParams:', queryParams)

  // 获取分页数据
  const { limit, start } = getPagination(event)

  // 排序
  const { orderBy } = getSort(event)
  console.info('orderBy:', orderBy)

  // 过滤查询结果
  const { where } = getFilter(event)
  console.info('where:', where)

  // 数据库查询语句
  const statement = /* surql */ `
    SELECT * FROM startup ${where} ${orderBy} LIMIT $limit START $start;
  `
  console.info('查询语句：', statement)

  // 数据库查询语句参数
  const statementParams = {
    limit,
    start,
  }

  // 执行查询语句
  const result = executeQuery(statement, statementParams, list)

  return result
})
