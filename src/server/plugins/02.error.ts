import { SurrealDbError } from 'surrealdb'

export default defineNitroPlugin(async (nitroApp) => {
  // 设置重新连接定时器
  const setReconnectTimer = async (timer: NodeJS.Timer) => {
    return await useStorage().setItemRaw('reconnectTimer', timer)
  }
  // 获取重新连接定时器
  const getReconnectTimer = async () => {
    return await useStorage().getItemRaw('reconnectTimer')
  }
  // 清除重新连接定时器
  const clearReconnectTimer = async () => {
    const timer = await getReconnectTimer()
    if (timer) {
      clearInterval(timer)
    }
  }

  // 错误处理钩子函数
  nitroApp.hooks.hook('error', async (error) => {
    if (error instanceof SurrealDbError) {
      console.error(`🐛 链接服务失败：${error}`)

      const reconnectTimer = await getReconnectTimer()
      // 如果已经有连接定时器，直接返回
      if (reconnectTimer) return

      const timer = setInterval(async () => {
        console.log('⏳ 正在连接数据库...')
        await dbConnect()

        // 如果连接成功，连接状态是 connected 就清除定时器
        if (db.status === 'connected') {
          await clearReconnectTimer()
        }
      }, 5000)

      await setReconnectTimer(timer)
    }
  })
})
