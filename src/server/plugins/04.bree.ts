export default defineNitroPlugin(async (nitroApp) => {
  await bree.start()

  const config = useRuntimeConfig()

  bree.on('worker created', (name) => {
    console.info('👨‍🎨 创建了工作进程：', name)

    const worker = bree.workers.get(name)
    worker?.postMessage({ name: 'initialize', data: { config } })
  })

  bree.on('worker deleted', (name) => {
    console.info('❌ 删除了工作进程：', name)
  })
})
