import { verificationInput } from '~/schema/reception'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, verificationInput.parseAsync)
  const { isEmail, isMobile, identifier, user } = body

  const [code] = await db.query(`rand::int(1000, 9999)`)

  if (isEmail) {
    console.log(`📧 验证码（${String(code)}）已发送到邮箱 ${identifier}`)
  }
  if (isMobile) {
    console.log(`📲 验证码（${String(code)}）已发送到手机 ${identifier}`)
  }

  await db.create('verification', {
    user: user!.id,
    code: `${String(code)}`,
    identifier,
    type: isEmail ? 'email' : 'mobile',
  })

  return {
    message: `📧 验证码已发送到 ${identifier}`,
  }
})
