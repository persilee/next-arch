import Surreal, { NoActiveSocket } from 'surrealdb'

const config = useRuntimeConfig()

const { url, namespace, database, rootUser, rootPass } = config.surreal

export const db = new Surreal()

export const dbConnect = async () => {
  // 连接到 SurrealDB 服务器
  await db.connect(url)
  console.log(`🎉 链接服务器成功 status: ${db.status} ns: ${namespace} , db: ${database}`)

  // 选择命名空间和数据库
  await db.use({ namespace, database })

  // 进行身份验证
  await db.signin({
    username: rootUser,
    password: rootPass,
  })
}
