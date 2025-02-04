import { db, dbConnect } from '../utils/surreal'

export default defineNitroPlugin(async (nitroApp) => {
  console.log('Plugin: 🚀 初始化')

  await dbConnect()
})
