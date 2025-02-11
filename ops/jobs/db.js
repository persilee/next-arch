import { parentPort } from 'node:worker_threads'
import { getdb } from '../utils/surreal.js'

parentPort?.once('message', async (message) => {
  if (message.name && message.name === 'initialize') {
    try {
      const db = await getdb(message.data.config.surreal)

      const statement = /* surql */ `
       SELECT name FROM startup LIMIT 3;
      `

      const [result] = await db.query(statement)
      console.info(result)

      db.close()
    } catch (error) {
      console.error(error)
    }

    parentPort.postMessage('✅ done')
  }
})
