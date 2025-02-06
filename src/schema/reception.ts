import { z } from 'zod'
import { compareHash, createHash } from '~/server/utils/app/hash'
import { readUser } from '~/server/utils/user'

const name = z
  .string({ required_error: '请提供用户名' })
  .min(1, { message: '请提供用户名' })
  .max(36, { message: '用户名的长度不能超过 36 位' })
  .trim()

const password = z
  .string({ required_error: '请提供用户名' })
  .min(6, { message: '密码长度至少是 6 位' })
  .max(36, { message: '密码长度不能超过 36 位' })
  .trim()

const identifier = z
  .string({ required_error: '请提供用户标识' })
  .min(1, { message: '请提供用户标识' })
  .max(36, { message: '用户标识长度不能超过 36 位' })
  .trim()

/**
 * 定义用户注册输入的验证模式。
 *
 * @constant
 * @type {z.ZodObject}
 *
 * @property {string} name - 用户名，必须是唯一的。通过 `refine` 方法进行验证，如果用户名已存在，则返回错误信息 "🙇‍♂️ 用户名已存在"。
 * @property {string} password - 用户密码，通过 `transform` 方法将密码转换为哈希值。
 *
 * @param {object} required_error - 如果未提供注册数据，则返回错误信息 "请提供注册数据"。
 */
export const signupInput = z.object(
  {
    name: name.refine(
      async (value) => {
        const user = await readUser({ name: value })

        return !user
      },
      {
        message: '🙇‍♂️ 用户名已存在',
      },
    ),
    password: password.transform((value) => createHash(value)),
  },
  { required_error: '请提供注册数据' },
)

/**
 * 用户登录输入验证和处理。
 *
 * 该对象首先验证输入的 `identifier` 和 `password`，然后通过 `transform` 方法查找用户信息，
 * 并在 `superRefine` 方法中进一步验证用户是否存在以及密码是否匹配。
 *
 * @constant
 * @type {ZodObject}
 *
 * @property {string} identifier - 用户标识符，可以是用户名、邮箱或手机号。
 * @property {string} password - 用户密码。
 *
 * @returns {Promise<Object>} 包含 `identifier`、`password` 和 `user` 的对象。
 *
 * @throws {ZodError} 如果用户不存在或密码不匹配，将抛出自定义错误。
 */
export const signinInput = z
  .object({
    identifier,
    password,
  })
  .transform(async ({ identifier, password }) => {
    const user = await readUser(
      {
        name: identifier,
        email: identifier,
        mobile: identifier,
      },
      'OR',
    )

    return { identifier, password, user }
  })
  .superRefine(async ({ user, password }, context) => {
    if (!user) {
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: '用户不存在',
      })
    }

    const isPasswordMatched = await compareHash(user.password!, password)

    if (!isPasswordMatched) {
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: '密码不匹配',
      })
    }
  })

/**
 * 验证输入对象的模式定义和转换逻辑。
 *
 * 该对象包含一个标识符（identifier），可以是电子邮件或手机号码。
 *
 * 1. 使用正则表达式验证标识符是否为有效的电子邮件或手机号码。
 * 2. 如果标识符有效，尝试从数据库中读取用户信息。
 * 3. 返回包含标识符类型（电子邮件或手机号码）、有效性标志和用户信息的对象。
 *
 * @param identifier - 用户标识符，可以是电子邮件或手机号码。
 * @returns 包含标识符类型、有效性标志和用户信息的对象。
 *
 * @throws 如果标识符无效或用户不存在，将在 `superRefine` 方法中添加自定义问题。
 */
export const verificationInput = z
  .object({ identifier })
  .transform(async ({ identifier }) => {
    const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const mobile = /^[0-9]{11}$/
    const isEmail = email.test(identifier)
    const isMobile = mobile.test(identifier)
    const isValidIdentifier = isEmail || isMobile

    if (isValidIdentifier) {
      const user = await readUser({ email: identifier, mobile: identifier }, 'OR')

      return { isEmail, isMobile, isValidIdentifier, identifier, user }
    }

    return {
      isEmail,
      isMobile,
      isValidIdentifier,
      identifier,
    }
  })
  .superRefine(async ({ user, isValidIdentifier }, context) => {
    if (!isValidIdentifier) {
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: '请提供有效的用户标识',
      })
    }

    if (!user) {
      return context.addIssue({
        code: z.ZodIssueCode.custom,
        message: '用户不存在',
      })
    }
  })
