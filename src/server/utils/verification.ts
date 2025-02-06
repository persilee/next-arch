/**
 * 检查是否允许重发验证码。
 *
 * 此函数会查询数据库中是否存在指定标识符的验证记录，
 * 并且该记录的创建时间在当前时间的60秒内。
 * 如果存在这样的记录，则返回 `false`，否则返回 `true`。
 *
 * @param identifier - 用于标识验证记录的标识符。
 * @returns 如果允许进行验证操作，则返回 `true`，否则返回 `false`。
 */
export const isAllowVerify = async (identifier: string) => {
  const statement = /* surql */ `
   array::len(
    SELECT created FROM verification
      WHERE identifier = $identifier AND time::now() - created < 60s
      ORDER BY created DESC LIMIT 1
   );
  `
  const statementParams = { identifier }
  const [result] = await db.query<number[]>(statement, statementParams)

  return result ? false : true
}

/**
 * 检查验证码是否有效。
 *
 * @param identifier - 标识符字符串
 * @param verification - 验证码字符串
 * @returns 一个Promise对象，解析为布尔值，表示验证码是否有效
 */
export const compareVerification = async (identifier: string, verification: string) => {
  const statement = /* surql */ `
   array::len(
    SELECT * FROM verification
      WHERE 
        identifier = $identifier
        AND code = $verification
        AND time::now() - created < 5m
      ORDER BY created DESC LIMIT 1
   )
  `
  const statementParams = { identifier, verification }
  const [result] = await db.query<number[]>(statement, statementParams)

  return result ? true : false
}
