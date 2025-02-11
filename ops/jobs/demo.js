import {parentPort} from 'node:worker_threads';

console.info('开始作业 💪')

parentPort.once('message', (message) => {
  console.info('🫡 收到主线程消息：', message)
})

parentPort.postMessage({
  name: 'result',
  data: '✅ 完成作业了'
})