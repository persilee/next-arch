import puppeteer from 'puppeteer'
import { parentPort } from 'node:worker_threads'

const browser = await puppeteer.launch({ headers: 'new' })

const page = await browser.newPage()

await page.goto('http://localhost:3001/playground/startups/', {
  waitUntil: 'domcontentloaded',
})

await page.waitForNetworkIdle()

await page.click('.load')

const items = await page.evaluate(() => {
  const elements = document.querySelectorAll('.list .item')

  return Array.from(elements).map((item) => {
    const title = item.querySelector('.title')

    let result = {}

    if (title) {
      result.title = title.innerText
    }

    console.log('title', title)

    return result
  })
})

console.log(items)

await browser.close()

if (parentPort) {
  parentPort.postMessage('✅')
} else {
  process.exit(0)
}
