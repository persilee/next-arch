import { list } from '~/schema/startup'

export default defineEventHandler(async (event) => {
  const result = await $fetch('https://resources.ninghao.net/nid-camp/startups.json')
  return list.parse(result)
})
