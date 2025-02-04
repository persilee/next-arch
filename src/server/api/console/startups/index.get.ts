import { list } from '~/schema/startup'
import { executeQuery } from '~/server/utils/surreal'

export default defineEventHandler(async (event) => {
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
