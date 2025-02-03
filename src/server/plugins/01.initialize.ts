import { db, dbConnect } from '../utils/surreal'

export default defineNitroPlugin(async (nitroApp) => {
  console.log('🚀')

  await dbConnect()

  const list = await db.select('startup')
  console.log(list)
})
