import { isServerApi } from '../utils/app/common'

export default defineEventHandler(async (event) => {
  if (!isServerApi(event)) return
  console.log('user middleware ')
})
