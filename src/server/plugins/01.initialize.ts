import { fileSystemDerived, fileSystemTmp, mkdir } from '../utils/file'
import { db, dbConnect } from '../utils/surreal'

export default defineNitroPlugin(async (nitroApp) => {
  console.log('Plugin: 🚀 初始化')

  await dbConnect()

  await mkdir(fileSystemDerived)
  await mkdir(fileSystemTmp)
})
