import type { Pinia, PiniaPluginContext } from 'pinia'

export default defineNuxtPlugin(() => {
  const pinia: Pinia = usePinia() as Pinia

  const piniaPlugin = (context: PiniaPluginContext) => {
    return {
      creator: '🐸',
    }
  }

  const notifyOnErrorPlugin = ({ store, options }: PiniaPluginContext) => {
    if (!options.notifyOnError?.length) return

    const makeNotifiableAction =
      (name: string, action: Function) =>
      (...args: []) => {
        try {
          action(...args)
        } catch (error: any) {
          if (error.name === 'Error') {
            useToast().add({
              id: `${store.$id}:${name}`,
              title: 'Action Error 🐛',
              description: `${error.message}`,
            })
          }

          if (process.env.NODE_ENV === 'development') {
            console.log(error)
          }
        }
      }

    const actions = options.notifyOnError?.reduce((actions, actionName) => {
      actions[actionName] = makeNotifiableAction(actionName, store[actionName])
      return actions
    }, {})

    return actions
  }

  pinia.use(piniaPlugin)
  pinia.use(notifyOnErrorPlugin)
})
