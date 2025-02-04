export default defineNitroPlugin(async (nitroApp) => {
  const setReconnectTimer = async (timer: NodeJS.Timer) => {
    return await useStorage().setItemRaw('reconnectTimer', timer)
  }

  const getReconnectTimer = async () => {
    return await useStorage().getItemRaw('reconnectTimer')
  }

  const clearReconnectTimer = async () => {
    const timer = await getReconnectTimer()
    if (timer) {
      clearInterval(timer)
    }
  }

  nitroApp.hooks.hook('error', async (error) => {
    if (error.name && error.name === 'NoActiveSocket') {
      const reconnectTimer = await getReconnectTimer()

      if (reconnectTimer) return

      const timer = setInterval(async () => {
        console.log('⏳正在连接数据库...')
        await dbConnect()
        if (db.ready) {
          await clearReconnectTimer()
        }
      }, 5000)

      await setReconnectTimer(timer)
    }
  })
})
