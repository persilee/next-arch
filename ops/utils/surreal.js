import { Surreal } from 'surrealdb'

export const getdb = async (config) => {
  const db = new Surreal()

  await db.connect(config.url)
  await db.use({
    namespace: config.namespace,
    database: config.database,
  })
  await db.signin({
    username: config.rootUser,
    password: config.rootPass,
  })

  return db
}
