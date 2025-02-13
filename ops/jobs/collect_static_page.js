import { $fetch } from 'ofetch'
import * as cheerio from 'cheerio'

const result = await $fetch('http://localhost:3001/playground/startups/')
const $ = cheerio.load(result)

const items = $('.list .item')
  .map((_, item) => {
    const title = $(item).children('.title').text()

    return { title }
  })
  .toArray()

console.log(items)
