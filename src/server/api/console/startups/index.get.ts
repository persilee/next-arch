import { list } from '~/schema/startup'
import { executeQuery } from '~/server/utils/surreal'
import { parseQuery } from '~/server/utils/app/parse'

export default defineEventHandler(async (event) => {
  // 解析查询参数
  const queryParams = parseQuery(event)
  console.log(queryParams)

  // 数据库查询语句
  const statement = /* surql */ `
    SELECT * FROM startup ORDER BY created LIMIT $limit;
  `
  // 数据库查询语句参数
  const statementParams = {
    limit: 60,
  }

  // 执行查询语句
  const result = executeQuery(statement, statementParams, list)

  return result
})
